<template>
	<view>
		<view class="footer-row"></view>
		<div class="footer">
			<div @click="goHome()" :class="tab=='home'?'footer-active':''" class="footer-item  icon-home">
				首页
			</div>
			<div @click="goArticle()" :class="tab=='article'?'footer-active':''"  class="footer-item   icon-news_light">
				资讯
			</div>
			 
			 
			<div @click="goUser()" :class="tab=='user'?'footer-active':''"  class="footer-item   icon-my_light">
				我的
			</div>
			  
		</div>
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
				uni.reLaunch({
					url:"../../pages/index/index"
				})
			},
			goArticle:function(){
				uni.reLaunch({
					url:"/pages/article/index"
				})
			},
			 
			goUser:function(){
				uni.reLaunch({
					url:"../../pages/user/index"
				})
			} 
		}
	}
</script>

<style>
	 
</style>
