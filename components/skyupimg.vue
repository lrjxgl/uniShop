<template>
	<view>
		<view class="upimg-box bg-fff">
			<view @click="upload()" :class="{'none':dimgurl==''}" class="upimg-item">
				<img class="upimg-img" v-if="dimgurl!=''" :src="dtrueimgurl+'.100x100.jpg'">
			</view>
			 
			<view @click="upload()" v-if="dimgurl==''" class="upimg-btn">
				<view class="upimg-btn-icon"></view>
			</view>
			 
			<input type="hidden" :name="field" :value="dimgurl" class="imgurl none" />
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
			this.dtrueimgurl=this.trueimgurl;
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
							url: that.app.apiHost+"?m=upload&a=img&ajax=1&authcode="+that.app.getAuthCode(), //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'upimg',
							
							success: function(res){
								var data=JSON.parse(res.data);
								console.log(data);
								that.dimgurl=data.data.imgurl;
								that.dtrueimgurl=data.data.trueimgurl;
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
