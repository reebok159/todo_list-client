(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $auth, $location, $state) {
    var vm = this;


    console.log($auth);
    console.log('log1:'+$auth.user.signedIn);
    console.log('log1:'+!Boolean($auth.user.signedIn));

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1514022174006;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
