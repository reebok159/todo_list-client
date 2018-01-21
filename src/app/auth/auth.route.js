(function() {
  'use strict';

  angular
    .module('todoListClient')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      //group for pages with no auth access
      .state('auth', {
        url: '/auth',
        abstract: true,
        template: '<ui-view/>',
        resolve: {
          auth: function($auth, $state){
            //if user logged in, this returns success and do then
            //block login page to logged in users
            $auth.validateUser().then(function(){
              $state.go('main');
            });

          }
        }
      })
      .state('auth.login', {
        url: '/login',
        templateUrl: 'app/auth/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('auth.register', {
        url: '/register',
        templateUrl: 'app/auth/register.html',
        controller: 'RegisterController',
        controllerAs: 'login'
      });
  }

})();
