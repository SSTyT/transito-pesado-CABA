import trayectoria from './tray.json';
import io from 'socket.io-client';

const socket = io('http://sstyt.ddns.net');

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
    this.trucks = {};
  }

  mapReady() {
    /*trayectoria.forEach((point) => {
      this.mapControl.addMarker(point.latitude, point.longitude);
    });*/
    socket.on('report', (report) => {
      if (this.trucks[report.encrypt_plate_id]) {
        this.trucks[report.encrypt_plate_id] = {...report, marker: this.trucks[report.encrypt_plate_id].marker.setLatLng([report.latitude, report.longitude]) };
      } else {
        this.trucks[report.encrypt_plate_id] = {...report, marker: this.mapControl.addMarker(report.latitude, report.longitude) };
      }
      console.log(report);
    });
  }
}

export default HomeController;
