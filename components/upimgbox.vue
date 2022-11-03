<template>
	<view>
		<view class="upimg-box bg-fff">
			 
			<view class="upimg-item" v-for="(img,imgIndex) in imgsList" :key="imgIndex">
				<image class="upimg-img" :src="img.trueimgurl+'.100x100.jpg'"></image>
				<view class="upimg-del" @click="delImg(imgIndex)"></view>
			</view>
			 
			<view @click="upImg()" class="upimg-btn">
				<i class="upimg-btn-icon"></i>
			</view>
		</view>
	</view>
</template>

<script>
	 
	export default {
		name:"upimg-box",
		props:{
			defaultImgsList:{}, 
			defaultImgsData:{},
		},
		data:function(){
			return {
				imgsData:this.defaultImgsData,
				imgsList:this.defaultImgsList,
			}
		},
		created:function(){
			console.log(this.defaultImgsList)
		},
		
		 
		methods:{
			upImg:function(){
				var that=this;
				
				uni.chooseImage({
					success: function (chooseImageRes) {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						const len=tempFilePaths.length;
						for(var i=0;i<len;i++){
							uni.uploadFile({
								url: that.app.apiHost+'/upload/img?ajax=1&loginToken='+that.app.getToken(),  
								filePath: tempFilePaths[i],
								name: 'upimg',
								dataType:"json",
								success: function (res) {
									
									if(!res.data.error){
										var rs=JSON.parse(res.data);
										
										var json=[{
											imgurl:rs.data.imgurl,
											trueimgurl:rs.data.trueimgurl
										}];
										that.imgsList=that.app.json_add(that.imgsList,json);
										if(that.imgsData=="" || that.imgsData==undefined ){
											that.imgsData=rs.data.imgurl;											
										}else{
											that.imgsData=that.imgsData+","+rs.data.imgurl;
										}
										that.$emit("call-parent",that.imgsData);
									}
								}
							});
						}
					}
				});
			},
			delImg:function(index){
				var len=this.imgsList.length;
				var imgslist=new Array();
				var imgsData="";
				var mgs=this.imgsList;
				for(var i in mgs){
					if(i!=index){
						imgslist.push(mgs[i]);						
					}
				}
				for(var i=0;i<imgslist.length;i++){
					if(i>0){
						imgsData+=",";
					}
					imgsData+=imgslist[i].imgurl;
				}
			 
				this.imgsData=imgsData;
				this.imgsList=imgslist;
				this.$emit("call-parent",this.imgsData);
				
			}
		}
	}
</script>

<style>

</style>
