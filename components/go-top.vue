<template>
	<div @click="goTop()" class="back-top">
		<div class="back-top-icon"></div>
		<div class="back-top-text">顶</div>
	</div>
</template>

<script>
	export default{
		methods:{
			goTop:function(){
				uni.pageScrollTo({
					scrollTop:0
				})
			}
		}
	}
</script>

<style>
</style>
