<template>
	<view>
		<form @submit="submit">
		<input type="text" name="aa" value="asdasd" />
		<my-input  name="xxx"  ></my-input>
		<button form-type="submit">提交</button>
		</form>
	</view>
</template>

<script>
	import myInput from "../components/my-input.vue";
	export default{
		
		behaviors: ['uni://form-field'],
		components:{
			myInput
		},
		data:function(){
			return {
				testValue:"ssssss"
			}
		},
		onLoad:function(){
			
		},
		methods:{
			submit:function(e){
				console.log(e.detail.value)
			}
		}
	}
</script>

<style>
</style>
