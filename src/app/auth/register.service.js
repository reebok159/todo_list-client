(function() {
  'use strict';

  angular
  	.module('todoListClient')
  	.service('RegisterService', RegisterService);



  	function RegisterService()
  	{
  		var vm = this;
  		vm.getStrErrors = getStrErrors;


  		function getStrErrors(reason){
  			var error = "";
  			reason.errors.full_messages.forEach(function(item, i, arr){
        	error += item + "\n";
      	});

      	return error;
  		}
  	}


})();
