<template>
	<view class="bg-white pd-5">
		<view @click="goShop(item.shopid)" v-for="(item,index) in shoplist" :key="index" class="shopItem">
			<image :src="item.imgurl+'.100x100.jpg'" mode="widthFix" class="shopItem-img"></image>
			<view class="flex-1">
				<view class="shopItem-title">{{item.title}}</view>
				<view class="flex">
					
					<view class="shopItem-ratybox"><sky-raty label='' class="scalem2" len="5" mod="2" readonly="1" :grade="item.raty_grade"></sky-raty></view>
					<view class="f12">月售{{item.month_buy_num}}</view>
					<view class="flex-1"></view>
					<view class="mgr-10 f12">{{item.distance}}</view>
					<view class="f12">{{item.sendtime}}</view>
				</view>
				<view class="flex flex-ai-center mgb-5">
					<view class="f12 cl2 mgr-10">起送 ￥12</view>
					<view class="f12 cl2 mgr-10">配送￥5</view>
					<view class="f12 cl2">人均￥12</view>
					<view class="flex-1"></view>
					<view class="shopItem-zsbtn">专送</view>
				</view>
				<view class="flex mgb-5"><view class="iconfont icon-shop f12 mgr-3"></view><span class="f12 cl2">面馆</span></view>
				<view class="flex flex-ai-center">
					<view class="shopItem-mbtn">首单减10元</view>
					<view class="shopItem-mbtn">30减10</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import skyRaty from "./skyraty.vue";
	export default{
		components:{
			skyRaty
		},
		props:{
			shoplist:{}
		},
		data:function(){
			return {
				list:{}
			}
		},
		created:function(){
			 
		},
		methods:{
			goShop:function(shopid){
				uni.navigateTo({
					url:"../../pageb2b/b2b_shop/index?shopid="+shopid
				})
			}
		}
	}
</script>

<style>
	.mgr-3{
		margin-right: 3px;
	}
	.shopItem{
		display: flex;
		flex-direction: row;
		margin-bottom: 10px;
	}
	.shopItem-img{
		width: 70px;
		height: 70px;
		margin-right: 10px;
		border-radius: 50%;
	}
	.shopItem-title{
		font-size: 18px;
		margin-bottom: 5px;
	}
	.shopItem-ratybox{
		width: 85px; 
		margin-bottom: -8px;
	}
	.shopItem-zsbtn{
		background-color: #fdd060;
		color: #666;
		font-size: 12px;
		padding: 3px 6px;
		border-radius: 5px;
	}
	.shopItem-mbtn{
		border:1px solid #fc9993;
		padding: 2px 3px;
		border-radius: 5px;
		font-size: 12px;
		transform: scale(0.8,0.8);
		transform-origin: 0 0px;
		box-sizing: border-box;
		margin-right: -10px;
		color: #fc9993;
	}
	.scalem2{
		transform: scale(0.7);
		transform-origin: 0 12px;
	}
</style>
