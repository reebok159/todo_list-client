(function() {
  'use strict';

  angular
    .module('todoListClient')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, ENV_VARS) {
    $rootScope.API_HOST = ENV_VARS.API_HOST;
    $log.debug('runBlock end');
  }

})();
