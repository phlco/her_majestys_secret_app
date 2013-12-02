function listAppend(htmlContent){
  var li = $('<li>');
      li.html(htmlContent);
      appView.$el.append(li);
}

function prepareList(title){
  $('#title').html(title);
  appView.$el.html('');
}
