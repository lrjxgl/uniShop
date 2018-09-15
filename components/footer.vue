<template>
	<view>
		<view class="footer-row"></view>
		<view class="footer">
			<view @click="goHome()" class="footer-item footer-active icon-home">
				 首页
				 
			</view>
			<view @click="goCategory()" class="footer-item icon-goods">
				分类
			</view>
			<view @click="goCart()" class="footer-item icon-cart">
				购物车
			</view>
			 
		
			<view @click="goUser()" class="footer-item icon-my_light">
				 我的 
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			tab:"index"
		},
		methods:{
			goHome:function(){
				 
				uni.navigateBack({
					delta:50,
				})
			},
			goCategory:function(){
				uni.navigateTo({
					url:"/pages/category/index",
				})
			},	
			goProduct:function(){
				uni.navigateTo({
					url:"/pages/product/index",
				})
			},
			goCart:function(){
				uni.navigateTo({
					url:"/pages/cart/index",
				})
			},	
			goUser:function(){
				if(wx.getStorageSync("authcode")){
					uni.navigateTo({
						url:"/pages/user/index",
					})
				}else{
					uni.navigateTo({
						url:"/pages/login/index",
					})
				}
				
			},	
		}
	}
</script>

<style>
/***mfooter***/
.mfooter-row{
	height: 120px;
}
.mfooter{
	display: flex;
	flex-direction: row;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #eee;
	height: 120px;
	align-items:center;
	z-index: 99;
}
.mfooter-item{
	flex: 1;
	text-align: center;
	text-decoration: none;
	color: #555;
	font-size: 36px;
	cursor: pointer;
	display: block;
}
.mfooter-icon{
	display: block;
	font-size: 35px;
}
.mfooter-active{
	color: #0069CD;
}
</style>
