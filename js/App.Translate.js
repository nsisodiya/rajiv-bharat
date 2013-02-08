App.Translate = {
	start : function(){
		$(this.$).append('<div class="hindi"><div id="player"></div><div id="textarea"></div></div>');
		this.sb.startModule("player",App.audioClipPlayer);
		this.sb.startModule("textarea",App.textarea);
	},
	
	end: function(){
	
	}
};