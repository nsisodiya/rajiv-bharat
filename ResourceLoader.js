var ResourceLoader = {};

ResourceLoader.files = {
	css : {

		debug : ["./WebApp/css/index.css",
		         "./WebApp/css/progress-bar.css",
		         ],
		production : ["./WebApp/css/allinone.css"],
		common : ["./WebApp/external-js-libs/jQuery-UI/css/ui-lightness/jquery-ui-1.9.2.custom.min.css"],
		icon : []
	},
	js : {
		debug : ["./WebApp/external-js-libs/choona.js/choona.1.0.0.js",
		         "./WebApp/js/App.js",
		         "./WebApp/js/App.Util.js",
		         "./WebApp/js/App.textarea.js",
		         "./WebApp/js/App.audioClipPlayer.js",
		         "./WebApp/js/App.home.js",
		         "./WebApp/js/App.about.js",
		         "./WebApp/js/App.Translate.js",
		         "./WebApp/js/App.Progress.js",
		         "./WebApp/js/App.Tabs.js",
		         "./WebApp/js/App.Menu.js",
		         "./WebApp/js/App.Menu.LoginContainer.js",
		         "./WebApp/js/Controls/App.Controls.js",
		         "./WebApp/js/Controls/App.Controls.Form.js",
		         "./WebApp/js/Controls/App.Controls.Tabs.js"],
		production : ["./WebApp/js/allinone-min.js"],
		common : ["./WebApp/external-js-libs/jquery-1.8.3.js",
		         "./WebApp/external-js-libs/jQuery-UI/jquery-ui-1.9.2.custom.min.js",
		         "./WebApp/external-js-libs/amplify.min.js",
		         "./WebApp/external-js-libs/underscore-min.js"],
		external:[]
	}
};


//Loading the resources
ResourceLoader.getSearchArgumentValue = function(arg){
	var ArgList = {};
	var x = location.search.substring(1).split("&");
	for(i in x){
	ArgList[x[i].split("=")[0]]=x[i].split("=")[1];
	}
	return ArgList[arg];
};


ResourceLoader.loadCSSfile = function(href){
	var NewStyles = document.createElement("link");
    NewStyles.rel = "stylesheet";
    NewStyles.type = "text/css";
    NewStyles.href = href;
    document.head.appendChild(NewStyles);

};

ResourceLoader.loadAll = function(){
	var mode = "production";
	if(this.getSearchArgumentValue("debug") === "true"){
		mode = "debug";
	}
	var FinalArrJS = [];
	Array.prototype.push.apply(FinalArrJS,ResourceLoader.files.js.common);
	Array.prototype.push.apply(FinalArrJS,ResourceLoader.files.js[mode]);
	
	
	FinalArrJS.push(function(){
		//Finall AllJS loaded
		
		choona.configure({
			debug : true
		});

		var application = new choona.loadApplication("applicationContainer", App);
		application.start();
		
	});
	//Loading JS Files
	head.js.apply(this,FinalArrJS);

	
	//Loading CSS Files
	var FinalArrCSS = [];
	Array.prototype.push.apply(FinalArrCSS,ResourceLoader.files.css.common);
	Array.prototype.push.apply(FinalArrCSS,ResourceLoader.files.css[mode]);
	
	
	
	var l = FinalArrCSS.length;
	for(var i=0;i<l;i++){
		this.loadCSSfile(FinalArrCSS[i]);
	}
	
	//Loading ICON
	if(ResourceLoader.files.css.icon[0] != undefined){
		var link = document.createElement("link");
		link.type = "image/x-icon";
		link.rel = "shortcut icon";
		link.href = ResourceLoader.files.css.icon[0];
		document.getElementsByTagName("head")[0].appendChild(link);
	}
	
};

ResourceLoader.loadAll();
