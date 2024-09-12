<template>
	<view>
		<view v-if="pageLoad">
		 <form @submit="submit">
		 	<view class="input-flex">
		 		<view class="input-flex-label">旧密码</view>
		 		<input password="password" class="input-flex-text" name="oldpassword"   >
		 	</view>
			<view class="input-flex">
				<view class="input-flex-label">新密码</view>
				<input password="password" class="input-flex-text" name="password"   >
			</view>
			<view class="input-flex">
				<view class="input-flex-label">重复密码</view>
				<input password="password" class="input-flex-text" name="password2"   >
			</view>
		 	<button type="submit" form-type="submit" class="btn-row-submit">保存</button>
		 </form>
		</view>
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
				title:"登录密码"
			}) 
			 
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/user/password",
	
					success:function(res){
						that.pageLoad=true;
						that.pageData=res.data;
						 
					}
				})
			},
		 submit:function(e){
			var that=this;
			that.app.post({
				url:that.app.apiHost+"/index/user/passwordsave",
				data:e.detail.value,
				success:function(res){
					
					uni.showToast({
						"title":res.message,
						icon:"none"
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
