<template>
	<view>
		<form @submit="submit">
		<view class="input-flex">
			<view class="input-flex-label">支付密码</view>
			<input password="password" class="input-flex-text" name="paypwd"   >
		</view>
		<view class="input-flex">
			<view class="input-flex-label">登录密码</view>
			<input password="password" class="input-flex-text" name="password"   >
		</view>
		 
		<button  form-type="submit" class="btn-row-submit">保存</button>
		</form>
	</view>
</template>

<script>
	 
	export default{
		data:function(){
			return {
				pageLoad:false, 
				pageData:{}
			}
		},
		onLoad:function(option){
			uni.setNavigationBarTitle({
				title:"支付密码"
			}) 
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:this.app.apiHost+"?m=user&a=paypwd&ajax=1",
					data:{
						authcode: this.app.getAuthCode()
					},
					success:function(data){
						that.pageLoad=true;
						that.pageData=data.data.data;
						 
					}
				})
			},
			 submit:function(e){
				var that=this;
				uni.request({
					url:this.app.apiHost+"?m=user&a=paypwdsave&ajax=1&fromapp="+this.app.fromapp()+"&authcode="+this.app.getAuthCode(),
					method:"POST",
					header:{
						"content-type":"application/x-www-form-urlencoded"
					},
					data:e.detail.value,
					success:function(res){
						var data=res.data;
						uni.showToast({
							"title":res.data.message
						})
						if(!res.data.error){
							setTimeout(function(){
								uni.navigateBack()
							},600)
							
						}
						
					}
				})
			 }
		},
	}
</script>

<style>
</style>
