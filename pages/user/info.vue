<template>
	<view>
		<view v-if="pageLoad">
			<form @submit="submit">
				<view class="input-flex">
					<view class="input-flex-label">昵称</view>
					<input class="input-flex-text" name="nickname"  :value="pageData.data.nickname" >
				</view>
				<button form-type="submit" class="btn-row-submit">提交</button>
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
				title:"用户资料"
			}) 
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:that.app.apiHost+"?m=user&a=info&ajax=1",
					data:{
						authcode: that.app.getAuthCode(),
						fromapp:that.app.fromapp()
					},
					success:function(res){
						if(res.data.error){
							that.app.goHome();
						}else{
							that.pageLoad=true;
							that.pageData=res.data.data;
						}
						
						 
					}
				})
			},
			submit:function(e){
				var that=this;
				uni.request({
					url:that.app.apiHost+"?m=user&a=save&ajax=1&fromapp="+that.app.fromapp()+"&authcode="+that.app.getAuthCode(),
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
