/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function () {

  $(".btn-primary").on('click', function (e) {

    var selValue = $('input[name=exampleRadios]:checked').val();

    console.log("this is the local storage get item", localStorage.getItem('Sat Feb 09 2019 20:49:26 GMT-0700 (Mountain Standard Time)'))
    // write to db
    var date = new Date()
    console.log(date)
    localStorage.setItem(date, selValue);
  });

  //will return all the cups in local storage
  var getCupsInLocalStorage = (function () {
    var cupsArr = []
    for (var key in localStorage) {
      if (typeof localStorage[key] === 'string') {
        cupsArr.push(localStorage[key])
      }
    }
    console.log(cupsArr)
  })()

  //will return all the dates in local storage
  var getDatesInLocalStorage = (function () {
    var datesArr = []
    for (var key in localStorage) {
      if (typeof key === 'string' && key.length > 10) {
        datesArr.push(key)
      }
    }
    console.log(datesArr)
  })()

  //update function will overwrite last entry written

  // delete item
  $('.container-data').on('click', '.display-data-item', function (e) {
    console.log(e.currentTarget.dataset.keyvalue);
    var keyData = e.currentTarget.dataset.keyvalue;
    localStorage.removeItem(keyData);
    $('.container-data').text('');
  });
  // delete all?
  $(".btn-danger").click(function () {
    localStorage.clear();
    $('.container-data').text('');
  });

});

// below is what we did in class, I'm saving it since who knows what kinds of mischief I'll get into
// var keyData = 'ourKey'; // going to need to make this dynamic?
//   $(".btn btn-primary").on('click', function(e){
//     console.log(e);
//     var keyData = $('.input-key').val();
//     var valueData = $('.input-value').val();
//     // write to db
//     localStorage.setItem(keyData, valueData);
//    
// var displayText = keyData + ' | ' + localStorage.getItem(keyData);
//     // this only displays the last one? might want to switch to html
//     // and append a div
//     // <div class="display-data-item" data-keyValue="keyData">valueData</div>
//     // TODO make this vars make sense across the app
//     $('.container-data').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+valueData+'</div>');
//     $('.input-key').val('');
//     $('.input-value').val('');
//   });