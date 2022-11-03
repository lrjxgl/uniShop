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
					url:that.app.apiHost+"/html/aboutus?ajax=1",
					success:function(res){
						that.data=res.data.data;
						console.log(res.data.data.content)
					}
				})
			}
		}
	}
</script>

<style>
</style>
