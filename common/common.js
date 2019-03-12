
module.exports = {
	//apiHost:"http://skyshop.skymvc.com/",
	apiHost:"https://www.fd175.com/",
	appRoot:"https://www.fd175.com/uniapp/h5/", 
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
	getCookie:function(name){
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
	getAuthCode:function(){
		 
		var authcode=uni.getStorageSync("authcode");
		if(!authcode){
			authcode=this.getCookie("authcode");
		}
		return authcode;
	},
	setAuthCode:function($authcode){
		uni.setStorageSync("authcode",$authcode);
	},
	getAuthCodeLong:function(){
		var authcode=uni.getStorageSync("authcodeLong");
		if(!authcode){
			authcode=this.getCookie("authcodeLong");
		}
		return authcode;
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
	getLoginCode:function(){
		return uni.getStorageInfoSync("loginCode");
	},
	setLoginCode:function(code){
		uni.setStorageSync("loginCode",code)
	},
	fromapp:function(){
		//var $paltform= uni.platform();
		return "uniapp";
	},
	isWeixin:function(){
		// #ifdef H5
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        }
		// #endif
		return false;
	},
	get:function(ops){
		var ops=ops;
		if(ops.data==undefined){
			ops.data={
				authcode:this.getAuthCode(),
				fromapp:this.fromapp(),
				ajax:1
			};
		}else{
			ops.data.authcode=this.getAuthCode();
			ops.data.fromapp=this.fromapp();
			ops.data.ajax=1;
		}
		
		uni.request({
			url:ops.url,
			method:"GET",
			data:ops.data,
			success:function(rs){
				
				if(rs.data.error==1000){
					uni.navigateTo({
						url:"../login/index"
					})
				}else{
					ops.success(rs.data);
				}
			}
		})
	},
	post:function(ops){
		var callback=callback;
		var ops=ops;
		if(ops.url.indexOf("?") >= 0){
			ops.url+="&ajax=1&authcode="+this.getAuthCode()+"&fromapp="+this.fromapp();
		}else{
			ops.url+="?ajax=1&authcode="+this.getAuthCode()+"&fromapp="+this.fromapp();
		}
		
		uni.request({
			url:ops.url,
			data:ops.data,
			method:"POST",
			header:{
				"content-type":"application/x-www-form-urlencoded"
			},
			success:function(rs){
				if(rs.data.error==1000){
					uni.navigateTo({
						url:"../login/index"
					})
				}else{
					ops.success(rs.data);
				}
			}	
		})
	},
	goHome:function(){
		uni.redirectTo({
			url:"../index/index"
		})
		/*
		uni.switchTab({
			url:"../index/index",
		})
		*/
	},
	goCart:function(){
		uni.switchTab({
			url:"../cart/index",
		})
	},
	goUser:function(){
		uni.switchTab({
			url:"../user/index",
		})
	},
	goProduct:function(){
		uni.switchTab({
			url:"../product/index",
		})
	},
	goFenlei:function(){
		uni.switchTab({
			url:"../fenlei/index",
		})
	},
	goLogin:function(){
		uni.navigateTo({
			url:"../login/index"
		})
	},
	goH5WeiXin:function(backurl){
		// #ifdef H5
		var url=document.location.href.split('#')[0]+"#"+backurl;
		window.location=this.apiHost+'/index.php?m=open_weixin&a=Geturl&backurl='+encodeURIComponent(url);
		// #endif
		
	},
	html:function(html){
		if(html==''|| html==null) return '';
		html=html.replace(' style="','  xstyle="');
		html=html.replace(/<img /g,'<img style="max-width:100%;height:auto;"');
		html=html.replace(/&hellip;/g,'');
		html=html.replace(' class="brush:html;toolbar:false"'," ");
		html=html.replace(/<pre /g,'<pre style="border:1px solid #eee;padding:10px;max-height:300px;overflow:auto;" ');
		
		html=html.replace(/<pre /g,"<div ");
		html=html.replace("</pre>","</div>");
		html=html.replace(/\n/g,"<br />");
		html=html.replace(/<iframe /,'<div style="display:none" ');
		html=html.replace(/<\/iframe>/,'</div>');
		html=html.replace("<section ","<div ");
		html=html.replace("</section>","</div>");
		 
		//console.log(html);
		return html;
	},
	
}
