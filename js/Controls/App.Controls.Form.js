App.Controls.Form = {
	start: function(){
		try{
			this.container = $(this.$);
			
			var str = "";
			$.each(this.config.inputFields, function(i, inputField){
				var name = "", style="";
				
				if(!(inputField.label === undefined)){
					if(inputField.compulsory === true){
						name = '<span>'+ inputField.label +'*</span>';	
					}else{
						name = '<span>'+ inputField.label +'</span>';
					}
					
				}
				if(inputField.input.type === "submit"){
					style = 'style="float: right;"';
				}
				var inputAttr = '';
				$.each(inputField.input, function(i, v){
					inputAttr = inputAttr + i + '="' + v + '" ';
				});
				str  =  str + '<div '+ style +'>'+ name +'<input ' + inputAttr + '></input></div>';
			});
			
			if(this.config.formPostSubmit === true){
				str = '<form>' + str + '</form>';
			}
			this.container.append('<div>' + str + '</div>');
			this.attachEventHandlers();
		}catch(ex){
			App.Util.Debug(ex);
		}
	},
	end : function(){
		
	},
	
	attachEventHandlers: function(){
		var self = this;
		this.container.find("#submit").click(function(){
			var params = {};
			$.each(self.config.inputFields, function(i, inputField){
				if(inputField.input.type == "text" || inputField.input.type == "password"){
					params[inputField.input.id] = self.container.find("#" + inputField.input.id).val();	
				}
			});
		
			App.Util.Ajax({
	            type: self.config.Ajax.type,
	            url: self.config.Ajax.url,
	            success: self.config.Ajax.success,
	            serverError: self.config.Ajax.serverError,
	            error: self.config.Ajax.error,
	            params: JSON.stringify(params)
	        });
			return false;
		});
		
	}

};