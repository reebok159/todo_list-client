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
    toastrConfig.preventOpenDuplicates = true;
    toastrConfig.autoDismiss = true;
    toastrConfig.maxOpened = 1;
    toastrConfig.newestOnTop = true;

  }


})();
