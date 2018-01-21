(function() {
  'use strict';

  angular
    .module('todoListClient')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, API_HOST) {
    $rootScope.API_HOST = API_HOST;
    $log.debug('runBlock end');
  }

})();
