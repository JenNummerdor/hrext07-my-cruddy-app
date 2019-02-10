var cups = [
  ['Cups per Day', 1, 2, 3]
];

var chart = c3.generate({
  data: {
      x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
      columns: [
          ['x', '2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04', '2019-01-05', '2019-01-06'],
          ['data1', 30, 200, 100, 400, 150, 250],
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
  

  