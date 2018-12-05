
module.exports = {
	//apiHost:"http://skyshop.skymvc.com/",
	apiHost:"http://all.w.deitui.com/", 
    json_add:function(a,b){
        if(a==undefined || a.length==0) return b;
		if(b==undefined || b.length==0) return a;
		var s_a=JSON.stringify(a);
		var s_b=JSON.stringify(b);
		var c=s_a.substring(0,s_a.length-1)+","+s_b.substring(1);
		return JSON.parse(c);
	},
	goBack:function(){
		console.log(Router);
		this.$router.go(-1);
	},
	getAuthCode:function(){
		return uni.getStorageSync("authcode");
	},
	setAuthCode:function($authcode){
		uni.setStorageSync("authcode",$authcode);
	},
	getAuthCodeLong:function(){
		return uni.getStorageSync("authcodeLong");
	},
	setAuthCodeLong:function($authcode){
		uni.setStorageSync("authcodeLong",$authcode);
	},
	setOpenid:function(openid){
		uni.setStorageSync("openid",openid)
	},
	getOpenid:function(openid){
		uni.getStorageSync("openid")
	},
	fromapp:function(){
		//var $paltform= uni.platform();
		return "uniapp";
	},
	goHome:function(){
		uni.switchTab({
			url:"/pages/index/index",
		})
	},
	goCart:function(){
		uni.switchTab({
			url:"/pages/cart/index",
		})
	},
	goUser:function(){
		uni.switchTab({
			url:"/pages/user/index",
		})
	},
	goProduct:function(){
		uni.switchTab({
			url:"/pages/product/index",
		})
	},
	html:function(html){
		html=html.replace(/<img /g,'<img style="max-width:100%;height:auto;"');
		html=html.replace(/&hellip;/g,'');
		return html;
	}
	
	
}
