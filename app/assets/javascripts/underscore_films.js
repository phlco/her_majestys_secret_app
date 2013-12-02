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

bonds.gross = function(film){
  var gross = film.gross;
  return parseInt(gross.slice(1).split(',').join(''));
};

bonds.getActors = function(){
  var allActors = _.pluck(bonds.films, 'actor');
  var uniqueActors = _.uniq(allActors);
  return uniqueActors;
};

bonds.totalGross = function(){
  // get array of each title's gross
  // get sum
  var listGross = _.map(bonds.films, function(film) { return bonds.gross(film) });
  var sum = _.reduce(listGross, function(memo, num) { return memo + num; });
  return sum;
};

// bonds.titles = function(options){
//   var number = options.words;
//   var allTitles = _.pluck(bonds.films, 'title');
//   var splitTitles = _.map(allTitles, function(title){
//     return title.split(' ');
//   });
//   var titles = [];
//   _.each(splitTitles, function(titleArray){
//     if (titleArray.length === number) {
//       var title = titleArray.join(' ');
//       titles.push(title);
//     }
//   });
//   return titles;
// };

bonds.titles = function(options){
  var number = options.words;

  var picks = _.filter(bonds.films, function(film){
    return film.title.split(' ').length === number;
  });
  return _.pluck(picks, "title");
};

bonds.starCount = function(){
  var actors = _.countBy(bonds.films, function(film){
    return film.actor;
  });
  return actors;
};

// _.sortBy(list, iterator, [context])
bonds.loneliestBond = function(){
  var actors = bonds.starCount();
  var paired = _.pairs(actors);
  // console.log(paired);
  var loneliestGuy = _.min(paired, function(a){
    // console.log(a);
    return a[1];
    // return a.n;
  });
  // debugger;
  // console.log(loneliestGuy);
  return loneliestGuy[0];
};

bonds.oddBonds = function(){
  // var odds = _.map(bonds.films, function(film){
  //   if (film.year % 2 !== 0) {
  //     var title = film.title;
  //     var year = film.year;
  //     return film;
  //   }
  // });
  // console.log(odds);
  // return odds;
  // filter out years that are odd
  var odds = _.filter(bonds.films, function(film){return (film.year % 2 !== 0) });
  console.log(odds);
  var titles = _.map(odds, function(film){ return film.title });
  return titles;
};

bonds.bestBond = function() {
  return _.max(
    _.map(_.groupBy(bonds.films, 'actor'), function(films, actor){
      var numberOfFilms = films.length;
      var grosses = _.map(films, function(film){
        return bonds.gross(film);
      });
      var totalGross = _.reduce(grosses, function(memo, num){
        return memo + num;
      });
      var average = totalGross/numberOfFilms;
      return { actor: actor, gross: average };
      }), function(actor){
      return actor.gross;
      }
  );
};

bonds.worstBond = function() {
  return _.min(
    _.map(_.groupBy(bonds.films, 'actor'), function(films, actor){
      var numberOfFilms = films.length;
      var grosses = _.map(films, function(film){
        return bonds.gross(film);
      });
      var totalGross = _.reduce(grosses, function(memo, num){
        return memo + num;
      });
      var average = totalGross/numberOfFilms;
      return { actor: actor, gross: average };
      }), function(actor){
      return actor.gross;
      }
  );
};




