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

    var lag = data[i][6];
    var distance;
    if (out[j].points.length === 0) {
      distance = 0;
    } else {
      distance = turf.distance(point2GeoJSon(data[i][2], data[i][1]), point2GeoJSon(out[j].points[out[j].points.length - 1].long, out[j].points[out[j].points.length - 1].lat));
    }

    out[j].points.push({
      lat: data[i][1],
      long: data[i][2],
      speed: data[i][3],
      head: data[i][4],
      time: data[i][5],
      lag: lag,
      distance: distance
    });

    out[j].count++;

  }

  return out;
}

var parser = csv.parse({ delimiter: ';' }, (error, data) => { 
  //'plate';'latitude';'longitude';'speed';'orientation';'time';'lag'
  if (!error) {

    var tx = transform(data);

    fs.writeFile('./maybe_bus.json', JSON.stringify(tx), 'utf8');
  }
});

fs.createReadStream('../puntos_Bus.csv').pipe(parser);
