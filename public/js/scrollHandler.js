let switchBoard = true;
this.window.addEventListener('scroll', function(){
let scrollTop = this.document.body.scrollTop;
let windowHeight = this.document.body.scrollHeight;
let scrollPercentage = (scrollTop / windowHeight);
  if(scrollPercentage > 0.85 && switchBoard === true){

      App.Router.navigate(lastSelected);
      switchBoard = false;
    }
    console.log(scrollPercentage);
});

