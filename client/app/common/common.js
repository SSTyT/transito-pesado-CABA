import angular from 'angular';
import Map from './map/map';

let commonModule = angular.module('app.common', [
  Map
]).name;

export default commonModule;
