(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('TasksController', TasksCtrl);



    function TasksCtrl($rootScope, $scope, $auth, $state, toastr, Task, $uibModal) {

      var vm = this;
      vm.getTasks = getTasks;
      vm.createTask = createTask;
      vm.startEditingTask = startEditingTask;
      vm.confirmDeleteTask = confirmDeleteTask;
      vm.cancelForm = cancelForm;
      vm.cancelEditingTask = cancelEditingTask;
      vm.commitChangeName = commitChangeName;
      vm.complete = complete;
      vm.openEditDeadline = openEditDeadline;
      vm.mydate = null;
      vm.changePos = changePos;

      function createTask(project_id, obj){
        var task = new Task({
          name: obj.name,
          project_id: project_id
        });

        task.create().then(function(res){
          toastr.success('task was created!');
          vm.tasks.push(res);
          cancelForm();
        },
        function(err){
          toastr.success("task can't be created");
          console.log(err);
        });

      }

      function startEditingTask(obj){
        $scope.editedTask = obj;
        $scope.editedTask.new_name = obj.name;
      }

      function commitChangeName(obj){
        toastr.clear();
        //if all validations is ok
        if(obj.name == obj.new_name)
        {
          cancelEditingTask();
          toastr.success("Nothing was changed");
          return;
        }

        obj.name = obj.new_name;
        delete obj.new_name;

        editTask(obj);
      }

      function openEditDeadline(obj){
        vm.obj = obj;
        vm.mydate = new Date();

        if(obj.deadline !== null)
          vm.mydate = new Date(obj.deadline);


        var modalInstance = $uibModal.open({
          templateUrl: 'deadlineTaskModal.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
          scope: $scope
        });

        modalInstance.result.then(function (){
          if(typeof vm.mydate != 'undefined' && vm.mydate != null){
            obj.deadline = vm.mydate.toJSON();
            editTask(obj);
            return;
          }
          vm.mydate = null;
          toastr.success("Nothing was changed");

        });
      }


      function cancelEditingTask(){
        $scope.editedTask = null;
      }

      function complete(obj){
        editTask(obj);
      }

      function editTask(obj){
        new Task(obj).update().then(function(res){
          toastr.success("Success");
          console.log(res);
          cancelEditingTask();
        }, function(err){
          console.log(err);
        });
      }

      function cancelForm(){
        vm.new_task = {};
        vm.tasks_form.$setPristine();
        vm.tasks_form.$setUntouched();
      }

      function confirmDeleteTask(task){
        $scope.obj = task;
        var modalInstance = $uibModal.open({
          templateUrl: 'deleteTaskModal.html',
          controller: 'ModalInstanceCtrl',
          scope: $scope
        });

        modalInstance.result.then(function (){
          deleteTask(task);
        });
      }

      function changePos(obj, direction){
        Task.change_priority(obj, direction).then(function(res){
          getTasks(obj.projectId);
        });
      }

      function deleteTask(obj){
        toastr.clear();

        new Task(obj).delete().then(function(task){
          console.log(task);
          toastr.success("Task was deleted");
          getTasks(task.projectId);
        }, function(err){
            console.log(err);
            toastr.success("can't delete task");
        });
      }

      function getTasks(project_id)
      {
        Task.get({projectId: parseInt(project_id)}).then(function(tasks){
          vm.tasks = tasks;
        });
      }

    }



})();
