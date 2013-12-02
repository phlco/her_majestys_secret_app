var AppView = Backbone.View.extend({
  el: "#view",

  events: {
    "click #actors" : "listActors",
    "click #view" : "test"
  },

  test: function(){
    debugger
    console.log("Your hypothesis that you can only deal with stuff inside the designated view was correct");
  },

  initialize: function(){
    $('#actors').on("click", this.listActors);
    $('#total-gross').on("click", this.listGrosses);
    $('#best-bond').on("click", this.listBest);
  },

  listBest: function(){
    prepareList('The Best Bond');
    var bestBond = bonds.bestBond();
    listAppend(bestBond.actor);
  }, // listBest()

  listGrosses: function(){
    console.log("listGrosses is firing");
    prepareList('Total Grosses');
    debugger
    var bondFilms = bonds.films;
    _.each(bondFilms, function(e, i, l) {
      listAppend(e.title + ": " + e.gross);
    }); // _.each()
  }, // listGrosses

  listActors: function(){
    prepareList('Bonds through the years');
    var actors = bonds.getActors();
    _.each(actors, function(e,i,l){
      listAppend(e);
    }); // _.each()
  }, // listActors()

  displayFilms: function(){
    var bondFilms = bonds.films;
    _.each(bondFilms, function(film, i, l){
      listAppend(film.title);
    }); // _.each()
  } // displayFilms()
});

$( document ).ready(function() {
  appView = new AppView();
  appView.displayFilms();
});
