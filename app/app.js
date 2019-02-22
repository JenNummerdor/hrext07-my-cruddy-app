$(document).ready(function () {

  var uneditedDatesArr = [] //this will include all parts of the time stamp but not any extra data that may or may not be pushed in by accident.
  // getDatesInLocalStorage() //problem is that this is not being constantly updated

  var refreshChart = function () {
    chart.load({
      columns: [
        ['x'].concat(getDatesInLocalStorage()),
        ["overall wellbeing"].concat(getDataForChart.getWellBeingFunc()),
        ["sleep"].concat(getDataForChart.getSleepFunc()),
        ["social"].concat(getDataForChart.getSocialFunc()),
        ["diet"].concat(getDataForChart.getDietFunc()),
        ["exercise"].concat(getDataForChart.getExerciseFunc()),
      ],
    })
    for (let key in localStorage) {
      if (key.includes("2019") && !uneditedDatesArr.includes(key)) {
        uneditedDatesArr.push(key.slice(0, 24))
      }
    }
    return uneditedDatesArr;
    // $(".dropdown-menu").empty()
  }

  //this is what happens when the button is clicked
  $(".btn-primary").on('click', function () {
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
        $(".btn-group").css({
          "display": "none"
        })
        $(".btn-secondary").css({
          "display": "inline"
        })
        $(".btn-outline-secondary").css({
          "display": "inline"
        })
      });
    }
  })

  $(".btn-secondary").on("click", function () {
    var selValue1 = $('input[name=originalradio]:checked').val();
    var selValue2 = $('input[name=originalradio2]:checked').val();
    var selValue3 = $('input[name=originalradio3]:checked').val();
    var selValue4 = $('input[name=originalradio4]:checked').val();
    var selValue5 = $('input[name=originalradio5]:checked').val();
    var wholeHeading = ($("h2").text())
    var currentWorkingDate = (wholeHeading.slice(23, 47)) //this will slice the heading after the current date and before any of the irrelvant information that also somehow gets passed into this function

    $(".container-form").css({
      "display": "block"
    })
    localStorage.removeItem(currentWorkingDate)
    localStorage.setItem(currentWorkingDate, [selValue1, selValue2, selValue3, selValue4, selValue5]);
    refreshChart()
  })

  $(".btn-outline-secondary").on("click", function () {
    $(".btn-group").css({
      "display": "inline"
    })
    $(".btn-secondary").css({
      "display": "none"
    })
    $(".btn-outline-secondary").css({
      "display": "none"
    })
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

  //statistical data
  var wellbeingArr = getDataForChart.getWellBeingFunc()
  var wellbeingMean = ((wellbeingArr.map(x => eval(x))).reduce((x, y) => x + y) / wellbeingArr.length)
  var getAVals = function () {
    var a = []
    for (var i = 0; i < wellbeingArr.length; i++) {
      a.push(eval(wellbeingArr[i]) - wellbeingMean)
    }
    return a;
  }

  var sleepArr = getDataForChart.getSleepFunc()
  var sleepMean = ((sleepArr.map(x => eval(x))).reduce((x, y) => x + y) / sleepArr.length)
  var getBVals = function () {
    var b = []
    for (var i = 0; i < sleepArr.length; i++) {
      b.push(eval(sleepArr[i]) - sleepMean)
    }
    return b;
  }

  var multiplyAAndB = function () {
    var aArr = getAVals() //[1, -1]
    var bArr = getBVals() //[0.5, -0.5]
    var resultArr = [];
    for (var i = 0; i < aArr.length; i++) {
      resultArr.push(aArr[i] * bArr[i])
    }
    return resultArr.reduce((x, y) => x + y)
  }

  var getASquared = function () {
    var aArr = getAVals() //[1, -1]
    var resultArr = [];
    for (var i = 0; i < aArr.length; i++) {
      resultArr.push(aArr[i] * aArr[i])
    }
    return resultArr.reduce((x, y) => x + y)
  }

  var getBSquared = function () {
    var bArr = getBVals() //[1, -1]
    var resultArr = [];
    for (var i = 0; i < bArr.length; i++) {
      resultArr.push(bArr[i] * bArr[i])
    }
    return resultArr.reduce((x, y) => x + y)
  }

  var relationalDataBetweenAAndB = function () {
    console.log(multiplyAAndB())
    return (multiplyAAndB() / (Math.sqrt(getASquared() * getBSquared())))
  }

  // if(wellbeingArr.length <4) {
  //   $(".sleepsig").append("You will want at least three points of data before proceeding")
  // }
  $(".sleepsig").append(relationalDataBetweenAAndB())

  //NOT DONE

  var socialArr = getDataForChart.getSocialFunc()
  var socialMean = ((socialArr.map(x => eval(x))).reduce((x, y) => x + y) / socialArr.length)

  var dietArr = getDataForChart.getDietFunc()
  var dietMean = ((dietArr.map(x => eval(x))).reduce((x, y) => x + y) / dietArr.length)

  var exerciseArr = getDataForChart.getExerciseFunc()
  var exerciseMean = ((exerciseArr.map(x => eval(x))).reduce((x, y) => x + y) / exerciseArr.length)

});