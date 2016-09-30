(function(window){
  //namespace our app
  window.App = window.App || {};

  //each state will prepare data to be rendered
  //have a function to that returns new state dom tree

  class MyBoards {
    //constructor prepares data
    constructor(){
      //execute xhr request to this people end point
      this.myBoards = [];
      this.ready = null;
      App.utils.Get('https://www.reddit.com/r/techsupportgore/.json', data => {
        const parsedBoardData = JSON.parse(data);
        this.myBoards = parsedBoardData.data.children;
        this.render(this.ready);

      });
    }
    //render our data when data is ready
    //send final render dom element to callback
    //call back is a function that we need to pass an element to
    rendered(callback){
      this.ready = callback;
    }

    render(readyFunc){
      const view = document.createElement('div');
      view.id = 'container';

      const items = this.myBoards.map(myBoard => {
        let item = document.createElement('div');
        let lineBreak = document.createElement('p');
        let header = document.createElement('H1');
        let title = document.createTextNode(myBoard.data.title);
        let image = document.createElement('img');
        let author = document.createTextNode(myBoard.data.author);
        image.src = myBoard.data.thumbnail;
        header.appendChild(title);

        item.className = 'boxDisplay';
        item.appendChild(header);
        item.appendChild(lineBreak);
        item.appendChild(image);
        item.appendChild(lineBreak);
        item.appendChild(author);
        return item;
      });

      items.forEach(view.appendChild.bind(view));

      return readyFunc(view);
    }
  }
  class Random {
    //constructor prepares data
    constructor(){
      this.random = [];
      this.ready = null;
      App.utils.Get('https://www.reddit.com/r/gifs.json', data => {
        const parsedRandomData = JSON.parse(data);
        this.random = parsedRandomData.data.children;

        this.render(this.ready);

      });
    }
    //return single dom element to be added to view
    rendered(callback){
      this.ready = callback;
    }

    render(readyFunc){
      const view = document.createElement('div');
      view.id = 'container';

      const items = this.random.map(random => {
        let item = document.createElement('div');
        let lineBreak = document.createElement('p');
        let header = document.createElement('H1');
        let title = document.createTextNode(random.data.title);
        let video = document.createElement('video');
        let author = document.createTextNode(random.data.author);
        let source = document.createElement('source');
        let changedUrl = random.data.url;
        changedUrl = changedUrl.substring(0, changedUrl.length -4);
        changedUrl += 'mp4';
        source.src = changedUrl;
        video.autoplay = 'autoplay';
        video.loop = 'loop';
        video.style.width = '200px';
        video.style.height = '300px';
        video.preload = 'auto';
        source.type = 'video/mp4';
        video.appendChild(source);
        header.appendChild(title);

        item.className = 'boxDisplay';
        item.appendChild(header);
        item.appendChild(lineBreak);
        item.appendChild(video);
        item.appendChild(lineBreak);
        item.appendChild(author);
        return item;
      });

      items.forEach(view.appendChild.bind(view));

      return readyFunc(view);
    }
  }
  class Spaceships {
    //constructor prepares data
    constructor(){
      this.spaceships = [];
      this.ready = null;
      App.utils.Get('http://swapi.co/api/starships/', data => {
        const parsedStarshipData = JSON.parse(data);
        this.starships = parsedStarshipData.results;

        this.render(this.ready);

      });
    }
    //return single dom element to be added to view
    rendered(callback){
      this.ready = callback;
    }

    render(readyFunc){
      const view = document.createElement('div');
      const list = document.createElement('ul');

      const items = this.starships.map(starships => {
        let item = document.createElement('li');
        item.innerHTML = starships.name;
        return item;
      });

      items.forEach(list.appendChild.bind(list));

      view.appendChild(list);
      return readyFunc(view);
    }
  }

  window.App.states = {
    MyBoards,
    Random,
    Spaceships
  };

}(window));