import L from 'leaflet';

class MapController {
  constructor($timeout) {
    this.timeout = $timeout;
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
    });
  }
}

export default ['$timeout', MapController];
