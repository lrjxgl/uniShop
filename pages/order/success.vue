<template>
	<view>
		<view >
			<view class="pd-10 f18"> 下单成功，感谢您的支持 </view>
			<navigator  url="/pages/index/index"><view class="btn-row-submit">返回首页</view> </navigator>
		</view>
	</view>
</template>

<script>
	var app= require("../../common/common.js"); 
	var id;
	export default{
		data:{
			pageLoad:false, 
			pageData:{}
		},
		onLoad:function(option){
			 
			//this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=article",
					data:{
						authcode: app.getAuthCode()
					},
					success:function(data){
						that.pageLoad=true;
						that.pageData=data.data.data;
						 
					}
				})
			} 
		},
	}
</script>

<style>
</style>
