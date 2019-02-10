/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){

  $(".btn-primary").on('click', function(e){
    var selValue = $('input[name=exampleRadios]:checked').val();
    console.log(selValue)
    // write to db
    localStorage.setItem(new Date(), selValue);
  });


  // delete item
  $('.container-data').on('click', '.display-data-item', function(e){
    console.log(e.currentTarget.dataset.keyvalue);
    var keyData = e.currentTarget.dataset.keyvalue;
    localStorage.removeItem(keyData);
    $('.container-data').text('');
  });
  // delete all?
  $(".btn-danger").click(function(){
    localStorage.clear();
    $('.container-data').text('');
  });

});

//below is what we did in class, I'm saving it since who knows what kinds of mischief I'll get into
//var keyData = 'ourKey'; // going to need to make this dynamic?
  // $(".btn btn-primary").on('click', function(e){
  //   console.log(e);
  //   var keyData = $('.input-key').val();
  //   var valueData = $('.input-value').val();
  //   // write to db
  //   localStorage.setItem(keyData, valueData);
  //   // read from db -> not sure I want to do this yet...
  //   var displayText = keyData + ' | ' + localStorage.getItem(keyData);
  //   // this only displays the last one? might want to switch to html
  //   // and append a div
  //   // <div class="display-data-item" data-keyValue="keyData">valueData</div>
  //   // TODO make this vars make sense across the app
  //   $('.container-data').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+valueData+'</div>');
  //   $('.input-key').val('');
  //   $('.input-value').val('');
  // });
