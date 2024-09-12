<template>
	<view>
		<view v-if="pageLoad">
			<form @submit="formSubmit">


				<view class="input-flex">
					<view class="input-flex-label">姓名</view>
					<input type="text" name="truename" class="input-flex-text" id="truename">
				</view>
				<view class="input-flex">
					<view class="input-flex-label">电话</view>
					<input type="text" name="telephone" class="input-flex-text">
				</view>
				<view class="input-flex">
					<view class="input-flex-label">省市</view>

					<picker-region :defaultProvinceid="0"></picker-region>

				</view>
				<view class="input-flex">
					<view class="input-flex-label">详细地址</view>
					<input type="text" class="input-flex-text" name="address" id="address">
				</view>

				<button form-type="submit" class="btn-row-submit">保存</button>

			</form>
		</view>
	</view>
</template>

<script>
	import pickerRegion from "../../components/pickerregion.vue";

	export default {
		components: {
			pickerRegion
		},
		data: function() {
			return {
				pageLoad: false,
				pageHide: false,
				pageData: {},
			}

		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: '收货地址添加'
			});
			this.getPage();
		},

		methods: {

			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index/user_address/add",
					unLogin:true,
					success: function(res) {
						if(res.error){
							if(res.error==1000){
								that.app.showLoginBox(true);
							}
							return false;
						}
						that.pageLoad = true;
						that.pageData = res.data;

					}
				})
			},
			formSubmit: function(e) {
				var that = this;
				that.app.post({
					url: that.app.apiHost + "/index/user_address/save",
					data: e.detail.value,
					unLogin:true,
					success: function(res) {
						if(res.error){
							if(res.error==1000){
								that.app.showLoginBox(true);
							}
							return false;
						}
						setTimeout(function() {
							uni.navigateBack()
						}, 600)

					}
				})
			}
		},
	}
</script>

<style>
</style>
