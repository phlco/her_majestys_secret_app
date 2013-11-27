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
  var gSubbed = parseInt(film.gross.slice(1).split(',').join(''));
  return gSubbed;
}

bonds.getActors = function() {
  var allTheActors = _.pluck(bonds.films, "actor");
  var uniqueActors = [];
  _.each(allTheActors, function(el, i) {
    if (uniqueActors.indexOf(el) === -1) {
      uniqueActors.push(allTheActors[i]);
    }
  });
  return uniqueActors;
}

bonds.totalGross = function() {
  var totalGross = _.pluck(bonds.films, "gross");
  totalGross = _.map(totalGross, function(el) { return parseInt(el.slice(1).split(',').join(''))});
  totalGross = _.reduce(totalGross, function(memo, num) {
    return memo + num;
  });
  return totalGross;
}

bonds.titles = function(obj) {
  var titles = _.pluck(bonds.films, "title");
  titles = _.map(titles, function(title) {
    if (title.split(' ').length === obj.words) {
      return title;
    }
  });
  titles = _.compact(titles);
  return titles;
}

bonds.starCount = function() {
  var starCount = {};
  _.each(bonds.films, function(film) {
    if (starCount[film.actor]) {
      starCount[film.actor] += 1;
    } else {
      starCount[film.actor] = 1;
    }
  });
  return starCount;
}

bonds.loneliestBond = function() {
  var starCount = bonds.starCount();
  var sortable = [];
  for (var star in starCount) {
    sortable.push([star, starCount[star]]);
  }
  sortable.sort(function(a, b) {return a[1] - b[1]});
  return sortable[0][0];
}

bonds.oddBonds = function() {
  var oddFilms = _.map(bonds.films, function(film) {
    if (film.year % 2 !== 0) {
      return film.title;
    }
  });
  oddFilms = _.compact(oddFilms);
  return oddFilms;
}

bonds.bestBond = function() {
  var grossArrays = {};
  _.each(bonds.films, function(film) {
    if (grossArrays[film.actor]) {
      grossArrays[film.actor].push(parseInt(film.gross.slice(1).split(',').join('')));
    } else {
      grossArrays[film.actor] = [parseInt(film.gross.slice(1).split(',').join(''))];
    }
  });

  var grossAvgs = {};

  _.each(grossArrays, function(key, value) {

    var numFilms = key.length;
    var totalGross = _.reduce(key, function(memo, num) {
      return memo + num;
    });
    var avgGross = totalGross / numFilms;

    grossAvgs[value] = avgGross;
  });

  var sortable = [];
  for (var star in grossAvgs) {
    sortable.push([star, grossAvgs[star]]);
  }

  sortable.sort(function(a, b) {return b[1] - a[1]});

  var bestBond = {}
  bestBond['actor'] = sortable[0][0];
  bestBond['gross'] = sortable[0][1];

  return bestBond;
}

bonds.worstBond = function() {
var grossArrays = {};
  _.each(bonds.films, function(film) {
    if (grossArrays[film.actor]) {
      grossArrays[film.actor].push(parseInt(film.gross.slice(1).split(',').join('')));
    } else {
      grossArrays[film.actor] = [parseInt(film.gross.slice(1).split(',').join(''))];
    }
  });

  var grossAvgs = {};

  _.each(grossArrays, function(key, value) {

    var numFilms = key.length;
    var totalGross = _.reduce(key, function(memo, num) {
      return memo + num;
    });
    var avgGross = totalGross / numFilms;

    grossAvgs[value] = avgGross;
  });

  var sortable = [];
  for (var star in grossAvgs) {
    sortable.push([star, grossAvgs[star]]);
  }

  sortable.sort(function(a, b) {return a[1] - b[1]});

  var bestBond = {}
  bestBond['actor'] = sortable[0][0];
  bestBond['gross'] = sortable[0][1];

  return bestBond;
}
