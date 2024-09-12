<template>
	<view >
		<div>
			<block v-if="imgList.length==0"></block>
			<block v-else-if="imgList.length==1">
				<image  @click="showPic(imgList,0)"  mode="widthFix" :src="imgList[0]+'.small.jpg'" class="img-1"></image>
			</block>
			<view class="sglist-imglist" v-else-if="imgList.length<3">
				<image @click="showPic(imgList,imgIndex)" mode="widthFix" v-for="(img,imgIndex) in  imgList" :key="imgIndex" :src="img+'.100x100.jpg'" class="img-2" ></image>
			</view>
			<view class="sglist-imglist" v-else>
				 
				<image  @click="showPic(imgList,imgIndex)" mode="widthFix" v-for="(img,imgIndex) in  imgList" :key="imgIndex" :src="img+'.100x100.jpg'" class="img-100" ></image>
			</view>
		</div>
		
		<div v-if="showModal">
			<div @click="showModal=false" class="modal-mask"></div>
			<div style="position: fixed;top:0;left:0;right:0;bottom:0;background-color: #fafafa;z-index:999; ">
				<!--<div  @click="showModal=false"  style="position: fixed;right:10px;top:10px; padding:10px;z-index:999;" class="iconfont icon-close cl-red"></div>
				-->
				<swiper :style="{height:swipeHeight+'px'}" :indicator-dots="true" :autoplay="true" :interval="3000"
					:duration="1000">
					<swiper-item v-for="(img,key) in  flashList" :key="key">
						<view class="swiper-item flex-center">
							<image @click="showModal=false"  :src="img+'.middle.jpg'" class="wall" mode="widthFix"></image>
						</view>
					</swiper-item>
						
				</swiper>
			</div>
		</div>
		
	</view>	
</template>

<script>
	export default{
		props:{
			imgslist:Array,
			dFlash:0
		},
		data(){
			return {
				swipeHeight:600,
				current:0,
				flashList:[],
				showModal:false,
				imgList:[] 
			}
		},
		created(){
			var sys = uni.getSystemInfoSync();
			this.swipeHeight = sys.windowHeight;
			this.imgList=this.imgslist 
			//console.log(this.imgList) 
		},
		watch:{
			imgslist(n,o){
				this.imgList=n;
			}
		},
		methods:{
			showPic(imgList,index){
				if(this.dFlash!=1){
					return false;
				}
				this.flashList=this.imgList;
				this.current=index;
				this.showModal=true;
			}
		}
	}
</script>

<style>
	.img-1{
		width:200px;
	}
	.img-2{
		width: 48%;
		margin-right: 1%;
	}
	.img-100{
		width: 32%;
		margin-right: 1%;
		height: auto;
		margin-bottom: 5px;
	}
	.img-60{
		width: 60px;
		height: auto;
		margin-bottom: 5px;
	}
</style>
