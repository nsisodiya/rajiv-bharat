App.textarea = {

	start : function(){
		try{
		$(this.$).append('\
		<div>\
			<p>Type in Hindi (Press Ctrl+g to toggle between Google Keyboard and System Keyboard)<br></p>\
			<div>\
				<div>\
					<input type="radio" name="group1" value="Text" checked>\
					<span>आवाज आ रहीं है</span>\
				</div>\
				<div>\
					<input type="radio" name="group1" value="Blank">\
					<span>ये ओडियों आवाजरहित है, आवाज नही आ रहीं है</span>\
				</div>\
				<textarea style="width:300px" id="transliterateTextarea"></textarea></div>\
			<div>\
			<div id="buttonArea">\
				<input type="button" id="Save" title="पूरा लिखने के बाद यहाँ क्लिक करे" value="Save"/>\
			</div>\
		</div>');
		
		this.attachEventHandlers();
		this.loadGoogleKeyboard();
		}catch(ex){
			alert(ex);
		}
	
	},
	end : function(){
	
	},
	validate: function(txt){
		var a = {status:true};
		
		if(txt === ""){
			a.error = "ऐसा लगता है आपके कुछ भी टाइप नहीं किया है। पुनः प्रयास करे ।";
			a.status = false;
		}
		if((txt.quote().length - 2 - txt.length) === 0){
			a.error = "ऐसा लगता है आपके हिन्दी में टाइप नहीं किया है। पुनः प्रयास करे ।";
			a.status = false;
		}
		return a;
	},
	loadGoogleKeyboard : function() {
		// http://code.google.com/apis/ajax/playground/#transliterate_hindi
		var self = this;
		try{
		/*google.load("elements", "1", {
			packages : "transliteration"
		});
		
		google.setOnLoadCallback(function() {
			
		});
		*/
			self.transliterationControl = new google.elements.transliteration.TransliterationControl({
				sourceLanguage : google.elements.transliteration.LanguageCode.ENGLISH,
				destinationLanguage : [ google.elements.transliteration.LanguageCode.HINDI ],
				shortcutKey : 'ctrl+g',
				transliterationEnabled : true
			});
			self.transliterationControl.makeTransliteratable([ 'transliterateTextarea' ]);
			
		}catch(ex){
			App.Util.Debug(ex);
		}

	},
	attachEventHandlers: function(){
		var self = this;
		$(this.$).find("#Save").click(function(){
			App.Util.Debug("Save Clicked");
			var answer = confirm ("पक्का  ? \nक्या आपने पूरा ओडीयो सुनकर पूरा टाइप किया है? कुछ छूटा तो नहीं ? \nअगर कुछ छूट गया है तो Cancel दबा कर पूरा लिखे । नही तो Ok दबा दिजिये");
			if (answer){
				var blankStatus = self.getBlankStatus();
				var val = {status:true};
				if(blankStatus === 0){
					val = self.validate($(self.$).find("#transliterateTextarea").val());	
				};
				if(val.status === true){
					self.sb.publish("getDataFromPlayer",{ type: "playerinfo", 
						callback: function(info){
							if(info === undefined){
								alert("Sorry, Server Error");
							}else{
								App.Util.Debug(info);
								var onSuccessCB = function(data){
									if(data.result === "success"){
										alert("धन्यवाद, सर्वर पर सेव हो गया है । अब आप नया आडियों क्लिप लोड करें");
										//clear input
										$(self.$).find("#transliterateTextarea").val("");
									}
									App.Util.Debug(data + "Received");
								};
								var onServerErrorCB = function(errorRes){
									alert(errorRes);
								};
								var onErrorCB = function(data, error, text){
									App.Util.DebugWithTrace("Error in -> Module='" + self.moduleName + "', Function='loadAudio'\n" + data.status + " "+ text);
								};
								App.Util.Ajax({
						            type: "POST",
						            url: "../DataAPI/saveData/",
						            success: onSuccessCB,
						            serverError: onServerErrorCB,
						            error: onErrorCB,
						            params: JSON.stringify({data: info, text:$(self.$).find("#transliterateTextarea").val(), blank:blankStatus})
						        });
							}
					}});	
				}else{
					alert("Validation Error: " + val.error);
				}
			}else{
				return;
			};
		});

	
		$(this.$).find("input[name='group1']").click(function(){
			App.Util.Debug("input Clicked");
			if(this.value === "Text"){
				$(self.$).find("#transliterateTextarea").show();
			}
			if(this.value === "Blank"){
				// Hide Text Area
				$(self.$).find("#transliterateTextarea").hide();
			}
		});
		
		

	},
	getBlankStatus : function() {
		return {
			"Text" : 0,
			"Blank" : 1
		}[$(this.$).find("input[name='group1']:checked").val()];
	}

};
