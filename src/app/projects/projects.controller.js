(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('ModalInstanceController', ModalInstanceController)
    .controller('ProjectsController', ProjectsController);



    function ProjectsController($log, $scope, $auth, $state, toastr, Project, $uibModal) {


      var vm = this;
      vm.cancelForm = cancelForm;

      vm.createProject = createProject;
      vm.confirmDeleteProject = confirmDeleteProject;
      vm.startEditingProject = startEditingProject;
      vm.cancelEditingProject = cancelEditingProject;
      vm.commitChangesProject = commitChangesProject;
      vm.new_project = {};


      getProjects();


      function createProject(obj){
        toastr.clear();
        var project = new Project({
          name: obj.name
        });

        project.create().then(function(proj){
          toastr.success('Project was created!');
          vm.projects.push(proj);
          cancelForm();
        },
        function(err){
          $log.log(err);
          toastr.success("Project can't be created");
        });

      }

      function cancelForm(){
        vm.new_project = {};
        vm.project_form.$setPristine();
        vm.project_form.$setUntouched();
      }

      function confirmDeleteProject(obj){
        $scope.obj = obj;
        var modalInstance = $uibModal.open({
          templateUrl: 'deleteProjectModal.html',
          controller: 'ModalInstanceController',
          scope: $scope
        });

        modalInstance.result.then(function (){
          deleteProject($scope.obj);
        });
      }



      function deleteProject(obj){
        toastr.clear();
        Project.get(obj.id).then(function (project) {
          project.delete().then(function(res){
            toastr.success("Project was deleted");
            getProjects();
            $log.log(res);
          },
          function(err){
            $log.log(err);
            toastr.error("Project can't be deleted");
          });
        });
      }

      function startEditingProject(obj){
        vm.editedProject = obj;
        vm.editedProject.new_name = obj.name;
        //$scope.copy = angular.copy(obj);

      }

      function commitChangesProject(obj){
        toastr.clear();
        //if all validations is ok
        if(obj.name == obj.new_name)
        {
          cancelEditingProject();
          toastr.warning("Nothing was changed");
          return;
        }

        obj.name = obj.new_name;
        delete obj.new_name;

        editProject(obj);
      }

      function cancelEditingProject(){
        vm.editedProject = null;
      }

      function editProject(obj){
        new Project(obj).update().then(function(res){
          toastr.success("Success");
          $log.log(res);
          cancelEditingProject();
        }, function(err){
          $log.log(err);
          //show error
        });
      }

      function getProjects()
      {
        Project.query().then(function(projects){
          vm.projects = projects;
        });
      }




    }


    function ModalInstanceController($uibModalInstance, $scope){
      $scope.ok = function () {
        $uibModalInstance.close();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
})();
