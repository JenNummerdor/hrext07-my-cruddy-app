$(document).ready(function () {

  var uneditedDatesArr = []
  // getDatesInLocalStorage() //problem is that this is not being constantly updated

  var refreshChart = function () {
    chart.load({
      columns: [
        ['x'].concat(getDatesInLocalStorage()),
        ["cups of coffee"].concat(getDataForChart.getCupsFunc()),
        ["sleep"].concat(getDataForChart.getSleepFunc()),
        ["social"].concat(getDataForChart.getSocialFunc()),
        ["diet"].concat(getDataForChart.getDietFunc()),
        ["exercise"].concat(getDataForChart.getExerciseFunc()),
      ],
    })
    for (let key in localStorage) {
      if (key.includes("2019") && !uneditedDatesArr.includes(key)) {
        uneditedDatesArr.push(key)
      }
    }
    return uneditedDatesArr;
    // $(".dropdown-menu").empty()
  }

  //this is what happens when the button is clicked
  $(".btn-primary").on('click', function (e) {
    var selValue1 = $('input[name=originalradio]:checked').val();
    var selValue2 = $('input[name=originalradio2]:checked').val();
    var selValue3 = $('input[name=originalradio3]:checked').val();
    var selValue4 = $('input[name=originalradio4]:checked').val();
    var selValue5 = $('input[name=originalradio5]:checked').val();

    var date = new Date()
    var isoDate = date.toISOString()
    localStorage.setItem(isoDate, [selValue1, selValue2, selValue3, selValue4, selValue5]);
    refreshChart();
    // if(isoDate === isoDate) { //date is the same (this is not the way to write this) // FIXME: figure out how to check if date already exists
    //   alert("Hey! You've already written your coffee intake for today.") //DO NOT WRITE TO DB
    // }
  });


  $(".btn-success").on("click", function () {
    for (var i = 0; i < uneditedDatesArr.length; i++) {
      $(".dropdown-menu").add(`<a class="dropdown-item" type="button" id="date">${uneditedDatesArr[i]}</a>`).appendTo($(".dropdown-menu"))
      //FIXME: this still adds things it shouldn't. send help
      $(".dropdown-item").on("click", function () {
        $(".popup, .popup-content").addClass("active");
        // var prettyDate = uneditedDatesArr[i].slice(0, 10)
        var editThisOne = ($(this).text())
        $("header").replaceWith(`<h2 style="color: red">Change Your Answer for ${editThisOne}</h2>`)
        //buttons
        //other form - hidden
        $(".btn-group").css({"display": "none"})
        $(".btn-secondary").css({"display": "inline"})
        $(".btn-outline-secondary").css({"display": "inline"})
      });
    }
  })

  $(".btn-secondary").on("click", function () {
    var updateVal = $('input[name=popupradio]:checked').val();
    var wholeHeading = ($("h2").text())
    var currentWorkingDate = (wholeHeading.slice(23, wholeHeading.length))

    $(".container-form").css({"display": "block"})
    localStorage.removeItem(currentWorkingDate)
    localStorage.setItem(currentWorkingDate, updateVal)
    refreshChart()
  })

  $(".btn-outline-secondary").on("click", function () {
    $(".btn-group").css({"display": "inline"})
    $(".btn-secondary").css({"display": "none"})
    $(".btn-outline-secondary").css({"display": "none"})
  });

  // delete item
  $('.btn-warning').on('click', function () {
    var lastElem = uneditedDatesArr.length - 1
    localStorage.removeItem(uneditedDatesArr[lastElem])
    uneditedDatesArr.splice(lastElem)
    refreshChart()
  });

  // delete all?
  $(".btn-danger").on("dblclick", function () {
    $(".dropdown-menu").empty()
    uneditedDatesArr = []
    localStorage.clear();
    refreshChart()
  });

  //will display warning to user before deleting
  $(function () {
    $('[data-toggle="popover"]').popover()
  })

});