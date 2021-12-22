
const QA_App = (()=>{
    const btnWhishList = document.querySelector('.QA_btn');          
    const productID = btnWhishList.dataset.id;
    const customerID = btnWhishList.dataset.id ?? 'anonymous';
    const createStorage = (key) => {
      const store = JSON.parse(localStorage.getItem(key)) ?? {}
      const save = () => {
        localStorage.setItem(key,JSON.stringify(store))
      }
      return {
        get(key){
          return store[key];
        },
        set(key,value){
          store[key] = value;
          save();
        },
        remove(key){
          delete store[key];
          save();
        }
      }
    }
    return {
      addWhistList(){
        btnWhishList.classList.add('active');
        btnWhishList.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
        const data = { shop: Shopify.shop, id: productID, customer:customerID };
        fetch('http://127.0.0.1:8000/add-whishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          new Noty({
            progressBar:true,
            text: 'Added to whishlist!!',
            type:'success',
            timeout:1000
          }).show();
          btnWhishList.innerHTML = 'Remove to whishlist';
          const WhishListStorage = createStorage('WhishListStorage');
          let WL = WhishListStorage.get('products') ?? [];
          WL.push(data.product)
          console.log(WL);
          QA_App.RerenderWL(WL);
          WhishListStorage.set('products',WL);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      },
      removeWhistList(){
        let btnWhishList = document.querySelector('.QA_btn');
        btnWhishList.classList.remove('active');
        btnWhishList.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
        const data = { shop: Shopify.shop, id: productID, customer:customerID };
        fetch('http://127.0.0.1:8000/remove-whishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
  
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          new Noty({
            progressBar:true,
            text: 'Removed to whishlist!!',
            type:'warning',
            timeout:1000
          }).show();
          btnWhishList.innerHTML = 'Add to whishlist';
          const WhishListStorage = createStorage('WhishListStorage');
          let WL = WhishListStorage.get('products');
          const NWL = WL.filter(item => item.id !== parseInt(btnWhishList.dataset.id));
          QA_App.RerenderWL(NWL);
          WhishListStorage.set('products',NWL);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      },
      checkWhistList(){
        let WhishListStorage = createStorage('WhishListStorage');
        let WL = WhishListStorage.get('products') ?? [];
        let NWL = WL.filter(item => item.id == parseInt(btnWhishList.dataset.id));
        if(NWL.length){
          btnWhishList.classList.add('active');
          btnWhishList.innerHTML = 'Remove to whishlist';
        }
      },
      ModalWhistlist(){
        let WhishListStorage = createStorage('WhishListStorage');
        let WL = WhishListStorage.get('products') ?? [];
       
        let W = WL.map((data,index) => {
          return `<div class="QA-wl-product"><a href="/products/${data.handle}"><div class="QA-wl-product__img"><img src="${data.image.src}"/></div><div class="QA-wl-product__title">${data.title}</div></a></div>`
        });

        console.log(W.join(''));
        // btn.innerHTML = '<div class="header"></div><div class="main"></div><div class="footer"></div>';
      },
      createBtnListWhishList(){
        let WhishListStorage = createStorage('WhishListStorage');
        let WL = WhishListStorage.get('products') ?? [];
        let btn = document.createElement('div');
        let modal = document.createElement('div');
        let ovelay = document.createElement('div'); 
        let W = WL.map((data,index) => {
          return `<div class="QA-wl-product"><a href="/products/${data.handle}"><div class="QA-wl-product__img"><img src="${data.image.src}"/></div><div class="QA-wl-product__title">${data.title}</div></a></div>`
        });
        modal.classList.add('QA_WhistList_modal');
        ovelay.classList.add('QA_WhistList_overlay');
        btn.classList.add('QA_WhistList_btn');
        modal.innerHTML = '<div class="header"><span class="QA_text">My WhishList</span><span class="QA_close" style="cursor:pointer"><i class="fa fa-times" aria-hidden="true"></i></span></div><div class="main">'+W.join('')+'</div><div class="footer"></div>';
        btn.innerHTML = '<div><span class="icon"><i class="fa fa-heart" style="color:#fff" aria-hidden="true"></i></span><span class="number">'+WL.length+'</span></div>';
        document.body.appendChild(btn);
        document.body.appendChild(modal);
        document.body.appendChild(ovelay);
      },
      handleToggleWhishList(){
        const Open = document.querySelector('.QA_WhistList_btn');
        const Close = document.querySelector('span.QA_close');
        const Modal = document.querySelector('.QA_WhistList_modal');
        const Overlay = document.querySelector('.QA_WhistList_overlay');

        Close.addEventListener('click',function(){
          Modal.classList.remove('active');
          Overlay.classList.remove('active');
        });

        Open.addEventListener('click',function(){
          Modal.classList.add('active');
          Overlay.classList.add('active');
        });
        
      },

      RerenderWL(WL){
        const Number = document.querySelector('.QA_WhistList_btn span.number');
        const Main = document.querySelector('.QA_WhistList_modal .main');
        let W = WL.map((data,index) => {
          return `<div class="QA-wl-product"><a href="/products/${data.handle}"><div class="QA-wl-product__img"><img src="${data.image.src}"/></div><div class="QA-wl-product__title">${data.title}</div></a></div>`
        });
        Number.innerHTML = WL.length;
        Main.innerHTML = W.join('');
      },
      initApp(){
        console.log('init.....');
        QA_App.createBtnListWhishList();
        QA_App.checkWhistList();
        QA_App.ModalWhistlist();
        QA_App.handleToggleWhishList();
        
        if(btnWhishList){
          btnWhishList.addEventListener('click',function(){
            if(!this.classList.contains('active')){
              QA_App.addWhistList();
            }else{
              QA_App.removeWhistList();
            }
          }); 
        }
      }
    } 
  })();
  QA_App.initApp();
