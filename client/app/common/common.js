import angular from 'angular';
import Map from './map/map';
import Measured from './measured/measured';

let commonModule = angular.module('app.common', [
  Map,
  Measured
]).name;

export default commonModule;
