import trayectoria from './tray.json';

console.log(trayectoria);

class HomeController {
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
    trayectoria.forEach((point) => {
      this.mapControl.addMarker(point.latitude, point.longitude);
    });
  }
}

export default HomeController;
