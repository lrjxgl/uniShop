<template>
	<view>
		<view v-if="pageLoad">
			<form id="form" >
			  <input type="hidden" name="id" id="id" :value="pageData.data.id" >
			  <div class="input-flex">
				<div class="label">省市</div>
				<input type="hidden" name="provice_id" id="province_id" value="{$data.province_id}" />
				<input type="hidden" name="city_id" id="city_id" value="{$data.city_id}" />
				<input type="hidden" name="town_id" id="town_id" value="{$data.town_id}" />
				<input type="text" placeholder="请选择地区" class="text" id="choice-district"   />
			  </div>
			  <div class="input-flex">
				<div class="label">姓名</div>
				<input type='text' name='truename' class="text" id='truename' value='{$data.truename}' >
			  </div>
			  <div class="input-flex">
				<div class="label">电话</div>
				<input type='text' name='telephone' class="text"  id='telephone' value='{$data.telephone}' >
			  </div>	
			  <div class="input-flex">
				<div class="label">详细地址</div>
				 <input type='text' class="text" name='address' id='address' value='{$data.address}' >
			  </div>
			  
			   <div id="submit" class="btn-row-submit">保存</div>
				
			</form>
		</view>
	</view>
</template>

<script>
	var app= require("../../common/common.js"); 
	var id;
	export default{
		data:{
			pageLoad:false, 
			pageData:{}
		},
		onLoad:function(option){
			id=option.id;
			this.getPage();
		},
		 
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=article&ajax=1&a=show&id="+id,
					data:{
						authcode: app.getAuthCode()
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
