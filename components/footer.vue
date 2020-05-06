<template>
	<view>
		<view class="footer-row"></view>
		<view class="footer">
			<view @click="goHome()"  v-bind:class="{'footer-active':tab=='home'}" class="footer-item icon-home">
				 首页
				 
			</view>
			 
			
		
			<view @click="goUser()"  v-bind:class="{'footer-active':tab=='user'}" class="footer-item icon-my_light">
				 我的 
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		name:"default-footer",
		props:{
			tab:""
		},
		methods:{
			goHome:function(){
				uni.redirectTo({
					url:"../index/index"
				}) 
			},
			goArticle:function(){
				uni.navigateTo({
					url:"../article/index",
				})
			},
			goForum:function(){
				uni.navigateTo({
					url:"../forum/index",
				})
			},	
			goAdd:function(){
				uni.navigateTo({
					url:"../forum/add",
				})
			},
			goGroup:function(){
				uni.navigateTo({
					url:"../forum_group/index",
				})
			},
			goFenlei: function () {
				uni.navigateTo({
					url: "../fenlei/index"
				})
			},
			goUser:function(){
				uni.navigateTo({
					url:"../user/index",
				})
				
			},	
		}
	}
</script>

 
