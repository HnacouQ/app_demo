
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
        WhishListStorage.set('products',NWL);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },

    checkWhistList(){
      const WhishListStorage = createStorage('WhishListStorage');
      let WL = WhishListStorage.get('products') ?? [];
      const NWL = WL.filter(item => item.id == parseInt(btnWhishList.dataset.id));
      if(NWL.length){
        btnWhishList.classList.add('active');
        btnWhishList.innerHTML = 'Remove to whishlist';
      }
    },

    initApp(){
      console.log('init.....');
      QA_App.checkWhistList();
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

QA_App.initApp()