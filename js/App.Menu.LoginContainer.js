App.Menu.LoginContainer = {
	start : function(){
		this.container = $(this.$);
		var str = '\
			<img id="closeButton" class="floatRight" src="./WebApp/images/close-button.png"></img>\
			<div id="loginTabberContainer" class="loginTabberContainer floatRight"></div>';
		this.container.append(str);
		this.tabs = [{
			Id : "loginbox",
			Title : "लोगिन करें",
			loaded : null,
			ModuleFun : App.Controls.Form,
			Config: {
				inputFields: [
								{"label": "ईमेल",
								"compulsory":true,
								"input":{"id":"email","type": "text","title": "आपका	ईमेल टाइप करे","value": "","autocomplete":"on"}
								},
								{"label": "पासवर्ड",
								"input":{"id":"password","type": "password","title": "आपका	पासवर्ड टाइप करे","value": "","autocomplete":"on"}
								},
								{"type": "submit",
								"input":{"id":	"submit","type": "submit","title": "लोगिन करें","value": "Login"}
								}
								],
							formPostSubmit:true,
							Ajax:{
								type: "POST",
								url: "../DataAPI/login/",
								success: function(data){
									App.Util.Debug(data + "Received");
									if(data.login === "success"){
										//Login SuccessFul
										//@TODO - Send Signal + Hide popup
										alert("Login SuccessFul");
										self.sb.publish("LoginSuccessful");
										self.container.hide();
										App.Util.hideProcessingScreen();
									}
								},
								serverError: function(errorRes){
									alert(errorRes);
								},
								error: function(data, error, text){
									App.Util.DebugWithTrace("Data -" + data + "Error -" + error + "Text -" + text);
								}
							}
						}
			
		}, {
			Id : "createloginbox",
			Title : "नया लोगिन बनायें",
			loaded : null,
			ModuleFun : App.Controls.Form,
			Config: {
				inputFields: [
					  			{"label": "आपका नाम",
					  			"input":{"type":"text","id":"name","title":"आपका नाम टाइप करे","value": ""}},
					  			{"label": "मोबाईल",
					  			"input":{"id":"mobile","type": "text","title": "आपका  मोबाइल टाइप करे","value": ""}},
					  			{"label": "ईमेल",
					  			"compulsory":true,
						  		"input":{"id":"email","type": "text","title": "आपका  ईमेल टाइप करे","value": ""}},
						  		{"label": "पासवर्ड",
					  			"input":{"id":"password","type": "password","title": "आपका  पासवर्ड टाइप करे","value": ""}},
					  			{"type": "submit",
					  			"input":{"id":	"submit","type": "submit","title": "सबमिट करें","value": "Submit"}}],
					  		formPostSubmit:true,
					  		Ajax:{
					  			type: "POST",
					  			url: "../DataAPI/register/",
					  			success: function(data){
					  				App.Util.Debug(data + "Received");
					  				if(data.register === "success"){
					  					alert("Register SuccessFul");
					  					self.sb.publish("LoginSuccessful");
					  					self.container.hide();
					  					App.Util.hideProcessingScreen();
					  				}
					  			},
					  			serverError: function(errorRes){
					  				alert(errorRes);
					  			},
					  			error: function(data, error, text){
					  				App.Util.DebugWithTrace("Data -" + data + "Error -" + error + "Text -" + text);
					  			}
					  		}
						}
		}, {
			Id : "forgetPassword",
			Title : "पासवर्ड रीसेट करे" ,
			loaded : null,
			ModuleFun : App.Controls.Form,
			Config: {
				inputFields: [
								{"label": "ईमेल",
								"compulsory":true,
								"input":{"id":"email","type": "text","title": "आपका	ईमेल टाइप करे","value": "","autocomplete":"on"}
								},
								{"type": "submit",
								"input":{"id":	"submit","type": "submit","title": "सबमिट करें","value": "Submit"}
								}
								],
							formPostSubmit:true,
							Ajax:{
								type: "POST",
								url: "../DataAPI/forgetPassword/",
								success: function(data){
									App.Util.Debug(data + "Received");
									if(data.forgetPassword === "success"){
										//Login SuccessFul
										//@TODO - Send Signal + Hide popup
										alert("We have set you email for Resetting your password");
										self.container.hide();
										App.Util.hideProcessingScreen();
									}
								},
								serverError: function(errorRes){
									alert(errorRes);
								},
								error: function(data, error, text){
									App.Util.DebugWithTrace("Data -" + data + "Error -" + error + "Text -" + text);
								}
							}
						}
		}];

		
		this.sb.startModule("loginTabberContainer", App.Controls.Tabs,this.tabs);
		var self = this;
		this.container.find("#closeButton").click(function(){
			self.container.hide();
			App.Util.hideProcessingScreen();
		});
	},
	end : function(){
		
	}
};