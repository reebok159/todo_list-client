(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('TasksController', TasksCtrl);



    function TasksCtrl($rootScope, $scope, $auth, $state, toastr, Task) {

      var vm = this;
      vm.getTasks = getTasks;


      function getTasks(project_id)
      {
        Task.get({projectId: parseInt(project_id)}).then(function(tasks){
          vm.tasks = tasks;

        });
      }

    }



})();
