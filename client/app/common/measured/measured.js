import angular from 'angular';
import measuredFactory from './measured.factory';

let measuredService = angular.module('measured', [])
.factory('measured', measuredFactory).name;

export default measuredService;
