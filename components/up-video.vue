<template>
	<view>
		<view class="upimg-box bg-fff">
			
			 
			<view @click="upload()"  class="upimg-btn">
				<view class="upimg-btn-icon"></view>
			</view>
			<view v-if="videoProgress>0 && videoProgress<100">{{videoProgress}}%</view>
			 
			
			
			<input style="display: none;" type="file" name="upimg" id="upimg" />
		</view>
		<view>
			<video style="width: 90%;" v-if="truemp4url!='' " :src="truemp4url"></video> 
		</view>	
	</view>
</template>

<script>
	var that;
	export default{
		 
		props:{
			dMp4url:String,
			dTrueMp4url:String,
			iField:String
		},
		data:function(){
			return {
				mp4url:"",
				truemp4url:"",
				videoProgress:0
			}			
		},
		created:function(){
			that=this;
			this.mp4url="";//this.dMp4url;
			this.truemp4url=this.dTrueMp4url;
			 
			//console.log(typeof(this.truemp4url))
		},
		methods: {
			 
			upload:function(){
				
				uni.chooseVideo({
					count:1,
					sourceType: ['camera', 'album'],
					success: (ress) => {
						that.videoProgress=1;
						var tempFilePath = ress.tempFilePath;
						uni.request({
							url:that.app.apiHost+"/ossupload/auth",
							method:"GET",
							data:{
								loginToken:that.app.getToken(),
								ajax:1
							},
							success:(rs)=>{
								var oos=rs.data;
								
								var fdata={
									OSSAccessKeyId:oos.accessid,
									policy:oos.policy,
									Signature:oos.sign,
									key:oos.key + ".mp4",
									callback:oos.callback
								};
								 
								var uploadTask=uni.uploadFile({
									url: oos.url, 
									filePath: tempFilePath,
									name: 'file',
									formData:fdata,
									success: (res)=>{
										var data=JSON.parse(res.data);
										console.log(data);
										 
										that.$emit("call-parent",data.filename);
										that.truemp4url=data.truename;
									}
								});
								uploadTask.onProgressUpdate((res) => {
									that.videoProgress=res.progress;
								  
								});
								 
							}
						})	
						
					}
				});
			}
		},
	}
</script>

<style>
</style>
