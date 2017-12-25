(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('RegisterCtrl', RegisterCtrl);



    function RegisterCtrl($rootScope, $scope, $auth, $state, toastr, RegisterService) {
      toastr.clear();
      var opts = { timeOut: 10000 };

      $rootScope.$on('auth:registration-email-error', function(ev, reason) {
        var errors = RegisterService.getStrErrors(reason);

        console.log(reason);
        toastr.error(errors, 'Registration failed', opts);
      });

      $rootScope.$on('auth:registration-email-success', function(ev, message) {
        console.log(message);

        toastr.success('Registration success');
        //redirect after success logins
        $state.go('auth.login');

      });
    }



})();
