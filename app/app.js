$(document).ready(function () {

  //this needs to be available throughout the document:
  var uneditedDatesArr = []

  var refreshChart = function () {
    chart.load({
      columns: [
        ['x'].concat(getDatesInLocalStorage()),
        ["cups"].concat(getCupsInLocalStorage()),
      ]
    })
    for (let key in localStorage) {
      if (key.includes("2019") && !uneditedDatesArr.includes(key)) {
        uneditedDatesArr.push(key)
      }
    }
    $(".dropdown-menu").empty()
  }

  //this is what happens when the button is clicked
  $(".btn-primary").on('click', function (e) {
    var selValue = $('input[name=exampleRadios]:checked').val();
    var date = new Date()
    var isoDate = date.toISOString()
    localStorage.setItem(isoDate, selValue);

    refreshChart()
    // if(isoDate === isoDate) { //date is the same (this is not the way to write this)
    //   alert("Hey! You've already written your coffee intake for today.") //DO NOT WRITE TO DB
    // }
  });


  $(".btn-success").on("click", function () {
    for (var i = 0; i < uneditedDatesArr.length; i++) {
      var prettyDate = uneditedDatesArr[i].slice(0, 10)
      $(".dropdown-menu").add(`<a class="dropdown-item" href="#">${prettyDate}<br></a>`).appendTo($(".dropdown-menu"))
    }
  })

  // delete item
  $('.btn-warning').on('click', function () {
    var lastElem = uneditedDatesArr.length - 1

    localStorage.removeItem(uneditedDatesArr[lastElem])
    uneditedDatesArr.splice(lastElem)
    refreshChart()
  });

  // delete all?
  $(".btn-danger").click(function () {
    $(".dropdown-menu").empty()
    uneditedDatesArr = []
    localStorage.clear();
    refreshChart()
  });

});