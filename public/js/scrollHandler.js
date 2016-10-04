let switchBoard = true;
this.window.addEventListener('scroll', function(){
let scrollTop = this.document.body.scrollTop;
let windowHeight = this.document.body.scrollHeight;
let scrollPercentage = (scrollTop / windowHeight);
  if(scrollPercentage > 0.80 && switchBoard === true){
      App.Router.navigate('myBoards');
      switchBoard = false;
    }
    console.log(scrollPercentage);
});

