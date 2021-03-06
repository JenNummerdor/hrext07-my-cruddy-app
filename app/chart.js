//this object generates data for all parts of the chart
var getDataForChart = {
  getMasterFunc: (function () {
    this.masterArr = [];
    for (var key in localStorage) {
      if (typeof localStorage[key] === 'string') {
        masterArr.push(localStorage[key]);
      }
    }
    return masterArr
  })(),
  getWellBeingFunc: function () {
    var wellArr = []
    for (var i = 0; i < masterArr.length; i++) {
      wellArr.push(masterArr[i][0])
    }
    return wellArr;
  },
  getSleepFunc: function () {
    var sleepArr = []
    for (var i = 0; i < masterArr.length; i++) {
      sleepArr.push(masterArr[i][2])
    }
    return sleepArr;
  },
  getSocialFunc: function () {
    var socialArr = []
    for (var i = 0; i < masterArr.length; i++) {
      socialArr.push(masterArr[i][4])
    }
    return socialArr;
  },
  getDietFunc: function () {
    var dietArr = []
    for (var i = 0; i < masterArr.length; i++) {
      dietArr.push(masterArr[i][6])
    }
    return dietArr;
  },
  getExerciseFunc: function () {
    var exerciseArr = []
    for (var i = 0; i < masterArr.length; i++) {
      exerciseArr.push(masterArr[i][8])
    }
    return exerciseArr
  }
}

//will return all the dates in local storage
var getDatesInLocalStorage = function () {
  var datesArr = []
  for (var key in localStorage) {
    if (key.includes("2019")) {
      key = key.slice(0, 10) //am changing to make it more functional temporarily
      datesArr.push(key)
    }
  }
  return datesArr;
}

var chartData = [
  ['x'].concat(getDatesInLocalStorage()),
  ["overall wellbeing"].concat(getDataForChart.getWellBeingFunc()),
  ["sleep"].concat(getDataForChart.getSleepFunc()),
  ["social"].concat(getDataForChart.getSocialFunc()),
  ["diet"].concat(getDataForChart.getDietFunc()),
  ["exercise"].concat(getDataForChart.getExerciseFunc()),
]

//will generate the chart!
var chart = c3.generate({
  data: {
    x: 'x',
    columns: chartData,
  },
  axis: {
    x: {
      type: 'timeseries',
      tick: {
        format: '%Y-%m-%d'
      }
    }
  },
});