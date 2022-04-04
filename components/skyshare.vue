<template>
	<view>
		<view v-if="skyShareShow" @click="shareHide" class="modal-mask">{{skyShareShow}}</view>
		
		<view v-if="skyShareShow" class="skyShare-box">
			<!-- #ifdef H5 -->
			<view class="skyShare">点击右上角分享</view>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<view class="skyShare">
				<view @click="shareWeixin()" class="skyShare-item icon-weixin"><view class="skyShare-item-title">微信</view></view>
				<view @click="shareWxzone()" class="skyShare-item icon-wxzone"><view class="skyShare-item-title">微信朋友圈</view></view>
				<view @click="shareQQ()" class="skyShare-item icon-qq"><view class="skyShare-item-title">QQ</view></view>	
			</view>
			<!-- #endif -->
			<view @click="shareHide" class="skyShare-footer">取消</view>
		</view>
		 
	</view>
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
		left: 0px;
		right:0px;
		bottom:0px;
		background-color: #fff;
		z-index: 9999;
	}
	.skyShare{
		padding: 44rpx; 
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
		font-size: 72rpx;
		margin-bottom: 12rpx;
	}
	.skyShare-item-title{
		font-size: 24rpx;
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
		padding: 12px 0px;
		color: #464646;
		font-size: 16px;
		cursor: pointer;
		
	}
</style>
