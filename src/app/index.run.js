(function() {
  'use strict';

  angular
    .module('todoListClient')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
