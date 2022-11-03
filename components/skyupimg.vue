<template>
	<view>
		<view class="upimg-box bg-fff">
			<view @click="upload()" v-if="dimgurl!=''" class="upimg-item">
				<image mode="widthFix" class="upimg-img"  :src="dtrueimgurl+'.100x100.jpg'"></image>
			</view>
			 
			<view @click="upload()" class="upimg-btn">
				<view class="upimg-btn-icon"></view>
			</view>
			<input style="display: none;" type="file" name="upimg" id="upimg" />
		</view>
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
				dtrueimgurl:""
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
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: that.app.apiHost+"/upload/img?loginToken="+that.app.getToken(),
							filePath: tempFilePaths[0],
							name: 'upimg',
							
							success: function(res){
								var data=JSON.parse(res.data);
								console.log(data);
								that.dimgurl=data.data.imgurl;
								that.dtrueimgurl=data.data.trueimgurl;
								that.$emit("call-parent",data.data.imgurl);
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
