<template>
	<view>
		<view class="footer-row"></view>
		<view class="footer">
			<view class="footer-item icon-home" v-bind:class="{'footer-active':tab=='home'}" @click="goHome()">首页</view>
			<view class="footer-item icon-cascades" v-bind:class="{'footer-active':tab=='category'}" @click="goFenlei()">分类</view> 
			<view class="footer-item icon-cart" v-bind:class="{'footer-active':tab=='cart'}" @click="goCart()">购物车</view>
			<view class="footer-item icon-my_light" v-bind:class="{'footer-active':tab=='user'}"  @click="goUser()">我的</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			tab:""
		},
		data:function(){
			return {
				
			}
		},
		methods:{
			goHome:function(){
				uni.redirectTo({
					url:"../../pages/index/index"
				})
			},
			goFenlei:function(){
				uni.reLaunch({
					url:"../../pageb2c/b2c_category/index"
				})
			},
			goProduct:function(){
				uni.reLaunch({
					url:"../../pageb2c/b2c_product/index"
				})
			},
			goCart:function(){
				uni.reLaunch({
					url:"../../pageb2c/b2c_cart/index"
				})
			},
			goUser:function(){
				uni.reLaunch({
					url:"../../pageb2c/b2c_user/index"
				})
			}
		}
	}
</script>

<style>
</style>
