(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('LoginController', function($rootScope, $auth, $state, toastr) {

      $rootScope.$on('auth:login-success', function(/*ev, user*/) {
        toastr.success('Welcome back', 'Hello!');
        $state.go('main');
      });

      $rootScope.$on('auth:login-error', function(ev, reason) {
        if(!reason)
          return toastr.error("Can't get connection");
        var error = reason.errors[0];
        toastr.error(error);
      });

      $rootScope.$on('auth:logout-success', function() {
        toastr.success('Goodbye!');
        $state.go('auth.login');
      });




  });

})();
