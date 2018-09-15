<template>
	<view>
		<view class="pd-10 bg-fff" v-if="pageLoad">
			<view class="d-title">{{pageData.data.title}}</view>
			 
			<view class="d-content">
				<rich-text type="text" :nodes="pageData.data.content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	var app= require("../../common/common.js"); 
	var id;
	export default{
		data:function(){
			return {
				pageLoad:false, 
				pageData:{}
			}
		},
		onLoad:function(option){
			id=option.id;
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=article&ajax=1&a=show&id="+id,
					success:function(res){
						that.pageLoad=true;
						res.data.data.data.content=app.html(res.data.data.data.content);
						that.pageData=res.data.data;
						 
					}
				})
			} 
		},
	}
</script>

<style>
</style>