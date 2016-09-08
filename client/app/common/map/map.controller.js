import L from 'leaflet';

class MapController {
  constructor($timeout) {
    this.timeout = $timeout;
  }

  $postLink() {
    this.timeout(() => {
      L.map(this.mapId).setView([51.505, -0.09], 13);
    })
  }
}

export default ['$timeout', MapController];
