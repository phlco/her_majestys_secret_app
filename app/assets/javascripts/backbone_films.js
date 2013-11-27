
var Film = Backbone.Model.extend({
  gross: function() {
    var gross = this.get('gross');
    return parseInt( gross.replace(/[^0-9]/g, "") );
  },
});

var Films = Backbone.Collection.extend({
  model: Film,
  getActors: function() {
    return _.uniq(_.map(this.models, function(a,b,c) {
      return a.get('actor')
    }))
  },
  totalGross: function() {
    return _.reduce(this.models, function(memo,film) {
      return memo + film.gross()
    }, 0)
  },
  titles: function(query) {
    var n = query['words']
    var films =  _.filter(this.models, function(film) {
      return film.get('title').split(" ").length == n
    })
    return _.map(films, function(film) {return film.get('title')})
  },
  starCount: function() {
    var starCount = {}
    _.each(this.models, function(film) {
      if (starCount[film.get('actor')] !== undefined) {
        starCount[film.get('actor')]++;
      } else {
        starCount[film.get('actor')] = 1
      }
    })
  return starCount
  },
  loneliestBond: function() {
    sorted = _.pairs(this.starCount())
    return _.sortBy(sorted, function(a){ return a[1]})[0][0]
  },
  oddBonds: function() {
    var films = _.filter(this.models, function(film) {
      return film.get('year') % 2 == 1
    })
    return _.map(films, function(film) {return film.get('title')})
  },
  actorsByAverageGross: function() {
    var starCount = this.starCount()
    var that = this
    averages = _.map(this.getActors(), function(actor) {
      var movies = that.where({actor: actor});
      var totalGross =  movies.reduce(function(memo,movie) {
        return memo + movie.gross()
      }, 0)
      var count = starCount[actor]
      var average = totalGross/count
      return [actor, average]
    })

    return  _.sortBy(averages, function(a){ return a[1]})
  },

  bestBond: function() {
    var sortedAverages = this.actorsByAverageGross();
    sortedAverages = sortedAverages[sortedAverages.length-1]
    return {actor: sortedAverages[0], gross: sortedAverages[1]}
  },
  worstBond: function() {
    var sortedAverages = this.actorsByAverageGross();
    sortedAverages = sortedAverages[0]
    return {actor: sortedAverages[0], gross: sortedAverages[1]}
  },

})
