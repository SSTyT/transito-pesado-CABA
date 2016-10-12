import angular from 'angular';
import uiRouter from 'angular-ui-router';
import trucksComponent from './trucks.component';

let trucksModule = angular.module('trucks', [
  uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $stateProvider
    .state('trucks', {
      url: '/trucks',
      component: 'trucks'
    });
})

.component('trucks', trucksComponent)

.name;

export default trucksModule;
