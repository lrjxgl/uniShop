<template>
	<view>
		<rich-text class="row-box d-content" type="text" :nodes="data.content"></rich-text>
	</view>
</template>

<script>
	export default{
		data:function(){
			return {
				data:{},
				word:""
			}
		},
		onLoad:function(ops){
			this.word=ops.word;
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/html/index",
					data:{
						word:this.word
					},
					success:function(res){
						
						if(res.error){
							uni.showToast({
								title:res.message,
								icon:"none"
							}) 
							return false;
						}
						that.data=res.data.data;
						uni.setNavigationBarTitle({
							title:res.data.data.title
						})
						 
					}
				})
			}
		}
	}
</script>

<style>
</style>
