<template>
	<view>
		<view class="footer-row"></view>
		<view class="footer">
			<view @click="goHome()" class="footer-item footer-active icon-home">
				 首页
				 
			</view>
			<view @click="goForum()" class="footer-item icon-news">
				福鼎论坛
			</view>
			<view @click="goAdd()" class="footer-item footer-add">
			 
				发布帖子
			</view>
			<view @click="goFenlei()" class="footer-item icon-activity">
				分类服务
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

 
