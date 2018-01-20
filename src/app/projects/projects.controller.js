(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl)
    .controller('ProjectsCtrl', ProjectsCtrl);



    function ProjectsCtrl($rootScope, $scope, $auth, $state, toastr, Project, $uibModal) {


      var vm = this;
      vm.cancelForm = cancelForm;

      $scope.createProject = createProject;
      $scope.confirmDeleteProject = confirmDeleteProject;
      $scope.startEditingProject = startEditingProject;
      $scope.cancelEditingProject = cancelEditingProject;
      $scope.commitChangesProject = commitChangesProject;
      $scope.new_project = {};


      getProjects();


      function createProject(obj){
        toastr.clear();
        var project = new Project({
          name: obj.name
        });

        project.create().then(function(res){
          toastr.success('Project was created!');
          $scope.projects.push(project);
          //reset form

        },
        function(err){
          toastr.success("Project can't be created");
          console.log(err);
        });

      }

      function cancelForm(){
        $scope.new_project = {};
        $scope.project_form.$setPristine();
        $scope.project_form.$setUntouched();
      }

      function confirmDeleteProject(obj){
        $scope.obj = obj;
        var modalInstance = $uibModal.open({
          templateUrl: 'deleteProjectModal.html',
          controller: 'ModalInstanceCtrl',
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
          },
          function(err){
            console.log(err);
            toastr.error("Project can't be deleted");
          });
        });
      }

      function startEditingProject(obj){
        $scope.editedProject = obj;
        $scope.editedProject.new_name = obj.name;
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
        $scope.editedProject = null;
      }

      function editProject(obj){
        new Project(obj).update().then(function(res){
          toastr.success("Success");
          cancelEditingProject();
        }, function(err){
          console.log(err);
        });
      }

      function getProjects()
      {
        Project.query().then(function(projects){
          $scope.projects = projects;
        });
      }




    }


    function ModalInstanceCtrl($uibModalInstance, $scope){
      $scope.ok = function () {
        $uibModalInstance.close();
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    }
})();
