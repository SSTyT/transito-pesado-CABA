import randomColor from 'randomcolor';
import vehiculos from './bus.json';

class TrucksController {
  constructor() {
    this.mapControl = {};
    this.mapOpts = {
      mapId: 'map',
      lat: -34.603722,
      long: -58.381592,
      zoom: 12,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      minZoom: 0,
      maxZoom: 18
    };
  }

  mapReady() {
    var colors = randomColor({ luminosity: 'dark', count: vehiculos.length });
    vehiculos.forEach((vehiculo, i) => {
      vehiculo.points.forEach((point) => {
        this.mapControl.addCircleMarker(point.lat, point.long, { color: colors[i] }).bindPopup(`<ul>
          <li>Id: ${vehiculo.plate}</li>
          <li>Velocidad: ${point.speed}</li>
          <li>Fecha y hora: ${point.time}</li>
          </ul>`);;
      });
    });

  }
}

export default TrucksController;
