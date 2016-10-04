//goal is to instantiates when user requests it
let lastSelected;
(function(window) {
  window.App = window.App || {};

  //map routes to state
  class Router{
    constructor(containerId){
      this.container = document.getElementById(containerId);
    }
    //navigate function that takes in a route and renders to container
    navigate(route){
      let state = null;
      console.log(route);
      if(route !== lastSelected){
        document.getElementById('container').innerHTML = '';
      }
      switch(route){
        case 'myBoards':
          lastSelected = 'myBoards';
          state = new App.states.MyBoards();
          break;
        case 'random':
          lastSelected = 'random';
          state = new App.states.Random();
          break;
        case 'getTheApp':
        lastSelected = 'getTheApp';
          state = new App.states.GetTheApp();
          break;
      }
      state.rendered( (element) => {
        this.container.appendChild( element );
        switchBoard = true;
      });

    }
  }
  window.App.Router = new Router('boxContainer');
}(window));