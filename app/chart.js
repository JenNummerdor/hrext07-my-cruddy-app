//will return all the cups in local storage
var getCupsInLocalStorage = function () {
  var cupsArr = []
  for (var key in localStorage) {
    if (typeof localStorage[key] === 'string') {
      cupsArr.push(localStorage[key])
    }
  }
  return cupsArr;
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
      ["cups of coffee"].concat(getCupsInLocalStorage()),
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



//End of the Graph 

//   //the Graph
//   var chart = c3.generate({
//     bindto: '#chart',
//     data: {
//       columns: data,
//       type : 'pie',
//       labels: true,
//       colors: {
//           sleep: '#494344',
//           eat: '#625159',
//           code: '#7c4540',
//           relax: '#99424f',
//           other: '#9f5561',
//         }
//     },
//       pie: {
//       label: {
//           format: function (value) {
//               return value + ' hours';
//           },
//       },
//   },
// });