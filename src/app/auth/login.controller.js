(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('LoginCtrl', function($rootScope, $auth, $state, toastr) {
      var vm = this;

      $rootScope.$on('auth:login-success', function(ev, user) {
        toastr.success('Welcome back', 'Hello!');
        //redirect after success logins
        $state.go('main');
      });

      $rootScope.$on('auth:login-error', function(ev, reason) {
        var error = reason.errors[0];
        toastr.error(error);
      });

  });

})();
