<template>
	<div>
		<div class="footer-row"></div>
		<div class="footer">
			<div class="footer-item icon-home" v-bind:class="{'footer-active':tab=='home'}" @click="goHome()">首页</div>
			<div class="footer-item icon-cascades" v-bind:class="{'footer-active':tab=='category'}" @click="goFenlei()">分类</div>
			<div class="footer-item icon-goods" v-bind:class="{'footer-active':tab=='product'}" @click="goProduct()">点餐</div>
			<div class="footer-item icon-cart" v-bind:class="{'footer-active':tab=='cart'}" @click="goCart()">购物车</div>
			<div class="footer-item icon-my_light" v-bind:class="{'footer-active':tab=='user'}"  @click="goUser()">我的</div>
		</div>
	</div>
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
					url:"../b2c/index"
				})
			},
			goFenlei:function(){
				uni.redirectTo({
					url:"../b2c_category/index"
				})
			},
			goProduct:function(){
				uni.redirectTo({
					url:"../b2c_product/index"
				})
			},
			goCart:function(){
				uni.redirectTo({
					url:"../b2c_cart/index"
				})
			},
			goUser:function(){
				uni.redirectTo({
					url:"../b2c_user/index"
				})
			}
		}
	}
</script>

<style>
</style>
