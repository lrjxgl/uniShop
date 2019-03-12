<template>
	<view>
		<view v-if="pageLoad">
			<view class="flex flex-center mgt-10 mgb-10">
				<image @click="upload()" mode="widthFix" class="wh-200 pointer" :src="user_head"></image>
			</view>
		</view>
	</view>
</template>

<script>
	 
	export default{
		data:function(){
			return {
				pageLoad:false, 
				pageData:{},
				user_head:"",
			}
		},
		onLoad:function(option){
			 
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:that.app.apiHost+"?m=user&a=user_head&ajax=1",
					data:{
						authcode: that.app.getAuthCode()
					},
					success:function(res){
						that.pageLoad=true;
						that.pageData=res.data.data;
						that.user_head=res.data.data.data.user_head; 
					}
				})
			},
			upload:function(){
				var that=this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: that.app.apiHost+"?m=upload&a=img&ajax=1&authcode="+that.app.getAuthCode(), //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'upimg',
							
							success: function(res){
								var data=JSON.parse(res.data);
								
								uni.request({
									url:that.app.apiHost+"?m=user&a=user_head_save&ajax=1&authcode="+that.app.getAuthCode(),
									data:{
										user_head:data.data.imgurl
									},
									method:"POST",
									header:{
										"content-type":"application/x-www-form-urlencoded"
									},
									success:function(res){
										that.user_head=data.data.trueimgurl;
									}
								})
							}
						});
					}
				});
			}
		},
	}
</script>

<style>
</style>
