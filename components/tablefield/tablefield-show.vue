<template>
	<view>
		<view class="row-box mgb-5">
			<block v-for="(item,index) in fieldsList" :key="index">
			 
			<view v-if="item.fieldtype=='text'" class="flex bd-mp-10 flex-ai-center">
				<view class="w100">{{item.title}}</view>
				<view class="flex-1">{{item.value}}</view>					
			</view>
			 
			<view v-if="item.fieldtype=='textarea'" class="flex bd-mp-10 flex-ai-center">
				<view class="w100">{{item.title}}</view>
				<view class="flex-1">
					{{item.value}}
				</view>					
			</view>
			 
			<view v-if="item.fieldtype=='html'" class="flex bd-mp-10 flex-ai-center">
				<view class="w100">{{item.title}}</view>
				<view class="flex-1 d-content">
					{{item.value}}
				</view>					
			</view>
		 
			<view v-if="item.fieldtype=='img'" class="flex bd-mp-10 flex-ai-center">
				<view class="w100">{{item.title}}</view>
				<view class="flex-1">
					<image :src="item.value" class="wmax" mode="widthFix"></image>
				</view>					
			</view>
	 
			<view v-if="item.fieldtype=='map'" class="flex bd-mp-10 flex-ai-center">
				<view class="w100">{{item.title}}</view>
				<view class="flex-1 flex">
					<image  :src="'http://api.map.baidu.com/staticimage/v2?ak='+BDMAPKEY+'&mcode=666666&center='+item.value+'&markers='+item.value+'&width=300&height=200&zoom=11'" class="wmax" ></image>
				</view>					
			</view>
		 
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			fieldsList:Object
		},
		data:function(){
			return {
				BDMAPKEY:"asd"
			}
		}, 
		created:function(){
			console.log(this.fieldsList)
		}
	}
</script>

<style>
</style>
