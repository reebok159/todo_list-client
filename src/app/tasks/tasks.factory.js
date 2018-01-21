(function() {
  'use strict';

  angular
    .module('todoListClient')
    //.service('ProjectsService', ProjectsService);
    .factory('Task', function(railsResourceFactory) {
      var relation = railsResourceFactory({
        url: "/api/v1/projects/{{projectId}}/tasks/{{id}}",
        name: 'task'
      });

      relation.change_priority = function (task, direction) {
        if(direction != "up") direction = "down";
        return relation.$get("/api/v1/projects/" + task.projectId + "/tasks/" + task.id + "/" + direction);
      };

      return relation;
    });
})();
