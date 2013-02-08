/*
 * This will load Status of Whole Project
 * */

App.Progress = {
	start : function(){
		this.container = $(this.$);
		this.initHTML();
		this.getStats();
		this.getTopContributor();
	},
	end : function(){
	
	},
	initHTML: function(){
		this.container.append('<div><h2>प्रति फाइल कार्य प्रगती</h2><div id="progessPerFile"></div></div>\
				<div style="clear: both;"><h2>शीर्ष २० कार्यकर्ता</h2><div id="top20Users"></div></div>');

	},
	loadStats: function(data){
		var self = this;
		this.AllAudioFilesNewOrder = {};
		
		$.each(data.AllAudioFiles, function(i,v){
			self.AllAudioFilesNewOrder[v.AudioFileIndex] = {};
			self.AllAudioFilesNewOrder[v.AudioFileIndex]["FileName"] = v.FileName;
			self.AllAudioFilesNewOrder[v.AudioFileIndex]["FilePath"] = v.FilePath;
			self.AllAudioFilesNewOrder[v.AudioFileIndex]["Data"] = data.ProgessPerAudioFile[v.AudioFileIndex];
		});
		
		var str = "";
		
		$.each(self.AllAudioFilesNewOrder, function(i,File){
			var v = File.Data;
			var sum = v[0] + v[1] + v[2] + v[3] + v[4] + v[5];
			if(!(sum === 0)){
				var notStarted = parseInt(((v[0] + v[1])/sum*100).toFixed());
				var done = parseInt(((v[2] + v[3] + v[4])/sum*100).toFixed());
				var approved = 100 -  notStarted - done;
				str = str + '<div style="clear: both;"><span style="float: left; padding-right: 16px;">'+File.FileName+'</span><div style="float: left;" class="progress-bar mixed">\
				<span title="'+approved+'% कार्य पूरा कोर कमेटी द्वारा स्वीकार्य हो चुका है" style="width: '+approved*0.96+'%"></span>\
				<span title="'+done+'% कार्य अनुवाद हो चुका है" style="width: '+done*0.96+'%"></span>\
				<span title="'+notStarted+'% बचा हुआ है" style="width: '+notStarted*0.96+'%"></span>\
				</div></div>';
			}
		});
		this.container.find("#progessPerFile").append(str);
	},
	loadScore: function(data){
		if(data.Users){
			var str = "";
			for(var i=0; i< data.Users.length; i++){
				str = str + '<tr><td>'+ (i+1) +'</td><td>'+ data.Users[i].name +'</td><td>'+ data.Users[i].score +'</td></tr>';
			}
			var finalstr = '<div style="clear: both;"><table><thead><tr><th></th><th>name</th><th>score</th></tr></thead><tbody>'+ str +'</tbody></table></div>';
			this.container.find("#top20Users").append(finalstr);
		}
	},
	getStats: function(){
		var self = this;
		var onSuccessCB = function(data){
			//App.Util.Debug(data);
			self.loadStats(data);
		};
		var onServerErrorCB = function(errorRes){
			alert(errorRes);
		};
		var onErrorCB = function(data, error, text){
			App.Util.DebugWithTrace("Error in -> Module='" + self.moduleName + "', Function='loadAudio'\n" + data.status + " "+ text);
		};
		App.Util.Ajax({
            type: "GET",
            url: "../DataAPI/getStats/",
            success: onSuccessCB,
            serverError: onServerErrorCB,
            error: onErrorCB
        });
	},
	getTopContributor: function(){
		var self = this;
		var onSuccessCB = function(data){
			//App.Util.Debug(data);
			self.loadScore(data);
		};
		var onServerErrorCB = function(errorRes){
			alert(errorRes);
		};
		var onErrorCB = function(data, error, text){
			App.Util.DebugWithTrace("Error in -> Module='" + self.moduleName + "', Function='loadAudio'\n" + data.status + " "+ text);
		};
		App.Util.Ajax({
            type: "GET",
            url: "../DataAPI/getScores/",
            success: onSuccessCB,
            serverError: onServerErrorCB,
            error: onErrorCB
        });
		
	}
};
