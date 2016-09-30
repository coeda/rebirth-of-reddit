//goal is to instantiates when user requests it
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
      switch(route){
        case 'myBoards':
          state = new App.states.MyBoards();
          break;
        case 'random':
          state = new App.states.Random();
          break;
        case 'getTheApp':
          state = new App.states.GetTheApp();
          break;
      }
      this.container.innerHTML = '';
      state.rendered( (element) => {
        this.container.innerHTML = '';
        this.container.appendChild( element );
      });

    }
  }
  window.App.Router = new Router('boxContainer');
}(window));