<template>
	<view>
		<view v-if="pageLoad">
			<form id="form" >
				<view class="none">
					<input type="hidden" name="provice_id" id="province_id" :value="pageData.data.province_id" />
					<input type="hidden" name="city_id" id="city_id" :value="pageData.data.city_id" />
					<input type="hidden" name="town_id" id="town_id" :value="pageData.data.town_id" />
					<input type="hidden" name="id" id="id" :value="pageData.data.id" >
				</view>
			
			<view class="input-flex">
				<view class="input-flex-label">省市</view>
				 
				<picker mode="region" @change="bindPickerChange" :value="index" :range="distlist">
                <view class="picker">
                    当前选择： 
                </view>
            </picker>
			</view>
			<view class="input-flex">
				<view class="input-flex-label">姓名</view>
				<input type="text" name="truename" class="input-flex-text" id="truename" :value="pageData.data.truename" >
			</view>
			<view class="input-flex">
				<view class="input-flex-label">电话</view>
				<input type="text" name="telephone" class="input-flex-text"  id="telephone" :value="pageData.data.telephone" >
			</view>	
			<view class="input-flex">
				<view class="input-flex-label">详细地址</view>
				<input type="text" class="input-flex-text" name="address" id="address" :value="pageData.data.address" >
			</view>
			
			<view id="submit" class="btn-row-submit">保存</view>
				
			</form>
		</view>
	</view>
</template>

<script>
	var app= require("../../common/common.js"); 
	import district from "../../common/district.js";
	var id;
	export default{
		data:{
			pageLoad:false, 
			pageData:{},
			district:district
		},
		onLoad:function(option){
			id=option.id;
			this.getPage();
		},
		
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=user_address&a=add&ajax=1&id="+id,
					data:{
						authcode: app.getAuthCode(),
						fromapp:app.fromapp()
					},
					success:function(data){
						that.pageLoad=true;
						that.pageData=data.data.data;
						
					}
				})
			} 
		},
	}
</script>

<style>

</style>
