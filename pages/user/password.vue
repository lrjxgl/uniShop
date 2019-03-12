<template>
	<div>
		<div v-if="pageLoad">
		 <form @submit="submit">
		 	<div class="input-flex">
		 		<div class="input-flex-label">旧密码</div>
		 		<input password="password" class="input-flex-text" name="oldpassword"   >
		 	</div>
			<div class="input-flex">
				<div class="input-flex-label">新密码</div>
				<input password="password" class="input-flex-text" name="password"   >
			</div>
			<div class="input-flex">
				<div class="input-flex-label">重复密码</div>
				<input password="password" class="input-flex-text" name="password2"   >
			</div>
		 	<button type="submit" form-type="submit" class="btn-row-submit">保存</button>
		 </form>
		</div>
	</div>
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
				uni.request({
					url:that.app.apiHost+"?m=user&a=password&ajax=1",
					data:{
						authcode: that.app.getAuthCode(),
						fromapp:that.app.fromapp()
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
				url:that.app.apiHost+"?m=user&a=passwordsave&ajax=1&fromapp="+that.app.fromapp()+"&authcode="+that.app.getAuthCode(),
				method:"POST",
				header:{
					"content-type":"application/x-www-form-urlencoded"
				},
				data:e.detail.value,
				success:function(res){
					
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
