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


bonds.gross = function( film ) {
  var query  = _.findWhere( bonds.films, { title: film.title } );
  // included null parameter becuase JS Lint was showing missing radix parameter error
  var gross = parseInt(query.gross.slice(1).split(',').join(''), null);
  return gross;
};

bonds.getActors = function () {
  var actors = _.uniq(_.map(bonds.films, function(k) { return k.actor; } ));
  // return _.uniq(actors);
  return actors;
};

bonds.totalGross = function() {
  // var grosses = _.map(bonds.films, function(film) { return film.gross });
  var grosses = _.map(bonds.films, function(film) { return bonds.gross(film); });
  var grossProfit = _.reduce(grosses, function(memo, num){ return memo + num; });
  return grossProfit;
};

bonds.titles = function(options) {
  var numWords = options.words;
  var movies = _.filter(bonds.films, function(film) { return film.title.split(" ").length === numWords; });
  var titles = _.pluck(movies, 'title');
  return titles;
};

bonds.starCount = function() {
  var count = _.countBy(bonds.films, function(film){return film.actor;});
  return count;
};

bonds.loneliestBond = function() {
  var groups = _.groupBy(bonds.films, function(film){return film.actor;});
  var actor = _.min(groups, function(actor){return actor.length;});
  return actor[0].actor;
};

bonds.oddBonds = function() {
  var odds = _.filter(bonds.films, function(film){ return film.year % 2 !== 0 ;});
  return _.pluck(odds, 'title');
};

bonds.bestBond = function() {
  return _.max(bonds.grossCombo(), function(grossCombo) { return grossCombo.gross;} );
};


bonds.worstBond = function() {
  return _.min(bonds.grossCombo(), function(grossCombo) { return grossCombo.gross;} );
};



bonds.grossCombo = function() {
  var groups = _.groupBy(bonds.films, function(film){return film.actor;});

  var movies = _.map(groups, function(v, k, o) {
    var numMovies = v.length;

    var grossAmounts = _.map(v, function(film){
      return bonds.gross( film );
    });

    var sum = _.reduce(grossAmounts, function(memo, num){ return memo + num;});
    var avg = sum / numMovies;
    var grossObj = _.object(['actor', 'gross'],[k, avg]);

    return  grossObj; } );

  return movies;
};









