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

bonds.gross = function(film) {
  var filmGross = film.gross.substring(1, film.gross.length);
  // debugger;
  var grossNum = "";
  for( var i = 0; i < filmGross.length; i++) {
    if(filmGross[i] !== ","){
      grossNum += filmGross[i];
    }
  }
  return parseInt(grossNum, 10);
};

bonds.getActors = function() {
  var allActors = [];
  _.each(bonds.films, function(film) {
    // debugger;
    if( allActors.indexOf(film.actor) == -1 ) {
      allActors.push(film.actor);
    }
  });
  return allActors;
};

bonds.totalGross = function() {
  var totalGross = 0;
  _.each(bonds.films, function(film){
    var thisGross = bonds.gross( film );
    totalGross += thisGross;
  });
  return totalGross;
};

bonds.titles = function(wordshash){
  var wordNum = wordshash.words;
  var allTitles = _.pluck(bonds.films, 'title');
  // debugger;
  var correctTitles = [];
  _.each(allTitles, function( title ) {
    var titleArray = title.split(' ');
    if( titleArray.length == wordNum ){
      correctTitles.push(title);
    }
  });
  return correctTitles;
};

bonds.starCount = function() {
  var actors = bonds.getActors();
  // debugger;
  var starCount = {};
  _.each(actors, function(actorName ){

    theirMovies = _.where(bonds.films, {actor: actorName});
    starCount[actorName] = theirMovies.length;
  });
  return starCount;
};

bonds.loneliestBond = function() {
  var actorHash = bonds.starCount();
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
};

bonds.oddBonds = function() {

  var oddBonds = _.reject(bonds.films, function(film) {
    return film.year % 2 === 0;
  });

  var titleArray = _.pluck(oddBonds, 'title');
  return titleArray;

};

bonds.bestBond = function() {
  var actors = bonds.getActors();
  // debugger;
  var starCount = [];
  _.each(actors, function(actorName ){
    // debugger;
    theirMovies = _.where(bonds.films, {actor: actorName});
    var theirGross = 0;
    console.log(theirGross);
    _.each(theirMovies, function(movie){
      // debugger;
      theirGross += bonds.gross(movie);
    });
    starCount.push( {actor: actorName, gross: theirGross / theirMovies.length} );
// debugger;
  });

var bond = _.max(starCount, function(bond){ return bond.gross;});

  return bond;

 };


bonds.worstBond = function() {

  var actors = bonds.getActors();
  // debugger;
  var starCount = [];
  _.each(actors, function(actorName ){
    // debugger;
    theirMovies = _.where(bonds.films, {actor: actorName});
    var theirGross = 0;
    console.log(theirGross);
    _.each(theirMovies, function(movie){
      // debugger;
      theirGross += bonds.gross(movie);
    });
    starCount.push( {actor: actorName, gross: theirGross / theirMovies.length} );
// debugger;
  });

var bond = _.min(starCount, function(bond){ return bond.gross;});

  return bond;
};









