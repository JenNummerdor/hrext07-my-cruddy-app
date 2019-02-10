  //the Graph
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: data,
      type : 'pie',
      labels: true,
      colors: {
          sleep: '#494344',
          eat: '#625159',
          code: '#7c4540',
          relax: '#99424f',
          other: '#9f5561',
        }
    },
      pie: {
      label: {
          format: function (value) {
              return value + ' hours';
          },
      },
  },
});

var data = [
  ['sleep', 8],
  ['eat', 3],
  ['code', 7],
  ['relax', 2],
  ['other', 4]
];

  //End of the Graph 