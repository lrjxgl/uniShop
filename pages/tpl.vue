<template>
	<view v-if="pageLoad">
		<view>{{data}}</view>
		<view v-for="(item,key) in pageData" :key="key">{{item.title}}</view>
	</view>
</template>

<script>
	export default {
		data:function(){
			return {
				pageLoad:true,
				pageData:[],
				data:"hello world"
				
			}
		},
		onLoad:function(option){
			this.getPage();
		},
		methods: {
			getPage:function(){
				this.pageLoad=true;
				this.pageData=[
					{"id":1,"title":"第一条内容"},
					{"id":2,"title":"第二条内容"},					
				];
			}
		},
	}
</script>

<style>

</style>
