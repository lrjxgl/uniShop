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
				that.app.get({
					url:this.app.apiHost+"/user/paypwd?",
					success:function(res){
						that.pageLoad=true;
						that.pageData=res.data;
						 
					}
				})
			},
			submit:function(e){
				var that=this;
				that.app.post({
					url:this.app.apiHost+"/user/paypwdsave?",
					data:e.detail.value,
					success:function(res){
						uni.showToast({
							"title":res.message
						})
						if(!res.error){
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
