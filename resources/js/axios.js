import axios from 'axios';
axios.interceptors.request.use(function (config) {
  config.params = config.params || {}
  config.params.shop = window.App.shopOrigin
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  return config;
}, function (error) {
  return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
  if (response.data.expired){
    alert('Sorry, your session has expired. Please refresh the page to continue.');
    window.location.reload();
    return;
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default axios;