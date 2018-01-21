(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('RegisterController', RegisterController);



    function RegisterController($rootScope, $scope, $auth, $state, toastr, RegisterService) {

      var opts = { timeOut: 0 };

      $rootScope.$on('auth:registration-email-error', function(ev, reason) {
        var errors = RegisterService.getStrErrors(reason);

        toastr.clear();
        toastr.error(errors, 'Registration failed', opts);
      });

      $rootScope.$on('auth:registration-email-success', function(/*ev, message*/) {
        toastr.clear();

        toastr.success('Registration success');
        //redirect after success logins
        $state.go('auth.login');

      });
    }



})();
