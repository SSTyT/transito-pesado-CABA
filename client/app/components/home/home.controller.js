import trayectoria from './tray.json';
import io from 'socket.io-client';

const socket = io('http://sstyt.ddns.net');

const colorScales = [ //TODO mover a servicio de colores material
  '#1e88e5',
  '#B71C1C',
  '#F44336',
  '#F9A825',
  '#FDD835',
  '#8BC34A',
  '#64DD17'
];

function speedColor(speed) {
  //speed va de 0 a 59
  if (speed > 59) { speed = 59 };
  if (speed < 0) { speed = 0 };

  if (speed == 0) {
    return colorScales[0];
  } else {
    return colorScales[Math.floor(speed / 10) + 1];
  }
}

class HomeController {
  constructor(measured) {
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
    this.vehicles = {};
    this.metrics = measured.getCollection('reports');
    this.vehiclesMetrics = measured.getCollection('vehicles');
  }

  mapReady() {
    /*trayectoria.forEach((point) => {
      this.mapControl.addCircleMarker(point.latitude, point.longitude);
    });*/

    this.mapControl.addCluster('vehicles', { disableClusteringAtZoom: 13 });

    socket.on('report', (report) => {

      var markerOpts = {
        iconSize: [18, 18],
        className: 'nav-marker',
        html: `<md-icon class="material-icons md-light md-18" style="color:${speedColor(report.speed)}; transform:rotate(${report.head}deg)">navigation</md-icon>`
      };

      if (this.vehicles[report.encrypt_plate_id]) {
        this.vehicles[report.encrypt_plate_id] = {...report, marker: this.vehicles[report.encrypt_plate_id].marker };
        this.vehicles[report.encrypt_plate_id].marker.setLatLng([report.latitude, report.longitude]);
        this.vehicles[report.encrypt_plate_id].marker.setIcon(this.mapControl.divIcon(markerOpts));
        this.vehiclesMetrics.meter(report.encrypt_plate_id).mark();
      } else {
        this.vehicles[report.encrypt_plate_id] = {...report, marker: this.mapControl.addDivMarker(report.latitude, report.longitude, markerOpts, 'vehicles') };
        this.metrics.counter('vehicles').inc();
        this.vehiclesMetrics.meter(report.encrypt_plate_id, { rateUnit: 60000 }).mark();
      }
      this.metrics.meter('requestsPerSecond').mark();
      this.metrics.meter('requestsPerMinute', { rateUnit: 60000 }).mark();
    });
  }
}

export default ['measured', HomeController];
