var App = {
	global : {
		AudioLibPath : "",
		ExtraPlayDuration : 1

	},
	start : function() {
		this.container = $(this.$);
		var str = '\
			<div class="mainContainer">\
				<div id="Menu" class="floatLeftWidth100P" style="height: 100px;"></div>\
				<div id="Tabs" class="floatLeftWidth100P"></div>\
			</div>\
			';
		this.container.append(str);
		this.sb.startModule("Menu", App.Menu);
		this.sb.startModule("Tabs", App.Tabs);
	},
	end : function() {

	}
};










