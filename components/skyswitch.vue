<template>
	<view>
		<view class="switch-group" style="width: 80px;">
			<input type="text" :name="field" class="switch-value none" :value="avalue" />
			<view  @click="set(0)" class="switch-left" :class="{'switch-active':avalue==list[0].key}" >{{list[0].value}}</view>
			<view  @click="set(1)" class="switch-right" :class="{'switch-active':avalue==list[1].key}">{{list[1].value}}</view>
			 
		</view>
	</view>
</template>

<script>
	export default{
		 
		props:{
			value:"",
			field:"",
			list:{}
		},
		data:function(){
			return {
				avalue:""
			}
		},
		created:function(){
			this.avalue=this.value;
		},
		methods: {
			set:function(index) {
				if(index==0){
					this.avalue=this.list[1].key;
				}else{
					this.avalue=this.list[0].key;
				}
			}
		},
	}
</script>

<style>
</style>
