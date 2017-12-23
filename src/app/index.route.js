(function() {
  'use strict';

  angular
    .module('todoListClient')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
          auth: function($auth, $state) {
            //if user isn't logged in, this catch exception
            //and we redirect to login
            $auth.validateUser().catch(function(res){
              $state.go('auth.login');
            });
          }
        }
      })
      //group for pages with no auth access
      /*.state('auth', {
        url: '/auth',
        abstract: true,
        template: '<ui-view/>',
        resolve: {
          auth: function($auth, $state){
            //if user logged in, this returns success and do then
            //block login page to logged in users
            $auth.validateUser().then(function(res){
              $state.go('main');
            });

          }
        }
      })*/
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
