(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('LoginCtrl', function($rootScope, $auth, $state) {







      var vm = this;


      $rootScope.$on('auth:login-success', function(ev, user) {
        $state.go('main');
        console.log('success 1' + user);
        console.log(user);
        console.log(ev);
      });

      $rootScope.$on('auth:login-error', function(ev, reason) {
          alert('auth failed because', reason.errors[0]);
      });

       $rootScope.$on('auth:validation-success, auth:login-success', function(ev) {
        $state.go('home');
      });
      $rootScope.$on('auth:validation-error', function(ev) {
        $state.go("login");
      });

  });

})();
