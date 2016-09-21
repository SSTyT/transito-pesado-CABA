import angular from 'angular';
import Home from './home/home';
import SideMenu from './sideMenu/sideMenu';

let componentModule = angular.module('app.components', [
  Home,
  SideMenu
]).name;

export default componentModule;
