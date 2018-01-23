(function() {
  'use strict';

  angular
    .module('todoListClient')
    .config(config);


  /** @ngInject */
  function config($logProvider, toastrConfig) {
    // Enable log
    //$logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventOpenDuplicates = false;
    toastrConfig.autoDismiss = false;
    toastrConfig.maxOpened = 1;

  }


})();
