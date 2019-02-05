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
    $(".dropdown-menu").empty()
    return uneditedDatesArr;
  }

  //this is what happens when the submit button is clicked
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

  //click on green edit button
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

  $(document).on("click", function () {
    $(".dropdown-menu").empty()
    refreshChart()
  })

  //making edits after clicking on a date through edit button
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

  $(".btn-danger").on("click", function () {
    $(".dropdown-menu").empty()
  })

  //will display warning to user before deleting
  $(function () {
    $('[data-toggle="popover"]').popover()
  })

  //statistical data

  //Step 1: get a working array for each type of data
  var wellbeingArr = getDataForChart.getWellBeingFunc()
  var sleepArr = getDataForChart.getSleepFunc()
  var socialArr = getDataForChart.getSocialFunc()
  var dietArr = getDataForChart.getDietFunc()
  var exerciseArr = getDataForChart.getExerciseFunc()

  //Step 2: find the average of each array
  var getTheMean = function (varName) {
    return ((varName.map(x => eval(x))).reduce((x, y) => x + y) / varName.length)
  }
  var wellbeingMean = getTheMean(wellbeingArr)
  var sleepMean = getTheMean(sleepArr)
  var socialMean = getTheMean(socialArr)
  var dietMean = getTheMean(dietArr)
  var exerciseMean = getTheMean(exerciseArr)

  //Step 3: get the comparison values for each data point: each value in the original array minus the mean (Step1 - Step2)
  var getBVals = function (varArr, varMean) { //comparison as "B"
    var b = []
    for (var i = 0; i < varArr.length; i++) {
      b.push(eval(varArr[i]) - varMean)
    }
    return b;
  }
  var wellBeingAVals = getBVals(wellbeingArr, wellbeingMean)
  var sleepBVals = getBVals(sleepArr, sleepMean)
  var socialBVals = getBVals(socialArr, socialMean)
  var dietBVals = getBVals(dietArr, dietMean)
  var exerciseBVals = getBVals(exerciseArr, exerciseMean)

  //Step 4: multiply each variable with wellbeing, reduce it into a single value
  var multiplyAAndB = function (varAVals, varBVals) {
    var resultArr = [];
    for (var i = 0; i < varAVals.length; i++) {
      resultArr.push(varAVals[i] * varBVals[i])
    }
    return resultArr.reduce((x, y) => x + y)
  }
  var sleepMult = multiplyAAndB(wellBeingAVals, sleepBVals)
  var socialMult = multiplyAAndB(wellBeingAVals, socialBVals)
  var dietMult = multiplyAAndB(wellBeingAVals, dietBVals)
  var exerciseMult = multiplyAAndB(wellBeingAVals, exerciseBVals)

  //Step 5: Use the original Data from Step 3 to square the values and reduce into single value
  var getSquaredVals = function (arrName) {
    var resultArr = [];
    for (var i = 0; i < arrName.length; i++) {
      resultArr.push(arrName[i] * arrName[i])
    }
    return resultArr.reduce((x, y) => x + y)
  }
  var squaredWellBeing = getSquaredVals(wellBeingAVals)
  var squaredSleep = getSquaredVals(sleepBVals)
  var squaredSocial = getSquaredVals(socialBVals)
  var squaredDiet = getSquaredVals(dietBVals)
  var squaredExercise = getSquaredVals(exerciseBVals)

  var relationalDataBetweenAAndB = function (squaredB, multB) {
    return (multB / (Math.sqrt(squaredWellBeing * squaredB)))
  }

  var wellToSleepCorr = relationalDataBetweenAAndB(squaredSleep, sleepMult)
  var wellToSocialCorr = relationalDataBetweenAAndB(squaredSocial, socialMult)
  var wellToDietCorr = relationalDataBetweenAAndB(squaredDiet, dietMult)
  var wellToExerCorr = relationalDataBetweenAAndB(squaredExercise, exerciseMult)

  $(".sleepsig").append(wellToSleepCorr)
  $(".socialsig").append(wellToSocialCorr)
  $(".dietsig").append(wellToDietCorr)
  $(".exercisesig").append(wellToExerCorr)

});