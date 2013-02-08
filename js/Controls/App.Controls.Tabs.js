
App.Controls.Tabs = {
	start: function(){
		this.container = $(this.$);
		this.tabs = this.config;
		
		try{
			this.generateTabs();
		}catch(ex){
			App.Util.Debug(ex);
		}
	},
	generateTabs : function() {
		var self = this;
		var str = "<ul>";
		for ( var i = 0; i < this.tabs.length; i++) {
			str = str + "<li><a href='#" + this.tabs[i].Id + "'>"
					+ this.tabs[i].Title + "</a></li>";
		}

		str = str + "</ul>";

		for ( var i = 0; i < this.tabs.length; i++) {
			str = str + "<div id='" + this.tabs[i].Id + "'></div>";
		}

		this.container.append(str);
		this.container.tabs({
			collapsible : false,
			show : function(event, ui) {
				self.loadSubTabModule($(ui.panel).attr("id"));
			}

		});

	},
	loadSubTabModule: function(id){
		for(var i=0; i<this.tabs.length ;i++){
			if(this.tabs[i].Id == id){
				if(this.tabs[i].loaded == null) {
					this.sb.startModule(this.tabs[i].Id, this.tabs[i].ModuleFun,this.tabs[i].Config);
					this.tabs[i].loaded = true;
				}
			}
		}
	},
	end : function(){
	
	}
		
};