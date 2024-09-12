<template>
	<view>
		<web-view v-if="url!=''" :src="url"></web-view>
	</view>
</template>

<script>
	export default{
		data:function(){
			return {
				url:""
			}
		},
		onLoad:function(ops){
			this.url=this.app.apiHost
			if(ops.url!=undefined){
				this.url=decodeURIComponent(ops.url)
		 
				if(this.url.indexOf("?")==-1){
				 
					this.url+="?from_wxmini=1"
				}else{
					this.url+="&from_wxmini=1"
				}
				  
			}
			if(this.url.substr(0,this.app.apiHost.length)==this.app.apiHost){
				if(ops.url.indexOf("?")==-1){
					this.url+="?"
				}
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
