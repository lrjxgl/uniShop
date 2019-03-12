<template>
	<div>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,key) in pageData.flashList" :key="key">
				<view class="swiper-item">
					<image @click="gourl(item.link1)" :src="item.imgurl" style="width:100%" mode="widthFix"></image>
				</view>
			</swiper-item>
		
		</swiper>
		<div class="row-box-hd  pdl-10" >
			<div class="flex-1 f16">推荐</div>
			<div class="row-box-more">更多</div>
		</div>
		<div class="mtlist">
			 
			<div v-for="(item,index) in pageData.recList" :key="index" @click="goProduct(item.id)" class="mtlist-item">
				<div class="mtlist-item-bd">
					<div class="mtlist-imgbox">
						<image mode="widthFix" class="mtlist-img " :src="item.imgurl+'.small.jpg'" ></image>
					</div>
					<div class="mtlist-item-pd">
						<div class="mtlist-item-money">
							<div class="mtlist-item-money-flex">￥
								<text class="mtlist-item-money_money">{{item.price}}</text>
							</div>
							<div class="mtlist-item-money_num">月销{{item.buy_num}}件</div>
						</div>
						<div class="mtlist-title">{{item.title}}</div>
						 
					</div>
				</div>
			</div>
			 
		</div>
		<div class="row-box-hd  pdl-10 mtt10" >
			<div class="flex-1 f16">热销</div>
			<div class="row-box-more">更多</div>
		</div>
		<div class="mtlist">
			 
			<div v-for="(item,index) in pageData.hotList" :key="index" @click="goProduct(item.id)" class="mtlist-item">
				<div class="mtlist-item-bd">
					<div class="mtlist-imgbox">
						<image mode="widthFix" class="mtlist-img " :src="item.imgurl+'.small.jpg'" ></image>
					</div>
					<div class="mtlist-item-pd">
						<div class="mtlist-item-money">
							<div class="mtlist-item-money-flex">￥
								<text class="mtlist-item-money_money">{{item.price}}</text>
							</div>
							<div class="mtlist-item-money_num">月销{{item.buy_num}}件</div>
						</div>
						<div class="mtlist-title">{{item.title}}</div>
						 
					</div>
				</div>
			</div>
			 
		</div>
		<b2c-footer tab="home"></b2c-footer>
	</div>
</template>

<script>
	import b2cFooter from "../../components/b2cfooter.vue";
	export default{
		components:{
			b2cFooter
		},
		data(){
			return{
				pageData:{}
			}
		},
		onLoad:function(ops){
			uni.setNavigationBarTitle({
				title:"福鼎商城"
			})
			this.getPage();
		},
		methods:{
			goProduct:function(id){
				uni.navigateTo({
					url:"../b2c_product/show?id="+id
				})
			},
			getPage:function(){
				var that=this;
				uni.request({
					url:this.app.apiHost+"/module.php?m=b2c&ajax=1&authcode="+this.app.getAuthCode(),
					success:function(res){
						that.pageData=res.data.data;
					}
				})
			},
		}
	}
</script>

<style>
	.mtt10{
		margin-top: -20upx;
	}
	 
</style>
