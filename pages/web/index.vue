<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default{
		data:function(){
			return {
				url:"https://www.fd175.com/vr3d/index?from_wxmini=1"
			}
		},
		onLoad:function(ops){
			if(ops.url!=undefined){
				this.url=decodeURIComponent(ops.url) +"&from_wxmini=1" ;
			}
			if(this.url.substr(0,"https://www.fd175.com".length)=="https://www.fd175.com"){
				this.url+="&loginToken="+this.app.getToken()
			}
			console.log(this.url);		
		},
		onShareAppMessage:function(){
			
		}, 
		onShareTimeline:function(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
