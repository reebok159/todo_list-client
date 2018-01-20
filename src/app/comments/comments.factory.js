(function() {
  'use strict';

  angular
    .module('todoListClient')
    .factory('Comment', ['railsResourceFactory', "railsSerializer", "Upload", '$timeout', function(railsResourceFactory, railsSerializer, Upload, $timeout) {
      var relation = railsResourceFactory({
        url: '/api/v1/projects/{{projectId}}/tasks/{{taskId}}/comments/{{id}}',
        name: 'comment'
      });

      relation.with_image = function(obj){
      	return new Promise(function(resolve, reject)
				{
	      	obj.image.upload = Upload.upload({
	      		url: '/api/v1/projects/'+obj.projectId+'/tasks/'+obj.taskId+'/comments',
	          data: { comment: {text: obj.text, image: obj.image}},
	        });

	        obj.image.upload.then(function (response) {
	          $timeout(function () {
	            ////how to convert the object keys names to camelCase
	            return resolve(response.data);
	          });
	        }, function (response) {
	          return reject({status: response.status, data: response.data});
	        });
	      });
      }

      return relation;
    }]);
})();
