<template>
	<view>
		<view v-if="pageLoad">
			<form @submit="submit">
				<view class="input-flex">
					<view class="input-flex-label">昵称</view>
					<input class="input-flex-text" name="nickname"  :value="pageData.data.nickname" >
				</view>
				 <view class="input-flex">
				 	<view class="input-flex-label">手机号</view>
				 	<div class="input-flex-txt"  >{{pageData.data.telephone}}</div>
				 </view> 
				<view class="input-flex">
					<view class="input-flex-label">简介</view>
					<textarea name="description" :value="pageData.data.description" class="input-flex-text h60"></textarea>
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
		onShow(){
			this.getPage()
		} ,
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/user/info",
					success:function(res){
						that.pageLoad=true;
						that.pageData=res.data;
					}
				})
			},
			submit:function(e){
				var that=this;
				that.app.post({
					url:that.app.apiHost+"/index/user/save",
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
