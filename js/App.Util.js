App.Util = {
		Ajax: function(data){
			$.ajax({
				type: data.type,
				url: data.url,
				data: data.params,
				dataType: "json",
				// complete: onRequestCompleted,
				success: function(dataFromServer){
					if(dataFromServer.error != ""){
						data.serverError(dataFromServer.error);
					}else{
						data.success(dataFromServer.response);
					}
				},
				error: data.error,
				contentType: "application/json"
					// timeout:40000
			});
		},
		Debug: function(msg){
			if (typeof console == "object" && typeof console.log == "function") {
				if(typeof msg === "object"){
					console.dir(msg);
				}else{
					console.log(msg);	
				}
			}
		},
		DebugWithTrace: function(msg){
			if (typeof console == "object" && typeof console.log == "function") {
				console.log(msg);
				console.trace();
			}
		},
		showProcessingScreen: function(){
			if($("#showProcessingScreen").length === 0){
				$('<div id="showProcessingScreen" class="showProcessingScreen"></div>').appendTo('body');
			}
			$("#showProcessingScreen").height($(window).height()).show();
		},
		hideProcessingScreen: function(){
			$("#showProcessingScreen").hide();
		}
};
