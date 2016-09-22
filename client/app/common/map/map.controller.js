import L from 'leaflet';
import 'leaflet.markercluster';


console.log(L.markerClusterGroup());

L.Icon.Default.imagePath = 'leaflet/dist/images';

class MapController {
  constructor($timeout) {
    this.timeout = $timeout;
    this.clusters = {};

    this.mapControl.addCircleMarker = this.addCircleMarker.bind(this);
    this.mapControl.addDivMarker = this.addDivMarker.bind(this);
    this.mapControl.addPolyline = this.addPolyline.bind(this);
    this.mapControl.divIcon = this.divIcon.bind(this);
    this.mapControl.addCluster = this.addCluster.bind(this);
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

  addCircleMarker(lat, lng, radius = 4, cluster) {
    return L.circleMarker([lat, lng], {}).setRadius(radius).addTo(this._defineLayer(cluster));
  }

  addDivMarker(lat, lng, options, cluster) {
    var myIcon = this.divIcon(options);
    return L.marker([lat, lng], { icon: myIcon }).addTo(this._defineLayer(cluster));
  }

  divIcon(options) {
    return L.divIcon(options);;
  }

  addCluster(name, opts = {}) {
    if (!this.clusters[name]) {
      this.clusters[name] = L.markerClusterGroup(opts).addTo(this.map);
    }
    return this.clusters[name];
  }

  addPolyline() {
    //TODO
  }

  _defineLayer(clusterName) {
    if (clusterName && this.clusters[clusterName]) {
      return this.clusters[clusterName];
    } else {
      return this.map;
    }

  }
}

export default ['$timeout', MapController];
