<template>
	<div>
		<div v-if="skyShareShow" @click="shareHide" class="modal-mask">{{skyShareShow}}</div>
		
		<div v-if="skyShareShow" class="skyShare-box">
			<!-- #ifdef H5 -->
			<div class="skyShare">点击右上角分享</div>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<div class="skyShare">
				<div @click="shareWeixin()" class="skyShare-item icon-weixin"><div class="skyShare-item-title">微信</div></div>
				<div @click="shareWxzone()" class="skyShare-item icon-wxzone"><div class="skyShare-item-title">微信朋友圈</div></div>
				<div @click="shareQQ()" class="skyShare-item icon-qq"><div class="skyShare-item-title">QQ</div></div>	
			</div>
			<!-- #endif -->
			<div @click="shareHide" class="skyShare-footer">取消</div>
		</div>
		 
	</div>
</template>

<script>
	// #ifdef H5	
	import wxH5 from "../common/weixin-h5.js"; 
	// #endif
	export default{
		props:{
			isshow:0,
			title:"",
			imgurl:"",
			link:"",
			desc:""
		},
		data:function(){
			return {
				skyShareShow:0,
				shareImg:"",
				shareList:[],
				isH5:false
			}
		},
		 
		created:function(){
			var that=this;
			if(this.imgurl!='' && this.imgurl!=undefined){
				this.shareImg=this.imgurl+".100x100.jpg";
			}else{
				this.shareImg=this.app.apiHost+"/static/logo.jpg";
			}
			//#ifndef MP-WEIXIN
			that.skyShareShow=parseInt(this.isshow);
			//#endif
			// #ifdef H5
 
			wxH5.wxshare_title=that.title;
			wxH5.wxshare_imgUrl=this.shareImg;
			wxH5.wxshare_link= document.location.href			
			wxH5.share();
			// #endif  
		},
		
		methods:{
			shareHide:function(){
				this.skyShareShow=0;
			},
			shareWeixin:function(){
				var that=this;
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: that.link,
					title: that.title,
					summary: that.desc,
					imageUrl: that.shareImg,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			shareWxzone:function(){
				var that=this;
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: that.link,
					title: that.title,
					summary: that.desc,
					imageUrl: that.shareImg,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			shareQQ:function(){
				var that=this;
				uni.share({
					provider: "qq",
					scene: "WXSenceTimeline",
					type: 0,
					href: that.link,
					title: that.title,
					summary: that.desc,
					imageUrl: that.shareImg,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
			
		}
	}
</script>

<style>
	.skyShare-box{
		position: fixed;
		left: 10px;
		right:10px;
		bottom:10px;
		background-color: #fff;
		z-index: 9999;
	}
	.skyShare{
		padding: 44px; 
		border-bottom: 2px solid #eee;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.skyShare-item{
		width: 33.3%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		 
	}
	.skyShare-item:before{
		font-family: iconfont;
		font-size: 72px;
		margin-bottom: 12px;
	}
	.skyShare-item-title{
		font-size: 24px;
		color: #323232;
	}
	.icon-weixin,.icon-wxzone{
		color: #23bf23;
	}
	 
	.icon-qq,.icon-qzone{
		color:#ffca00
	}
	.skyShare-footer{
		text-align: center;
		padding: 22px 0px;
		color: #464646;
		font-size: 34px;
		cursor: pointer;
		
	}
</style>
