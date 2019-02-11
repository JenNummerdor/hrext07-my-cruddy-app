$(document).ready(function () {

  //this needs to be available throughout the document:
  var refreshChart = function(){
    chart.load({
      columns: [
      ['x'].concat(getDatesInLocalStorage()),
      ["cups"].concat(getCupsInLocalStorage()),]
    })
    //this will also have to update the HTML with the update list of dates, right?
  }

  //this is what happens when the button is clicked
  $(".btn-primary").on('click', function (e) {
    var selValue = $('input[name=exampleRadios]:checked').val();
    var date = new Date() 
    var isoDate = date.toISOString()
    localStorage.setItem(isoDate, selValue);

    // if(isoDate === isoDate) { //date is the same (this is not the way to write this)
    //   alert("Hey! You've already written your coffee intake for today.") //DO NOT WRITE TO DB
    // }
    refreshChart()
  });

  //update function will be pop down menu with dates, 
  //select date 
    //GET data from local storage --am I going to have to rewrite this to the html document each time??
    //display data from local storage
  //select form to correct
  //will be taken to new form
  //will change answer and submit for that date

  // delete item
  $('.btn-warning').on('click', function() {
    var uneditedDatesArr = []
    for(let key in localStorage) {
      if (key.includes("2019")) {
        uneditedDatesArr.push(key)
      }
    }
    localStorage.removeItem(uneditedDatesArr[uneditedDatesArr.length -1])
    refreshChart()
  });


  // delete all?
  $(".btn-danger").click(function () {
    localStorage.clear();
    refreshChart()
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