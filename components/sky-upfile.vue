<template>
	<view>
		<div class="flex">
			<div @click="upload()" class="btn-small mgr-5">选择文件</div>
			<div class="cl-primary" v-if="result=='doing'">上传中..</div>
			<div class="cl-success" v-if="result=='success'">上传成功</div>
			<div class="cl-warning" v-if="result=='error'">上传失败</div>
		</div>
		<div>	
			<span class="mgl-5 cl-red f12">支持word、zip压缩包</span>
		</div> 
	</view>
</template>

<script>
	export default{
		
		props:{
			imgurl:"",
			trueimgurl:"",
			field:""
		},
		data:function(){
			return {
				dimgurl:"",
				dtrueimgurl:"",
				result:""
			}			
		},
		created:function(){
			
			this.dimgurl=this.imgurl;
			if(this.dimgurl==true){
				this.dimgurl='';
			}
			this.dtrueimgurl=this.trueimgurl;
			if(this.dtrueimgurl==true){
				this.dtrueimgurl='';
			}
			 
		},
		methods: {
			getPage:function() {
				
			},
			upload:function(){
				var that=this;
				uni.chooseFile({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						that.result="doing"
						uni.uploadFile({
							url: that.app.apiHost+"/upload/uploadfile?loginToken="+that.app.getToken(),  
							filePath: tempFilePaths[0],
							name: 'upimg',
							
							success: function(res){
								var data=JSON.parse(res.data);
								console.log(data);
								if(data.error){
									that.result="error";
									return false;
								}
								that.dimgurl=data.imgurl;
								that.dtrueimgurl=data.trueimgurl;
								that.$emit("call-parent",data.imgurl);
								that.result="success"
							}
						});
					}
				});
			}
		},
	}
</script>

<style>
</style>
