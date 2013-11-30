



var Film = Backbone.Model.extend({
  gross: function(){
    return parseInt(this.get('gross').slice(1).split(',').join(''), null);
  }




});


var Films = Backbone.Collection.extend({
  model: Film,

  getActors: function(){
    var actors = _.uniq(_.map(bonds.films, function(k) { return k.actor; } ));
    return actors;
  },

  totalGross: function(){
    var grosses = _.map(bonds.films, function(film) { return bonds.gross(film); });
    var grossProfit = _.reduce(grosses, function(memo, num){ return memo + num; });
    return grossProfit;
  },

  titles: function( options ){
    var numWords = options.words;
    var movies = _.filter(bonds.films, function(film) { return film.title.split(" ").length === numWords; });
    var titles = _.pluck(movies, 'title');
    return titles;
  },

  starCount: function(){
    var count = _.countBy(bonds.films, function(film){return film.actor;});
    return count;
  },

  loneliestBond: function(){
    var groups = _.groupBy(bonds.films, function(film){return film.actor;});
    var actor = _.min(groups, function(actor){return actor.length;});
    return actor[0].actor;
  },

  oddBonds: function(){
    var odds = _.filter(bonds.films, function(film){ return film.year % 2 !== 0 ;});
    return _.pluck(odds, 'title');

  },

  bestBond: function(){
    return _.max(bonds.grossCombo(), function(grossCombo) { return grossCombo.gross;} );
  },

  worstBond: function(){
    return _.min(bonds.grossCombo(), function(grossCombo) { return grossCombo.gross;} );
  },



  grossCombo: function(){
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

  }


});
