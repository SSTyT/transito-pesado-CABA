var fs = require('fs');
var csv = require('csv');


var parser = csv.parse({ delimiter: ';' }, (error, data) => {
  if (!error) {
    console.log(data);
  }
});

fs.createReadStream('../puntos.csv').pipe(parser);
