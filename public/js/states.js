let myBoardUrl = 'https://www.reddit.com/r/memes/.json';

(function(window){
  //namespace our app
  window.App = window.App || {};

  //each state will prepare data to be rendered
  //have a function to that returns new state dom tree
  let container = document.getElementById('container');

  class MyBoards {
    //constructor prepares data
    constructor(){
      //execute xhr request to this people end point
      this.myBoards = [];
      this.ready = null;
      App.utils.Get(myBoardUrl, data => {
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
      const view = container;

      const items = this.myBoards.map(myBoard => {
        let item = document.createElement('div');
        let lineBreak = document.createElement('p');
        let header = document.createElement('H1');
        let title = document.createTextNode(myBoard.data.title);
        let image = document.createElement('img');
        let author = document.createTextNode(myBoard.data.author);
        let link = document.createElement('a');
        link.setAttribute('href', 'http://reddit.com' + myBoard.data.permalink);
        link.setAttribute('target', '_blank');
        link.appendChild(header);
        image.src = myBoard.data.thumbnail;
        image.style.height = '200px';
        image.style.width = '300px';
        header.appendChild(title);

        item.className = 'boxDisplay';
        item.appendChild(link);
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
      const view = container;
      this.random.shift();
      this.random.shift();
      const items = this.random.map(random => {
        let item = document.createElement('div');
        let lineBreak = document.createElement('p');
        let header = document.createElement('H1');
        let title = document.createTextNode(random.data.title);
        let video = document.createElement('video');
        let author = document.createTextNode(random.data.author);
        let link = document.createElement('a');
        link.setAttribute('href', 'http://reddit.com' + random.data.permalink);
        link.setAttribute('target', '_blank');
        link.appendChild(header);
        let source = document.createElement('source');
        let changedUrl = random.data.url;
        changedUrl = changedUrl.split('.');
        if(changedUrl[changedUrl.length - 1] === 'gifv' || changedUrl[changedUrl.length - 1] === 'gif'){
          changedUrl.pop();
        }
        changedUrl.push('mp4');
        changedUrl = changedUrl.join('.');
        source.src = changedUrl;
        source.type = 'video/mp4';
        video.autoplay = 'autoplay';
        video.loop = 'loop';
        video.style.width = '400px';
        video.style.height = '500px';
        video.preload = 'auto';
        video.appendChild(source);
        header.appendChild(title);

        item.className = 'boxDisplay gifs';
        item.appendChild(link);
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
  class GetTheApp {
    //constructor prepares data
    constructor(){
      this.getTheApp = [];
      this.ready = null;
      App.utils.Get('http://swapi.co/api/starships/', data => {
        const parsedGetTheAppData = JSON.parse(data);
        this.getTheApp = parsedGetTheAppData.results;

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

      const items = this.getTheApp.map(starships => {
        let item = document.createElement('li');
        item.innerHTML = getTheApp.name;
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
    GetTheApp
  };

}(window));