(function() {
  'use strict';

  angular
    .module('todoListClient')
    //.service('ProjectsService', ProjectsService);
    .factory('Task', ['railsResourceFactory', function(railsResourceFactory) {
      return railsResourceFactory({
        url: "/api/v1/projects/{{projectId}}/tasks/{{id}}",
        name: 'task'
      });
    }]);
})();
