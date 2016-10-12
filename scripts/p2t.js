var fs = require('fs');
var csv = require('csv');
var moment = require('moment');



var parser = csv.parse({ delimiter: ';' }, (error, data) => {
  if (!error) {
    var out = [];
    var current = "";
    var j = -1;


    for (var i = 0; i < data.length; i++) {
      if (current !== data[i][0]) {

        if (j >= 0) {
          var avgLag = 0;
          out[j].points.forEach(function(point) {
            avgLag += point.lag;
          });

          out[j].avgLag = avgLag / (out[j].count - 1);
        }

        current = data[i][0];
        j++
        out[j] = {
          plate: current,
          count: 0,
          points: []
        };
      }

      var lag;
      if (out[j].points.length === 0) {
        lag = 0;
      } else {
        lag = moment(data[i][3].replace(/-03$/, '')) - moment(out[j].points[out[j].points.length - 1].time);
      }

      out[j].points.push({
        lat: data[i][1],
        long: data[i][2],
        speed: data[i][4],
        head: data[i][5],
        time: data[i][3].replace(/-03$/, ''),
        lag: lag
      });

      out[j].count++;

    }

    console.log(JSON.stringify(out));
  }
});

fs.createReadStream('../puntos.csv').pipe(parser);
