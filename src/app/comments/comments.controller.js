(function() {
  'use strict';

  angular
    .module('todoListClient')
    .controller('CommentsController', CommentsCtrl);



    function CommentsCtrl($log, $scope, $auth, $state, toastr, Comment, $uibModal, Upload, $timeout, $window) {

      var vm = this;
      vm.openModal = openModal;
      vm.createComment = createComment;
      vm.getComments = getComments;
      vm.deleteComment = deleteComment;
      vm.commentsCount = 0;
      vm.task = null;
      vm.new_comment = {};
      vm.href = null;

      vm.init = function(task){
        vm.task = task;
        getComments(task);
      }
      vm.openPreview = function(file){
        Upload.dataUrl(file, true).then(function(res){
          var newTab = $window.open('','_blank');
          newTab.document.body.innerHTML = '<img src="' + res + '">';
        });
      }

      vm.deleteAttachment = function(){
        vm.new_comment.image = null;
      }

      vm.format_date = function(dte){
        var formatted = new Date(dte);
        return formatted.getDate() + "/" + (formatted.getMonth() + 1) + "/" + formatted.getFullYear();
      }

      function openModal(obj){
        $scope.obj = obj;

        var modalInstance = $uibModal.open({
          templateUrl: 'commentsModal.html',
          controller: 'ModalInstanceController',
          scope: $scope
        });

        modalInstance.result.then(function (){
          //deleteProject($scope.obj);
        }, function(){
          cancelForm();
        });
      }

      function createComment(obj){
        toastr.clear();

        var data = {
          text: obj.text,
          taskId: vm.task.id,
          projectId: vm.task.projectId,
          image: obj.image
        };

        //create comment with image
        if(Upload.isFile(data.image)){
          $log.log('with image');
          Comment.with_image(data).then(function(res){
            toastr.success("Comment was created successfully!");
            getComments(vm.task);
            cancelForm();
            $log.log(res);
          }, function(err){
            showErr(err);
          });
        } else {
          $log.log('without image');

          var comment = new Comment(data);
          $log.log(comment);

          comment.create().then(function(res){
            toastr.success("Comment was created successfully!");
            vm.comments.unshift(res);
            vm.commentsCount++;
            cancelForm();
          },
          function(err){
            showErr(err);
          });
        }

        function showErr(err){
          var error = "";
          if(err.data.text != undefined)
            error = 'Comment ' + err.data.text[0];

          toastr.error("Comment can't be created. " + error, "Error");
          $log.log(err);
        }
      }

      function cancelForm(){
        vm.new_comment = {};
        vm.errorFile = null;
        vm.comment_form.$setPristine();
        vm.comment_form.$setUntouched();
      }


      function deleteComment(comment, obj){
        toastr.clear();
        $log.log(comment);
        comment.projectId = obj.projectId;

        new Comment(comment).delete().then(function(comment){
          $log.log(comment);
          toastr.success("Task was deleted");
          getComments(obj);
        }, function(err){
            $log.log(err);
            toastr.warning("Can't delete comment", "Error");
        });
      }

      function getComments(task)
      {
        Comment.get({projectId: task.projectId, taskId: task.id}).then(function(comments){
          vm.comments = comments;
          vm.commentsCount = comments.length;
        });
      }



    }

})();
