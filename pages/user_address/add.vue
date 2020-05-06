<template>
	<view>
		<view v-if="pageLoad">
			<form @submit="formSubmit">
		 
			  
			  <view class="input-flex">
				<view class="input-flex-label">姓名</view>
				<input type="text" name="truename" class="input-flex-text" id="truename"  >
			  </view>
			  <view class="input-flex">
				<view class="input-flex-label">电话</view>
				<input type="text" name="telephone" class="input-flex-text"  >
			  </view>	
				<view class="input-flex">
					<view class="input-flex-label">省市</view>
					<view class="none">
						<input type="text" name="province_id" :value="provinceid" />
						<input type="text" name="city_id" :value="cityid" />
						<input type="text" name="town_id" :value="townid" />
					</view>
					<picker-region class="flex-1" @callParent="callRegion" :defaultProvinceid="0"></picker-region>
				
				</view>
			  <view class="input-flex">
				<view class="input-flex-label">详细地址</view>
				 <input type="text" class="input-flex-text" name="address" id="address" >
			  </view>
			  
			  <button form-type="submit" class="btn-row-submit">保存</button>
				
			</form>
		</view>
	</view>
</template>

<script>
	
	import pickerRegion from "../../components/pickerregion.vue";
 
	export default{
		components:{
			pickerRegion
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
				provinceid:0,
				cityid:0,
				townid:0
			}
			
		},
		onLoad:function(option){
			uni.setNavigationBarTitle({
				title: '收货地址添加'
			}); 
			this.getPage();
		},
		 
		methods:{
			callRegion:function(e){
				this.provinceid=e.provinceid;
				this.cityid=e.cityid;
				this.townid=e.townid;
			},
			getPage:function(){
				var that=this;
				uni.request({
					url:that.app.apiHost+"?m=user_address&ajax=1&a=add",
					data:{
						authcode: that.app.getAuthCode(),
						fromapp:that.app.fromapp()
					},
					success:function(data){
						that.pageLoad=true;
						that.pageData=data.data.data;
						 
					}
				})
			},
			 		formSubmit: function (e) {
			 			var that=this;				
			 			uni.request({
			 				url: that.app.apiHost + "?m=user_address&a=save&ajax=1&fromapp=" + that.app.fromapp() + "&authcode=" + that.app.getAuthCode(),
			 				method: "POST",
			 				header: {
			 					"content-type": "application/x-www-form-urlencoded"
			 				},
			 				data: e.detail.value,
			 				success: function (res) {
			 					uni.showToast({
			 						"title":res.data.message
			 					})
			 					if(!res.data.error){
			 						setTimeout(function(){
			 							uni.navigateBack()
			 						},600)
			 						
			 					}
			 
			 				}
			 			})
			 		}
		},
	}
</script>

<style>
</style>
