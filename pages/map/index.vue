<template>
	<view>
		<web-view :src="app.apiHost"></web-view>
		<mt-footer tab="map"></mt-footer>
	</view>
</template>

<script>
	import mtFooter from "../../components/footer.vue"
	export default{
		components:{
			mtFooter
		}
	}
</script>

<style>
</style>