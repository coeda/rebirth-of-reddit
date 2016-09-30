(function(window){
  window.App = window.App || {};

  const Get = (url, callback) => {
    let oReq = new XMLHttpRequest();
  // create new XHR object

  // attach events: 'load', 'error'
  oReq.addEventListener('progress', function(){
  });
  oReq.addEventListener('load', function(){
    callback(this.responseText);
  });
  oReq.addEventListener('error', function(){
    console.log('ERROR :<');
  });

  // first arg: METHOD, second arg: URL
  oReq.open('GET', url);
  // HEADERS GO HERE
  oReq.setRequestHeader('Accept', 'application/json');
  oReq.send();
  };

  window.App.utils = {
    Get
  };
}(window));