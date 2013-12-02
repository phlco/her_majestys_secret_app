var Film = Backbone.Model.extend({

  initialize: function(query){
    console.log("Film model created");
    this.set('film', query);
  },

  gross: function(){
    var film = this.get('film');
    return parseInt(film.gross.slice(1).split(',').join(''));
  }
});


var Films = Backbone.Collection.extend({
  model: Film,

  getActors: function(){
    return _.uniq(this.pluck('actor'));
  },

  totalGross: function(){
    this.map(bonds.films, function(film) { return bonds.gross(film) });
  }
});

var sum = _.reduce(listGross, function(memo, num) { return memo + num; });
  return sum;


// var FilmsView = Backbone.View.extend({

//   el: "#films",

//   initialize: function(){
//     this.collection.each(function(film){
//       var filmView = this;
//       this.collection.each(function(film){
//         filmView.render(film.get('title'));
//       });
//     },

//   render: function(title){
//     $('body').append(title);
//   }

// });


var film1 = new Film();
