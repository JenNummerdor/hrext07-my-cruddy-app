//will return all data in local storage
var getDataForChart = function () {
  var masterArr = []
  for (var key in localStorage) {
    if (typeof localStorage[key] === 'string') {
      masterArr.push(localStorage[key])
    }
  }
    var cupsArr = []
    for(var i = 0; i < masterArr.length; i++) {
      cupsArr.push(masterArr[i][0])
    }
  var sleepArr = []
  for(var i = 0; i < masterArr.length; i++) {
    sleepArr.push(masterArr[i][1])
  }
  var socialArr = []
  for(var i = 0; i < masterArr.length; i++) {
    socialArr.push(masterArr[i][1])
  }
  var dietArr = []
  for(var i = 0; i < masterArr.length; i++) {
    dietArr.push(masterArr[i][1])
  }
  var exerciseArr = []
  for(var i = 0; i < masterArr.length; i++) {
    exerciseArr.push(masterArr[i][1])
  }
  return cupsArr//, cupsArr, sleepArr, socialArr, dietArr, exerciseArr;
}

  //will return all the dates in local storage
var getDatesInLocalStorage = function () {
  var datesArr = []
  for (var key in localStorage) {
    if (key.includes("2019")) {
      key = key.slice(0, 10)//am changing to make it more functional temporarily
      datesArr.push(key)
    }
  }
  console.log(datesArr)
  return datesArr;
}

var chart = c3.generate({
  data: {
    x: 'x',
    //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
    columns: [
      ['x'].concat(getDatesInLocalStorage()),
      ["cups of coffee"].concat(getDataForChart()),
      // ["hours of sleep"].concat(getHoursInLocalStorage()),
    ]
  },
  axis: {
    x: {
      type: 'timeseries',
      tick: {
        format: '%Y-%m-%d'
      }
    }
  }
});
