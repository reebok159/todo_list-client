(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('TasksController', TasksCtrl);



    function TasksCtrl($log, $scope, $auth, $state, toastr, Task, $uibModal) {

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
      vm.changePos = changePos;
      vm.mydate = null;

      function createTask(project_id, obj){
        toastr.clear();

        var task = new Task({
          name: obj.name,
          project_id: project_id
        });

        task.create().then(function(res){
          toastr.success('Task was created!', 'Success');
          vm.tasks.push(res);
          cancelForm();
        },
        function(err){
          toastr.error("Task can't be created");
          $log.log(err);
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
        toastr.clear();
        vm.obj = obj;
        vm.mydate = null;

        if(obj.deadline !== null)
          vm.mydate = new Date(obj.deadline);


        var modalInstance = $uibModal.open({
          templateUrl: 'deadlineTaskModal.html',
          controller: 'ModalInstanceController',
          size: 'sm',
          scope: $scope
        });

        modalInstance.result.then(function (){
          if(typeof vm.mydate != 'undefined' && vm.mydate != null){
            obj.deadline = vm.mydate.toJSON();
          } else {
            obj.deadline = null;
          }

          editTask(obj);

          vm.mydate = null;
          //toastr.warning("Nothing was changed");

        });
      }


      function cancelEditingTask(){
        $scope.editedTask = null;
      }

      function complete(obj){
        editTask(obj, true);
      }

      function checkIsProjectCompleted(){
        for(var i = 0; i < vm.tasks.length; i++){
          if(vm.tasks[i].completed == true) continue;
          return;
        }
        toastr.clear();
        toastr.success("Well Done! You’re successfully completed all the task.");

      }

      function editTask(obj, change_status){
        new Task(obj).update().then(function(res){
          if(change_status) checkIsProjectCompleted();
          else toastr.success("Task was edited successfully");

          $log.log(res);
          cancelEditingTask();
        }, function(err){
          $log.log(err);
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
          controller: 'ModalInstanceController',
          scope: $scope
        });

        modalInstance.result.then(function (){
          deleteTask(task);
        });
      }

      function changePos(obj, direction){
        Task.change_priority(obj, direction).then(function(res){
          $log.log(res);
          getTasks(obj.projectId);
        });
      }

      function deleteTask(obj){
        toastr.clear();

        new Task(obj).delete().then(function(task){
          $log.log(task);
          toastr.success("Task was deleted");
          getTasks(task.projectId);
        }, function(err){
            $log.log(err);
            toastr.warning("Can't delete task");
        });
      }

      function getTasks(project_id)
      {
        Task.get({projectId: project_id}).then(function(tasks){
          vm.tasks = tasks;
        });
      }

    }



})();
