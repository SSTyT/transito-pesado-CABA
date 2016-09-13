import L from 'leaflet';

L.Icon.Default.imagePath = 'leaflet/dist/images';

class MapController {
  constructor($timeout) {
    this.timeout = $timeout;

    this.mapControl.addMarker = this.addMarker.bind(this);
    this.mapControl.addPolyline = this.addPolyline.bind(this);
  }

  $postLink() {
    this.timeout(() => {
      const opts = this.options;

      const center = [opts.lat, opts.long];

      this.map = L.map(opts.mapId).setView(center, opts.zoom);

      L.tileLayer(opts.url, {
        attribution: opts.attribution,
        minZoom: opts.minZoom,
        maxZoom: opts.maxZoom
      }).addTo(this.map);

      console.log(this);
      this.onLoad();
    });
  }

  addMarker(lat, lng) {
    console.log(this);
    L.circleMarker([lat, lng], {}).setRadius(5).addTo(this.map);
  }

  addPolyline() {

  }
}

export default ['$timeout', MapController];
