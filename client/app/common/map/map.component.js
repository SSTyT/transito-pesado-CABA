import template from './map.html';
import controller from './map.controller';

import './map.scss';
import 'leaflet/dist/leaflet.css';


let mapComponent = {
  restrict: 'E',
  bindings: {
    options: '<',
    mapControl: '=',
    onLoad: '&'
  },
  template,
  controller
};

export default mapComponent;
