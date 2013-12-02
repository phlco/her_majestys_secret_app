// I changed this function to '.get("gross")' to get bestBond() to work,
// and of course it broke my earlier tests.

// film.get('gross') works in the non-backbone specs
// film.gross seems to work in the backbone specs


// function grossOfFilm(film){
//   var gross = film.get('gross');
//   gross = gross.substring(1);
//   return parseInt(gross.split(',').join(''));
// }

function calcGrossAverage(arrayOfMovies) {
  var sum = 0;
      arraySize = arrayOfMovies.length;
  _.each(arrayOfMovies, function(e, i, l){
    sum = sum + grossOfFilm(e);
  }); // _.each(arrayOfMovies)
  return sum / arraySize;
} // calcGrossAverage

Film = Backbone.Model.extend({

  gross: function(){
      var marp = this.get('gross');
      marp = marp.substring(1);
      return parseInt(marp.split(',').join(''));
  },

  backboneGrossOfFilm: function(){
    var gross = this.get('gross');
    gross = gross.substring(1);
    return parseInt(gross.split(',').join(''));
  }

}); // Film Backbone.Model.extend

Films = Backbone.Collection.extend({
  model: Film,

  getActors: function(){
    var actorsRepeated = this.pluck("actor");
    uniqActors = _.uniq(actorsRepeated);
    return uniqActors;
  }, // getActors

  totalGross: function(){
    // iterates through the films, returning an array where the 'gross' string values have been converted into integers
    var arrayOfGrosses= _.map(this.models, function(film) { return film.gross(); });
    // adds up all the grosses and returns the total
    var totalGross = _.reduce(arrayOfGrosses, function(memo, num){return memo+num;});
    return totalGross;
  },

  backboneCalcGrossAverage: function(arrayOfMovies) {
    var sum = 0;
    arraySize = arrayOfMovies.length;
    _.each(arrayOfMovies, function(e, i, l){
      debugger;
      sum = sum + e.gross();
    }); // _.each(arrayOfMovies)
    return sum / arraySize;
  }, // calcGrossAverage

  titles: function(options){
    var num = options.words;
    matchesSpecs = [];
    // because this function belongs to a backbone collection,
    // it comes with syntax-light underscore functions, like .pluck("attributeName")
    var titles = this.pluck("title");
    var titlesSplit = _.map(titles, function(title) { return title.split(' ')});
    _.map(titlesSplit, function(arrayOfWords) {
        if (arrayOfWords.length == num ) {
          var titlePushedTogether = arrayOfWords.join(' ');
          matchesSpecs.push(titlePushedTogether);
        } // if-statement code block
      }); // iterator function for map

    return matchesSpecs;
  }, // titles function

  starCount: function(){
    var movieCount = this.countBy("actor");
    return movieCount;
  }, // starCount() declaration

  loneliestBond: function(){
    var movieCount = this.starCount();
    var lowestCount = _.min(movieCount);
    return findByKey(movieCount, lowestCount);
  },

  oddBonds: function(){
    var oddYearFilms = this.filter(function(film){ return film.attributes.year % 2 != 0; });
    arrayOfTitles = _.map(oddYearFilms, function(film){
      return film.attributes.title;
    });
    return arrayOfTitles;
  }, // oddBonds()

  bestBond: function(){
    var highestGrossAverage = 0;
    var best = {};
    var filmsByActorObject = this.groupBy(function(film){ return film.attributes.actor});
    _.each(filmsByActorObject, function(value, key, list){
       if (calcGrossAverage(value) > highestGrossAverage) {
        highestGrossAverage = calcGrossAverage(value);
        best.actor = key;
        best.gross = calcGrossAverage(value);
       }
    });
    return best;
  }, // bestBond()

  worstBond: function(){
    var lowestGrossAverage = 10000000000000000000;
    var worst = {};
    var filmsByActorObject = this.groupBy(function(film){ return film.attributes.actor});
    _.each(filmsByActorObject, function(value, key, list){
       if (calcGrossAverage(value) < lowestGrossAverage) {
        lowestGrossAverage = calcGrossAverage(value);
        worst.actor = key;
        worst.gross = calcGrossAverage(value);
       }
    });
    return worst;
  } // worstBond()

});
