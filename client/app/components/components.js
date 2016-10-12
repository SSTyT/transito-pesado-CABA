import angular from 'angular';
import Home from './home/home';
import Trucks from './trucks/trucks';
import SideMenu from './sideMenu/sideMenu';

let componentModule = angular.module('app.components', [
  Home,
  SideMenu,
  Trucks
]).name;

export default componentModule;
