<template> 
	<view>
	 
		<block v-for="(item,index) in fieldsList" :key="index">
	 
			<view v-if="item.fieldtype=='text'" class="input-flex">
				<view class="input-flex-label">{{item.title}}</view>
				<input class="input-flex-text" type="text" :name="'tablefield['+item.fieldname+']'" :value="item.value" />
			</view>
		 
			<view v-else-if="item.fieldtype=='textarea'" class="textarea-flex">
				<view class="textarea-flex-label">{{item.title}}</view>
				<textarea :name="'tablefield['+item.fieldname+']'" :value="item.value" class="textarea-flex-text h60"></textarea>
			</view>
		 
			<view v-else-if="item.fieldtype=='html'"  class="textarea-flex">
				<view class="textarea-flex-label">{{item.title}}</view>
				<view class="js-html-item">
					<editor :name="'tablefield['+item.fieldname+']'" :value="item.value" ></editor>
				</view>
			</view>
			
			<view v-else-if="item.fieldtype=='img'"  class="input-flex">
				<view class="input-flex-label">{{item.title}}</view>
				<view class="flex-1">
					<skyupimg :field="'tablefield['+item.fieldname+']'" :trueimgurl="item.value" :imgurl="item.value"></skyupimg>
				</view>
			</view>
		
		</block>
	</view>
</template>

<script>
	import skyupimg from "../skyupimg";
	export default{
	 
		components:{
			skyupimg
		},
		props:{
			fieldsList:[Object,Array]
		}
	}
</script>

<style>
</style>
