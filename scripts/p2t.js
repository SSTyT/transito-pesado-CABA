var fs = require('fs');
var csv = require('csv');
var moment = require('moment');
var turf = require('@turf/turf');


function point2GeoJSon(lat, long) {
  return {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [long, lat]
    }
  };
}

function transform(data) {
  var out = [];
  var current = "";
  var j = -1;

  for (var i = 0; i < data.length; i++) {
    if (current !== data[i][0]) {

      if (j >= 0) {
        var avgLag = 0;
        var distance = 0;
        out[j].points.forEach(function(point) {
          avgLag += point.lag;
          distance += point.distance;
        });

        out[j].avgLag = avgLag / (out[j].count - 1);
        out[j].avgDistance = distance / (out[j].count - 1);
        out[j].distance = distance;
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
    var distance;
    if (out[j].points.length === 0) {
      lag = 0;
      distance = 0;
    } else {
      lag = moment(data[i][3], 'YYYY-MM-DD HH:mm:ss') - moment(out[j].points[out[j].points.length - 1].time, 'YYYY-MM-DD HH:mm:ss');
      distance = turf.distance(point2GeoJSon(data[i][2], data[i][1]), point2GeoJSon(out[j].points[out[j].points.length - 1].long, out[j].points[out[j].points.length - 1].lat));
    }

    out[j].points.push({
      lat: data[i][1],
      long: data[i][2],
      speed: data[i][4],
      head: data[i][5],
      time: data[i][3],
      lag: lag,
      distance: distance
    });

    out[j].count++;

  }

  return out;
}

var parser = csv.parse({ delimiter: ';' }, (error, data) => {
  if (!error) {

    var tx = transform(data);

    tx.sort(function(a, b) {
      return a.avgLag - b.avgLag;
    });

    var out = [];
    var n = 50;
    var i = 0;
    var j = 0
    var minpoints = 50;
    var mindistance = 10;
    var minAvgDistance = 0.010
    while (j < n) {
      if (i >= tx.length) {
        break;
      }

      /*if (tx[i].count >= minpoints && tx[i].distance >= mindistance && tx[i].avgDistance >= minAvgDistance) {
        out.push(tx[i]);
        j++;
        console.log("asd");
      }*/
      out.push(tx[i]);
      i++;
    }

    fs.writeFile('./out.json', JSON.stringify(out), 'utf8');
  }
});

fs.createReadStream('../puntos.csv').pipe(parser);
