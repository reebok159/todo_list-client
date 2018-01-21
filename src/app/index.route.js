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
        templateUrl: 'app/projects/projects.html',
        controller: 'ProjectsController',
        controllerAs: 'projects',
        resolve: {
          auth: function($auth, $state) {
            //if user isn't logged in, this catch exception
            //and we redirect to login
            $auth.validateUser().catch(function(){
              $state.go('auth.login');
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
