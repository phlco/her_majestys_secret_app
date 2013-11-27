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
  titles: function( wordshash ) {
    var wordNum = wordshash.words;
    var allTitles = [];
    _.each(this.films, function(film){
      allTitles.push(film.query.title);
    });
  // debugger;
  var correctTitles = [];
  _.each(allTitles, function( title ) {
    var titleArray = title.split(' ');
    if( titleArray.length == wordNum ){
      correctTitles.push(title);
    }
  });
  return correctTitles;

},
starCount: function() {
  var actors = this.getActors();
  // debugger;
  var that = this;
  var starCount = {};
  _.each(actors, function(actorName ){

    theirMovies = _.filter(that.films, function( film ){
      return film.query.actor == actorName;
    });
    // debugger;
    starCount[actorName] = theirMovies.length;
  });
  return starCount;
},
loneliestBond: function() {
  var actorHash = this.starCount();
  var lonliestBond;
  var lastAmt = 100000000;
  _.each(actorHash, function(value, key){
    // debugger;
    if( value < lastAmt ) {
      lonliestBond = key;
      lastAmt = value;
    }
  });
  return lonliestBond;
},
oddBonds: function() {
  var oddBonds = _.reject(this.films, function(film) {
    return film.query.year % 2 === 0;
  });

  var titleArray = _.map(oddBonds, function( film ) {
    return film.query.title;
  });
  return titleArray;
},
bestBond: function() {
  var actors = this.getActors();
  // debugger;
  var that = this;
  var starCount = [];
  _.each(actors, function(actorName ){
    // debugger;
    theirMovies = _.filter(that.films, function( film ){
      return film.query.actor == actorName;
    });
    // debugger;
    var theirGross = 0;
    console.log(theirGross);
    _.each(theirMovies, function(movie){
      // debugger;
      theirGross += movie.gross();
    });
    starCount.push( {actor: actorName, gross: theirGross / theirMovies.length} );
// debugger;
});

  var bond = _.max(starCount, function(bond){ return bond.gross;});

  return bond;
},
worstBond: function(){

  var actors = this.getActors();
  var that = this;
//   // debugger;
  var starCount = [];
  _.each(actors, function(actorName ){
//     // debugger;
    theirMovies = _.filter(that.films, function(film){
      return film.query.actor == actorName;
    });
    var theirGross = 0;
//     console.log(theirGross);
    _.each(theirMovies, function(movie){
      // debugger;
      theirGross += movie.gross();
    });
    starCount.push( {actor: actorName, gross: theirGross / theirMovies.length} );
// // debugger;
});

  var bond = _.min(starCount, function(bond){ return bond.gross;});

  return bond;
}
});















