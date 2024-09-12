<template>
	<view>
		<view v-if="pageLoad">
			<form @submit="formSubmit">
				<input class="none" type="text" name="id" :value="pageData.data.id" />


				<view class="input-flex">
					<view class="input-flex-label">姓名</view>
					<input type="text" name="truename" class="input-flex-text" id="truename" :value="pageData.data.truename">
				</view>
				<view class="input-flex">
					<view class="input-flex-label">电话</view>
					<input type="text" name="telephone" class="input-flex-text" id="telephone" :value="pageData.data.telephone">
				</view>
				<view class="input-flex">
					<view class="input-flex-label">省市</view>
 
					<picker-region :defaultProvinceid="pageData.data.province_id" :defaultCityid="pageData.data.city_id" :defaultTownid="pageData.data.town_id"></picker-region>

				</view>
				<view class="input-flex">
					<view class="input-flex-label">详细地址</view>
					<input type="text" class="input-flex-text" name="address" id="address" :value="pageData.data.address">
				</view>

				<button form-type="submit" class="btn-row-submit">保存</button>

			</form>
		</view>
	</view>
</template>

<script>
	 
	import pickerRegion from "../../components/pickerregion.vue";
	var id; 
	export default {
		components: {
			pickerRegion
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},
		onLoad: function (option) {
			uni.setNavigationBarTitle({
				title: '收货地址编辑'
			});
			id=option.id; 
			this.getPage();
		},

		methods: {
			getPage: function () {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index/user_address/add?id=" + id,
					success: function (res) {
						that.pageLoad = true;
						that.pageData = res.data;

					}
				})
			},
			formSubmit: function (e) {
				var that=this;
				that.app.post({
					url: that.app.apiHost + "/index/user_address/save",
		
					data: e.detail.value,
					success: function (res) {
						uni.showToast({
							"title":res.message,
							icon:"none"
						})
						if(!res.error){
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
