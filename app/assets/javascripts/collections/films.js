var Film = Backbone.Model.extend({
  initialize: function(query) {
    this.set('film', query);
  },
  gross: function() {
    var film = this.get('film');
    var gSubbed = parseInt(film.gross.slice(1).split(',').join(''));
    return gSubbed;
  },
  actor: function() {
    var film = this.get('film');
    return film.actor;
  },
  title: function() {
    var film = this.get('film');
    return film.title;
  }
});

var Films = Backbone.Collection.extend({
  model: Film,

  getActors: function() {
    var allTheActors = _.map(this.models, function(film) {
      return film.actor();
    });
    var uniqueActors = [];
    _.each(allTheActors, function(el, i) {
      if (uniqueActors.indexOf(el) === -1) {
        uniqueActors.push(allTheActors[i]);
      }
    });
    return uniqueActors;
  },
  totalGross: function() {
    var totalGross = _.map(this.models, function(film) {
      return film.gross();
    });
    totalGross = _.reduce(totalGross, function(memo, num) {
      return memo + num;
    });
    return totalGross;
  },
  titles: function(obj) {
    var titles = _.map(this.models, function(film) {
      return film.title();
    });
    titles = _.map(titles, function(title) {
      if (title.split(' ').length === obj.words) {
        return title;
      }
    });
    titles = _.compact(titles);
    return titles;
  },
  starCount: function() {
    var films = _.map(this.models, function(film) {
      return film.get('film');
    });

    var starCount = {};

    _.each(films, function(film) {
      if (starCount[film.actor]) {
        starCount[film.actor] += 1;
      } else {
        starCount[film.actor] = 1;
      }
    });
    return starCount;
  },
  loneliestBond: function() {
    var starCount = this.starCount();
    var sortable = [];
    for (var star in starCount) {
      sortable.push([star, starCount[star]]);
    }
    sortable.sort(function(a, b) {return a[1] - b[1]});
    return sortable[0][0];
  },
  oddBonds: function() {
    var films = _.map(this.models, function(film) {
      return film.get('film');
    });

    var oddFilms = _.map(films, function(film) {
      if (film.year % 2 !== 0) {
        return film.title;
      }
    });
    oddFilms = _.compact(oddFilms);
    return oddFilms;
  },
  bestBond: function() {
    var films = _.map(this.models, function(film) {
      return film.get('film');
    });

    var grossArrays = {};
    _.each(films, function(film) {
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
  },
  worstBond: function() {
    var films = _.map(this.models, function(film) {
      return film.get('film');
    });

    var grossArrays = {};
    _.each(films, function(film) {
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

    var worstBond = {}
    worstBond['actor'] = sortable[0][0];
    worstBond['gross'] = sortable[0][1];

    return worstBond;
  }
});

