var bonds = {};
bonds.films = [
  { title: "Skyfall", year: 2012, actor: "Daniel Craig", gross: "$1,108,561,008" },
  { title: "Thunderball", year: 1965, actor: "Sean Connery", gross: "$1,014,941,117" },
  { title: "Goldfinger", year: 1964, actor: "Sean Connery", gross: "$912,257,512" },
  { title: "Live and Let Die", year: 1973, actor: "Roger Moore", gross: "$825,110,761" },
  { title: "You Only Live Twice", year: 1967, actor: "Sean Connery", gross: "$756,544,419" },
  { title: "The Spy Who Loved Me", year: 1977, actor: "Roger Moore", gross: "$692,713,752" },
  { title: "Casino Royale", year: 2006, actor: "Daniel Craig", gross: "$669,789,482" },
  { title: "Moonraker", year: 1979, actor: "Roger Moore", gross: "$655,872,400" },
  { title: "Diamonds Are Forever", year: 1971, actor: "Sean Connery", gross: "$648,514,469" },
  { title: "Quantum of Solace", year: 2008, actor: "Daniel Craig", gross: "$622,246,378" },
  { title: "From Russia with Love", year: 1963, actor: "Sean Connery", gross: "$576,277,964" },
  { title: "Die Another Day", year: 2002, actor: "Pierce Brosnan", gross: "$543,639,638" },
  { title: "Goldeneye", year: 1995, actor: "Pierce Brosnan", gross: "$529,548,711" },
  { title: "On Her Majesty's Secret Service", year: 1969, actor: "George Lazenby", gross: "$505,899,782" },
  { title: "The World is Not Enough", year: 1999, actor: "Pierce Brosnan", gross: "$491,617,153" },
  { title: "For Your Eyes Only", year: 1981, actor: "Roger Moore", gross: "$486,468,881" },
  { title: "Tomorrow Never Dies", year: 1997, actor: "Pierce Brosnan", gross: "$478,946,402" },
  { title: "The Man with the Golden Gun", year: 1974, actor: "Roger Moore", gross: "$448,249,281" },
  { title: "Dr. No", year: 1962, actor: "Sean Connery", gross: "$440,759,072" },
  { title: "Octopussy", year: 1983, actor: "Roger Moore", gross: "$426,244,352" },
  { title: "The Living Daylights", year: 1987, actor: "Timothy Dalton", gross: "$381,088,866" },
  { title: "A View to a Kill", year: 1985, actor: "Roger Moore", gross: "$321,172,633" },
  { title: "Licence to Kill", year: 1989, actor: "Timothy Dalton", gross: "$285,157,191" }
];

// function gross(film){
//   film.
//   gross = gross.substring(1);
//   return parseInt(gross.split(',').join(''));
// }

function grossOfFilm(film){
  var gross = film.gross;
  gross = gross.substring(1);
  return parseInt(gross.split(',').join(''));
}

bonds.gross = function(film){
  var gross = film.gross;
  gross = gross.substring(1);
  return parseInt(gross.split(',').join(''));
};

bonds.getActors = function(){
  var actorsRepeated = _.pluck(this.films, "actor");
  uniqActors = _.uniq(actorsRepeated);
  return uniqActors;
};

bonds.totalGross = function(){
  // iterates through the films, returning an array where the 'gross' string values have been converted into integers
  var arrayOfGrosses= _.map(this.films, function(film) { return bonds.gross(film); });
  // adds up all the grosses and returns the total
  var totalGross = _.reduce(arrayOfGrosses, function(memo, num){return memo+num;});
  return totalGross;
};

bonds.titles = function(options){
  var num = options.words;
  matchesSpecs = []
  var titles = _.pluck(this.films, "title");
  var titlesSplit = _.map(titles, function(title) { return title.split(' ')});
  _.map(titlesSplit, function(arrayOfWords) {
      if (arrayOfWords.length == num ) {
        var titlePushedTogether = arrayOfWords.join(' ');
        matchesSpecs.push(titlePushedTogether);
      } // if-statement code block
    }); // iterator function for map

  return matchesSpecs;
};


bonds.starCount = function(){
  var movieCount = _.countBy(this.films, function(film){
    return film.actor;
  });
    return movieCount;
};

bonds.loneliestBond = function(){
 var movieCount = this.starCount();
 var lowestCount = _.min(movieCount);
 return findByKey(movieCount, lowestCount);
};

function findByKey(object, value){
  var matchedKeys = [];
  _.each(_.keys(object), function(key){
    var currentValue = object[key];
    if (currentValue === value){
      matchedKeys.push(key);
    }
  });
  return matchedKeys.join();
}

bonds.oddBonds = function() {
  var oddYearFilms = _.filter(this.films, function(film){ return film.year % 2 != 0; });
  arrayOfTitles = _.map(oddYearFilms, function(film){
    return film.title;
  });
  return arrayOfTitles;
};

bonds.bestBond = function(){
  var highestGrossAverage = 0;
  var best = {};
  var filmsByActorObject = _.groupBy(this.films, function(film){ return film.actor});
  _.each(filmsByActorObject, function(value, key, list){
     if (calcGrossAverage(value) > highestGrossAverage) {
      highestGrossAverage = calcGrossAverage(value);
      best.actor = key;
      best.gross = calcGrossAverage(value);
     }
  });
  return best;

}; // bestBond()

function calcGrossAverage(arrayOfMovies) {
  var sum = 0;
      arraySize = arrayOfMovies.length;
  _.each(arrayOfMovies, function(e, i, l){
    sum = sum + grossOfFilm(e);
  }); // _.each(arrayOfMovies)
  return sum / arraySize;
} // calcGrossAverage

bonds.worstBond = function(){
  var lowestGrossAverage = 10000000000000000000;
  var worst = {};
  var filmsByActorObject = _.groupBy(this.films, function(film){ return film.actor});
  _.each(filmsByActorObject, function(value, key, list){
     if (calcGrossAverage(value) < lowestGrossAverage) {
      lowestGrossAverage = calcGrossAverage(value);
      worst.actor = key;
      worst.gross = calcGrossAverage(value);
     }
  }); // _.each
  return worst;
}

