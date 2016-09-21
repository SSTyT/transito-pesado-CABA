import angular from 'angular';
import uiRouter from 'angular-ui-router';
import sideMenuComponent from './sideMenu.component';

let sideMenuModule = angular.module('sideMenu', [
  uiRouter
])

.component('sideMenu', sideMenuComponent)

.name;

export default sideMenuModule;
