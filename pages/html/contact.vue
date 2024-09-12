<template>
	<view>
		<rich-text class="row-box d-content" type="text" :nodes="data.content"></rich-text>
	</view>
</template>

<script>
	export default{
		data:function(){
			return {
				data:{}
			}
		},
		onLoad:function(){
			uni.setNavigationBarTitle({
				title:"关于我们"
			})
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/html/contact",
					success:function(res){
						if(res.error){
							uni.showToast({
								title:res.message,
								icon:"none"
							}) 
							return false;
						}
						that.data=res.data.data;
						 
					}
				})
			}
		}
	}
</script>

<style>
</style>
