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

bonds.getFilm = function( title ) { return _.findWhere(bonds.films, {title: title}) }

bonds.gross = function( film ) {
  return parseInt( film.gross.replace(/[^0-9]/g, "") )
}

bonds.getActors = function() {
   return _.uniq(_.map(bonds.films, function(a,b,c) {
    return a.actor
  }))
}

bonds.totalGross = function() {
  return _.reduce(bonds.films, function(memo,num) {
    return memo + bonds.gross( num )
  }, 0)
}

bonds.titles = function(query) {
  var n = query['words']
  films =  _.filter(bonds.films, function(film) {
    return film.title.split(" ").length == n
  })
  return _.map(films, function(film) {return film.title})
}

bonds.starCount = function() {
  var starCount = {}
  _.each(bonds.films, function(film) {
    if (starCount[film.actor] !== undefined) {
      starCount[film.actor]++;
    } else {
      starCount[film.actor] = 1
    }
  })
  return starCount
}

bonds.loneliestBond = function() {
  sorted = _.pairs(bonds.starCount())
  return _.sortBy(sorted, function(a){ return a[1]})[0][0]
}

bonds.oddBonds = function() {
  var films = _.filter(bonds.films, function(film) {
    return film.year % 2 == 1
  })
  return _.map(films, function(film) {return film.title})
}

bonds.bestBond = function() {
  var sortedAverages = bonds.actorsByAverageGross();
  sortedAverages = sortedAverages[sortedAverages.length-1]
  return {actor: sortedAverages[0], gross: sortedAverages[1]}
}

bonds.worstBond = function() {
  var sortedAverages = bonds.actorsByAverageGross();
  sortedAverages = sortedAverages[0]
  return {actor: sortedAverages[0], gross: sortedAverages[1]}
}

bonds.actorsByAverageGross = function() {
  var starCount = bonds.starCount()
  averages = _.map(bonds.getActors(), function(actor) {
    var movies = _.where(bonds.films, { actor: actor });
    var totalGross =  _.reduce(movies, function(memo,movie) {
      return memo + bonds.gross( movie )
    }, 0)
    var count = starCount[actor]
    var average = totalGross/count
    return [actor, average]
  })

  return  _.sortBy(averages, function(a){ return a[1]})
}
