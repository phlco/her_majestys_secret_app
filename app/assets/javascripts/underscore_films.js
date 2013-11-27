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
  var num = film.gross.slice(1).split(',').join('');
  return parseInt(num);
};

bonds.getActors = function(){
  var actors = _.map(this.films, function(film){
    return film.actor;
  });
  return _.uniq(actors);
};

bonds.totalGross = function(){
  var grossArray = _.map(this.films, function(film){ return bonds.gross(film); } );
  var gross = _.reduce(grossArray, function(memo, num){ return memo + num; }, 0);
  return gross;
};

bonds.titles = function( options ){
  var titles = _.map(this.films, function(film){
    return film.title;
  });
  var titleWordCount = [];
  for (var i = 0; i<titles.length;i++){
    if (options.words === titles[i].split(' ').length) {
      titleWordCount.push(titles[i]);
    }
  }
  return titleWordCount;
};

bonds.starCount = function(){
  var actors = _.countBy(this.films, function(film){
    return film.actor;
  });
  return actors;
};

bonds.loneliestBond = function(){
  var actors = _.groupBy(this.films, function(film){
    return film.actor;
  });
  var filmCount = [];
  for(var key in actors){
    var value = actors[key];
    filmCount.push(value);
  }
  var filmSize = [];
  for (var i = 0; i<filmCount.length; i++){
    var size = _.size(filmCount[i]);
    filmSize.push(size);
  }
  var minFilmSize = _.min(filmSize);
  for (var p = 0; p<filmCount.length; p++){
    if (minFilmSize == _.size(filmCount[p])){
      return (filmCount[p][0].actor);
    }
  }
};

bonds.oddBonds = function(){
  var years = _.map(this.films, function(film){
    return film.year;
  });
  var odds = _.filter(years, function(num){
    return num % 2 !== 0;
  });
  var oddYears = [];
  for (var i = 0; i<odds.length; i++){
    var filmByYear = _.findWhere(this.films, { year: odds[i] });
    oddYears.push(filmByYear.title);
  }
  return oddYears;
};

bonds.bestBond = function(){
  return _.max(
    _.map(_.groupBy(bonds.films, "actor"), function(films, actor){
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

bonds.worstBond = function(){
  return _.min(
    _.map(_.groupBy(bonds.films, "actor"), function(films, actor){
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
