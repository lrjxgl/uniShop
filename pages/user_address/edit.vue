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
					<div class="none">
						<input  type="text" name="province_id" :value="province_id"/>
						<input  type="text" name="city_id" :value="city_id"/>
						<input  type="text" name="town_id" :value="town_id"/>
					</div>
					<picker-region @callParent="setAddr" :defaultProvinceid="province_id" :defaultCityid="city_id" :defaultTownid="town_id"></picker-region>

				</view>
				<view class="input-flex">
					<div class="none">
						<input  type="text" name="lat" :value="lat"/>
						<input  type="text" name="lng" :value="lng" />
					</div>
					<view class="input-flex-label">详细地址</view>
					<input type="text" class="input-flex-text" name="address" id="address" :value="pageData.data.address">
					<div @click="choiceGps()" class="iconfont icon-location_light"></div>
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
				province_id:0,
				city_id:0,
				town_id:0,
				lat:0,
				lng:0
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
					url: that.app.apiHost + "/index.php?m=user_address&a=add&ajax=1&id=" + id,
					success: function (res) {
						that.pageLoad = true;
						that.pageData = res.data;
						that.province_id=res.data.data.province_id;
						that.city_id=res.data.data.city_id;
						that.town_id=res.data.data.town_id;
						that.lat=res.data.data.lat;
						that.lng=res.data.data.lng;
					}
				})
			},
			choiceGps:function(){
				var that=this;
				uni.chooseLocation({
					longitude:this.lng,
					latitude:this.lat,
					success: function (res) {
						that.lat=res.latitude;
						that.lng=res.longitude
						 
					}
				});
			},
			setAddr:function(e){
				var that=this;
				that.city_id=e.cityid
				that.town_id=e.townid;
				that.province_id=e.provinceid
			},
			formSubmit: function (e) {
				var that=this;
				that.app.post({
					url: that.app.apiHost + "?m=user_address&a=save",
		
					data: e.detail.value,
					success: function (res) {
						uni.showToast({
							"title":res.message
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
