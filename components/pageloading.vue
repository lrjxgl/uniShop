<template>
	<view >
		<view class="pageLoading iconfont icon-loading"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.pageLoading{
		position: fixed;
		top: 120upx;
		left: 50%;
		margin-left: -60upx;
		 
		justify-content: center;
		text-align: center;
		width: 120upx;
		height: 120upx;
		line-height: 120upx;
		font-size: 60upx;
		animation: roundLoading 0.8s linear infinite;
		color: #666;
	}
	@keyframes roundLoading{
		0%{-webkit-transform:rotate(0deg);}
 
		25%{-webkit-transform:rotate(90deg);}
 
		50%{-webkit-transform:rotate(180deg);}
 
		75%{-webkit-transform:rotate(270deg);}
 
		100%{-webkit-transform:rotate(360deg);}
	}
</style>
