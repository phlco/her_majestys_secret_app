var Film = Backbone.Model.extend({
  initialize: function(query) {
    this.query = query || {};
  },
  gross: function() {
    var filmGross = this.query.gross.substring(1, this.query.gross.length);
  // debugger;
  var grossNum = "";
  for( var i = 0; i < filmGross.length; i++) {
    if(filmGross[i] !== ","){
      grossNum += filmGross[i];
    }
  }
  // debugger;
  return parseInt(grossNum, 10);
}

});

var Films = Backbone.Collection.extend({
  initialize: function( films ) {
    this.films = [];
    var that = this;
    _.each(films, function(film) {
      var newFilm = new Film( film );
      that.films.push(newFilm);
    });
  },
  getActors: function() {
    var allActors = [];
    _.each(this.films, function(film) {
    // debugger;
    if( allActors.indexOf(film.query.actor) == -1 ) {
      allActors.push(film.query.actor);
    }
  });
    return allActors;
  },
  totalGross: function() {
    var totalGross = 0;
    _.each(this.films, function(film){
      var thisGross = film.gross( );
      totalGross += thisGross;
    });
    return totalGross;
  },
  titles: function( options ) {


  }
});















