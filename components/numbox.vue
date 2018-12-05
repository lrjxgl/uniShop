<template>
	<view>
		<view  class="numbox">
			<view @click="minus" class="numbox-minus">-</view>
			<input class="numbox-num" v-model="num" type="text" :value="num" />
			<view @click="plus" class="numbox-plus">+</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"numbox",
		props:{
			amount:0
		},
		data:function(){
			return {
				num:this.amount 
			};
		},
		methods: {
			minus:function() {
				this.num--;
				this.$emit("donum");
			},
			plus:function(){
				this.num++;
				this.$emit("donum");
			}
		},
	}
</script>

<style>

</style>
