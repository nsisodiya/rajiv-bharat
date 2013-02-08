/*
 * This will load Status of Whole Project
 * */

App.Tabs = {
	start : function() {
		$(this.$).append('<div id="maintabber"></div>');
		this.sb.startModule("maintabber",
			App.Controls.Tabs,
			[{
				Id : "home",
				Title : "होम",
				loaded : null,
				ModuleFun : App.home
				
			}, {
				Id : "translate",
				Title : "अनुवाद करे",
				loaded : null,
				ModuleFun : App.Translate,
			}, {
				Id : "about",
				Title : "योजना",
				loaded : null,
				ModuleFun : App.about,
			}, {
				Id : "progress",
				Title : "कार्य प्रगति",
				loaded : null,
				ModuleFun : App.Progress,
			}]);
	}
	
};
