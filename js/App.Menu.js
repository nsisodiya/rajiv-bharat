App.Menu = {
	
	start : function() {
		this.container = $(this.$);
		var str = '\
			<div>नमस्ते <b><spas id="userName"><span></b></div>\
			<ul class="verticalMenu">\
				<li><div>Menu</div>\
					<ul>\
						<li id="login"><a>Login</a></li>\
						<li id="settings"><a>Settings</a></li>\
						<li id="logout"><a>Logout</a></li>\
					</ul>\
				</li>\
			</ul>\
			<div id="loginContainer" class="loginContainer">\
			</div>\
			';
		this.container.append(str);
		this.attachEventHandlers();
		this.createMenu();
		this.container.find("#logout").hide();
		this.container.find("#settings").hide();
		this.container.find("#loginContainer").hide();
		this.sb.startModule("loginContainer", App.Menu.LoginContainer);
		var self = this;
		this.getMyInfo();
		this.sb.subscribe("LoginSuccessful", function(){
			self.getMyInfo();
		});
		

	},
	end : function() {

	},
	attachEventHandlers: function(){
		var self = this;
		this.container.find("#login").click(function(){
			//App.Util.Debug("login");
			self.container.find("#loginContainer").show();
			App.Util.showProcessingScreen();
		});
		this.container.find("#logout").click(function(){
			self.logOut();
		});
		
		
		
		
	},
	createMenu : function() {
		var timeout = 500;
		var closetimer = 0;
		var ddmenuitem = 0;

		function jsddm_open() {
			jsddm_canceltimer();
			jsddm_close();
			ddmenuitem = $(this).find('ul').css('visibility', 'visible');
		}

		function jsddm_close() {
			if (ddmenuitem)
				ddmenuitem.css('visibility', 'hidden');
		}

		function jsddm_timer() {
			closetimer = window.setTimeout(jsddm_close, timeout);
		}

		function jsddm_canceltimer() {
			if (closetimer) {
				window.clearTimeout(closetimer);
				closetimer = null;
			}
		}

		
		this.container.find(".verticalMenu > li").bind('mouseover', jsddm_open);;
		this.container.find(".verticalMenu > li").bind('mouseout', jsddm_timer);
		
		document.onclick = jsddm_close;

	},
	getMyInfo: function(){
		var self = this;
		var onSuccessCB = function(data){
			if(typeof data.User === "object"){
				self.container.find("#userName").html(data.User.name);
				//Hide Login
				self.container.find("#login").hide();
				self.container.find("#logout").show();
				self.container.find("#settings").show();
			}
		};
		var onServerErrorCB = function(errorRes){
			//alert(errorRes);
		};
		var onErrorCB = function(data, error, text){
			App.Util.DebugWithTrace("Data -" + data + "Error -" + error + "Text -" + text);
		};
		App.Util.Ajax({
            type: "GET",
            url: "../DataAPI/getMyInfo/",
            success: onSuccessCB,
            serverError: onServerErrorCB,
            error: onErrorCB
        });
		
	},
	logOut: function(){
		var self = this;
		var onSuccessCB = function(data){
			//Logout
			if(data.logout === "success"){
				alert("You are logged out, Login Again");
				self.container.find("#userName").html("");
				self.container.find("#login").show();
				self.container.find("#logout").hide();
				self.container.find("#settings").hide();
			}
		};
		var onServerErrorCB = function(errorRes){
			//alert(errorRes);
		};
		var onErrorCB = function(data, error, text){
			App.Util.DebugWithTrace("Data -" + data + "Error -" + error + "Text -" + text);
		};
		App.Util.Ajax({
            type: "GET",
            url: "../DataAPI/logout/",
            success: onSuccessCB,
            serverError: onServerErrorCB,
            error: onErrorCB
        });
		
	}
};