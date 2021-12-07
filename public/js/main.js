
const QA_App = (()=>{

   const btnWhishList = document.querySelector('.QA_btn');
   const url = 'https://a287-42-113-176-19.ngrok.io/';
   
   return {
      addWhistList(){
        console.log(btnWhishList.dataset.id);
        btnWhishList.classList.add('active');
        new Noty({
            progressBar:true,
            text: 'Added to whishlist!!',
            type:'success',
            timeout:1000
        }).show();
        btnWhishList.innerHTML = 'Remove to whishlist';

        const data = { shop: Shopify.shop, id: btnWhishList.dataset.id };
        

        fetch('http://a287-42-113-176-19.ngrok.io/add-whishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
      },

      removeWhistList(){
        console.log('remove');
        btnWhishList.classList.remove('active');
        new Noty({
            progressBar:true,
            text: 'Removed to whishlist!!',
            type:'warning',
            timeout:1000
        }).show();
        btnWhishList.innerHTML = 'Add to whishlist';
      },

      checkWhistList(){

      },

      initApp(){
        btnWhishList.addEventListener('click',function(){
            if(!this.classList.contains('active')){
                QA_App.addWhistList();
            }else{
                QA_App.removeWhistList();
            }
            
        }); 
      }
   } 
})();

QA_App.initApp()