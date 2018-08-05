
module.exports = {
	//apiHost:"http://skyshop.skymvc.com/",
	apiHost:"http://skyshop.deitui.com/", 
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
	fromapp:function(){
		//var $paltform= uni.platform();
		return "wxapp";
	},
	goHome:function(){
		uni.switchTab({
			url:"/pages/index/index",
		})
	}
	
}
