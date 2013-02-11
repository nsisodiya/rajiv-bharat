App.audioClipPlayer = {
	start: function(){
		this.moduleName = "player.js";
		this.container = $(this.$);
		this.container.append('\
			<div style="display:none" id="audio"></div>\
			<div style="float: left; height: 37px; width: 39px;"><img id="loading" src="./WebApp/images/loading3.gif"></img></div>\
			<div style="float: left;" id="loadedClipNumber"></div>\
			<div style="clear: both;">\
				<img id="playbutton" style="float: left; height: 32px; margin-right: 7px;" title="आवाज सुनने के लिये यहाँ क्लिक करे" src="./WebApp/images/video-play-button.png">\
				<div style="float: left;" class="progress-bar mixed">\
					<span id="audioProgressBar" style="width: 0%"></span>\
				</div>\
			</div>\
			<div style="clear: both;" id="buttons">\
				<input type="button" id="reloadNewClip" title="नया क्लिप लोड करने के लिये यहाँ क्लिक करे" value="नया क्लिप लोड करें"/>\
				<input type="button" style="display:none" id="pause" value="Pause"/>\
			</div>');
		this.createAudioEle();
		this.loadAudio();
		this.attachHandlers();
		this.subscribe();
		this.exposePublicAPI();

	},
	end: function(){
	
	},
	exposePublicAPI: function(){
		var self = this;
		this.sb.subscribe("getDataFromPlayer", function(data){
			switch(data.type){
				case "playerinfo":
					if(typeof data.callback === "function"){
						data.callback(self.jsonData);
					}
				break;
			}
		
		});
	
	
	},
	createAudioEle: function(){
		var self = this;
		
		self.container.find("#audio").html("").append('<audio preload="meta" controls><p>Your browser does not support the audio element. Use Firefox. </p></audio>');
		self.audio = self.container.find("#audio audio")[0];
		
		self.audio.addEventListener("canplay", function() {
			App.Util.Debug("canplay Fired");
			self.container.find("#loading").hide();
		},
		false);
		
		self.audio.addEventListener("loadedmetadata", function() {
			App.Util.Debug("MetaDataLoaded");
			self.setUp();
		},
		false);
	},
	subscribe: function(){
		var self = this;
		/*this.sb.subscribe("ReloadNewClip", function(data){
			self.reloadNewClip();
		});
		*/
	},
	attachHandlers: function(){
		var self = this;
		this.container.find("#playbutton").click(function(){
			if(!(self.playing === true)){
				if(self.audio.src != App.global.AudioLibPath + self.jsonData.FilePath){
					self.audio.src = App.global.AudioLibPath + self.jsonData.FilePath; // Stops audio download.
				}
				self.container.find("#loading").show();
				self.audio.play();
				self.playing = true;
				self.container.find("#reloadNewClip")[0].disabled = true;
				App.Util.Debug("Play");
			}
			
		});
		
		this.container.find("#reloadNewClip").click(function(){
			self.reloadNewClip();
			App.Util.Debug("reloadNewClip");
		});
		
		
		this.container.find("#pause").click(function(){
			self.audio.pause();
			App.Util.Debug("Paused");
		});
	
	},
	reloadNewClip: function(){
		this.setAudioBarPercentage(0);
		this.loadAudio();
	},
	setAudioBarPercentage: function(p){
		this.container.find("#audioProgressBar").css("width",p+"%");
	},
	loadAudio: function(){
		var self = this;
		self.container.find("#loading").show();
		self.container.find("#loadedClipNumber").html("Loadeding ....");
		var onSuccessCB = function(data){
			if($.isEmptyObject(data)){
				alert("No Data From Server");
			}else{
				self.jsonData = data;
				self.audio.src = App.global.AudioLibPath + self.jsonData.FilePath; // Stops audio download.
				self.container.find("#loading").hide();
				self.container.find("#loadedClipNumber").html("Loaded Audio ClipIndex -> " + self.jsonData.AudioFileIndex 
						+ ":" + self.jsonData.ClipIndex + " Duration - " + (self.jsonData.EndTime - self.jsonData.StartTime) +"seconds");		
			}
		};
		var onServerErrorCB = function(errorRes){
			alert(errorRes);
		};
		var onErrorCB = function(data, error, text){
			App.Util.DebugWithTrace("Error in -> Module='" + self.moduleName + "', Function='loadAudio'\n" + data.status + " "+ text);
		};
		App.Util.Ajax({
            type: "GET",
            url: "../DataAPI/getNewAudioClip/",
            success: onSuccessCB,
            serverError: onServerErrorCB,
            error: onErrorCB
        });
	},
	setUp: function(){
		var self = this;
		
		App.Util.Debug("Starting Setup - " + this.audio.currentTime + " - " + this.audio.HAVE_ENOUGH_DATA + " " + this.jsonData.StartTime);
		this.audio.currentTime =  this.jsonData.StartTime;
		this.jsonData.endPoint = this.jsonData.EndTime + App.global.ExtraPlayDuration;
		this.audio.addEventListener('timeupdate', function (){
			if (self.jsonData.endPoint && self.audio.currentTime >= self.jsonData.endPoint) {
				self.setAudioBarPercentage(0);
				self.audio.pause();
				self.playing = false;
				self.container.find("#reloadNewClip")[0].disabled = false;
				//self.audio.currentTime =  self.jsonData.StartTime;
				self.audio.src = ""; // Stops audio download.
				self.audio.load();
			}
			var p = (self.audio.currentTime - self.jsonData.StartTime)/(self.jsonData.endPoint - self.jsonData.StartTime)*100;
			if(p > 0){
				self.setAudioBarPercentage(p);
			}
		}, false);

	}

};
