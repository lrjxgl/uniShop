<template>
	<view>
		<view v-if="pageLoad">
		<view class="d-title">{{pageData.data.title}}</view>
		 
		<view class="d-content">
		<rich-text type="text" :nodes="pageData.data.content"></rich-text>
		</view>
		</view>
	</view>
</template>

<script>
	 
	var id;
	export default{
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},
		onLoad:function(option){
			id=option.id;
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"?m=article",
	 
					success:function(res){
						that.pageLoad=true;
						that.pageData=res.data;
						 
					}
				})
			} 
		},
	}
</script>

<style>
</style>
