export default {
	 
	apiHost: "http://demo.deituicms.com",
	appRoot: "http://demo.deituicms.com/uniapp/h5/",
	wsHost: "wss://wss.deituicms.com:8282",
	pmTimer: 0,
	inPost: false,
	parseUrl:function(url){
		var params = [],h;
		var hash = url.slice(url.indexOf("?") + 1).split('&');
		for (var i = 0; i < hash.length; i++) {
			h = hash[i].split("=");
			params[h[0]] = h[1];
		}
		return params;
	}, 
	parseLink:function(ops){
		var $root=""		 
		if( ops.m.substr(0,4)=="mod_"){	 
			ops.path="/module.php"
		}
		var m=ops.m;
		var a=ops.a;
		 
		var arr=ops.m.split("_");
		var mm="";
		console.log(ops.path)
		switch(ops.path){
			case "/":
				$root="/pages/"
				break;
			case "/module.php":
				if(ops.m.substr(0,4)=="mod_"){
					mm=arr[1];						
					m=ops.m.substr(4,ops.m.length);
				}else{
					mm=arr[0];
				}					
				switch(mm){
					case "sblog":
						$root="../../page"+mm;
						break;
					default:
						$root="../../"+mm;
						break;
				}
				break;
		}
		 
		var url=$root+"/"+m+"/"+a+"?"+ops.param;
		return url;
	},  
	json_add: function(a, b) {

		if (a == undefined || a.length == 0) return b;
		if (b == undefined || b.length == 0) return a;

		var s_a = JSON.stringify(a);
		var s_b = JSON.stringify(b);
		var c = s_a.substring(0, s_a.length - 1) + "," + s_b.substring(1);
		return JSON.parse(c);
	},
	goBack:function(){
		var pages=getCurrentPages();
		if(pages.length==1){
			this.goHome();
		}else{
			uni.navigateBack()
		}
	},
	getCookie: function(name) {
		// #ifdef H5
		var strcookie = document.cookie;
		var arrcookie = strcookie.split("; ");
		for (var i = 0; i < arrcookie.length; i++) {
			var arr = arrcookie[i].split("=");
			if (arr[0] == name) {
				return arr[1];
			}
		}
		return "";
		// #endif

	},
	loginOut:function(){
		uni.removeStorageSync("token");
		uni.removeStorageSync("refreshToken");
	},
	getToken:function(){
		var token = uni.getStorageSync("token");
		if (!token) {
			token = this.getCookie("token");
		}
		return token;
	},
	setOpenid: function(openid) {
		uni.setStorageSync("openid", openid)
	},
	getOpenid: function(openid) {
		uni.getStorageSync("openid")
	},
	getLoginCode: function() {
		return uni.getStorageSync("loginCode");
	},
	setLoginCode: function(code) {
		uni.setStorageSync("loginCode", code)
	},
	
	getGps: function() {
		var gps = uni.getStorageSync("appGps");
		if (gps == "") {
			return {
				lat: 39.850836,
				lng: 116.471564
			};
		}
		return JSON.parse(gps);

	},
	setGps: function(lat, lng) {
		var s = {
			lat: lat,
			lng: lng
		};
		var str = JSON.stringify(s);
		uni.setStorageSync("appGps", str);
	},
	setCity: function(city, cityid) {
		uni.setStorageSync("city", city);
		uni.setStorageSync("cityid", cityid);
	},
	getCity: function() {
		var city = uni.getStorageSync("city");
		if (!city) {
			city = "厦门";
		}
		return city;
	},

	getCityId: function() {
		return uni.setStorageSync("cityid", cityid);
	},
	getLocalAddress: function() {
		var city = uni.getStorageSync("appLocalAddress");
		if (!city) {
			city = "瑞景商业广场";
		}
		return city;
	},
	setLocalAddress: function(val) {
		uni.setStorageSync("appLocalAddress", val);
	},
	fromapp: function() {
		//var $paltform= uni.platform();
		return "uniapp";
	},
	isWeixin: function() {
		// #ifdef H5
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		}
		// #endif
		return false;
	},
	get: function(ops) {
		var ops = ops;
		ops.url=ops.url.toLowerCase()
		if (ops.data == undefined) {
			ops.data = {
				fromapp: this.fromapp(),
				loginToken:this.getToken(),
				ajax: 1
			};
		} else {
			ops.data.fromapp = this.fromapp();
			ops.data.loginToken=this.getToken();
			ops.data.ajax = 1;
		}
		
		uni.request({
			url: ops.url,
			method: "GET",
			data: ops.data,
			success: (rs) => {

				if (rs.data.error == 1000 && ops.unLogin == undefined) {
					uni.navigateTo({
						url: "../../pages/login/index"
					})
				} else {
					ops.success(rs.data);
				}
			}
		})
	},
	post: function(ops) {
		var callback = callback;
		var ops = ops;
		ops.url=ops.url.toLowerCase()
		if (ops.url.indexOf("?") >= 0) {
			ops.url += "&ajax=1&fromapp=" + this.fromapp();
			ops.url+="&loginToken="+this.getToken();
		} else {
			ops.url += "?ajax=1&fromapp=" + this.fromapp();
			ops.url+="&loginToken="+this.getToken();
		}
		
		uni.request({
			url: ops.url,
			data: ops.data,
			method: "POST",
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			success: (rs) => {
				if (rs.data.error == 1000 && ops.unLogin == undefined) {
					uni.navigateTo({
						url: "../../pages/login/index"
					})
				} else {
					ops.success(rs.data);
				}
			}
		})
	},

	canPost: function() {
		var that = this;
		if (!this.inPost) {
			this.inPost = true;

			setTimeout(function() {
				that.inPost = false;
			}, 1000)
			return true;
		} else {
			setTimeout(function() {
				that.inPost = false;
			}, 1000)
			return false;
		}

	},
	goHome: function() {
		uni.reLaunch({
			url: "../../pages/index/index"
		})
		/*
		uni.switchTab({
			url:"../index/index",
		})
		*/
	},

	goUser: function() {
		uni.switchTab({
			url: "../user/index",
		})
	},

	goLogin: function() {
		uni.navigateTo({
			url: "../../pages/login/index"
		})
	},
	goH5WeiXin: function(backurl) {
		// #ifdef H5
		var url = document.location.href.split('#')[0] + "#" + backurl;
		window.location = this.apiHost + '/open_weixin/Geturl?backurl=' + encodeURIComponent(url);
		// #endif

	},
	html: function(html) {
		if (html == '' || html == null) return '';
		html = html.replace(' style="', '  xstyle="');
		html = html.replace(/<img /g, '<img style="max-width:100%;height:auto;"');
		html = html.replace(/&hellip;/g, '');
		html = html.replace(' class="brush:html;toolbar:false"', " ");
		html = html.replace(/<pre /g,
			'<pre style="border:1px solid #eee;padding:10px;max-height:300px;overflow:auto;" ');

		html = html.replace(/<pre /g, "<view ");
		html = html.replace("</pre>", "</view>");
		html = html.replace(/\n/g, "<br />");
		html = html.replace(/<iframe /, '<view style="display:none" ');
		html = html.replace(/<\/iframe>/, '</view>');
		html = html.replace("<section ", "<view ");
		html = html.replace("</section>", "</view>");

		//console.log(html);
		return html;
	},
	showLogin:false,
		showLoginBox:function(back){
			var that=this;
			if(that.showLogin){
				return false;
			}
			that.showLogin=true;
			uni.showModal({
				content:"当前功能需要登陆后才可使用，您还未登陆，请先去登陆",
				confirmText:"去登陆",
				cancelText:"关闭",
				success:function(e){
					setTimeout(function(){
						that.showLogin=false;
					},500)
					
					if(e.confirm){
						uni.navigateTo({
							url:"/pages/login/index"
						})
					}else{
						if(back==true){
							var pages =getCurrentPages();
							if(pages.length==1){
								uni.reLaunch({
									url:"/pages/index/index"
								})
							}else{
								uni.navigateBack()
							}
							
							
						}
					}
				}
			})
		}


}
