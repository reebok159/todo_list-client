(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('LoginController', function($rootScope, $auth, $state, toastr) {

      $rootScope.$on('auth:login-success', function(/*ev, user*/) {
        toastr.clear();
        toastr.success('Welcome back', 'Hello!');
        $state.go('main');
      });

      $rootScope.$on('auth:login-error', function(ev, reason) {
        toastr.clear();
        if(reason == undefined)
          return toastr.error("Can't get connection");
        var error = "Error";
        if(reason.errors != undefined)
          error = reason.errors[0];
        toastr.error(error);
      });

      $rootScope.$on('auth:logout-success', function() {
        toastr.clear();
        toastr.success('Goodbye!');
        $state.go('auth.login');
      });




  });

})();
