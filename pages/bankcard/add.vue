<template>
	<view v-if="pageLoad" class="main-body">
		<form @submit="formSubmit">
		<input type="hidden" name="id" style="display:none;" value="{$data.id}" >
			<div class="input-flex">
				<div class="input-flex-label">所属银行</div>
				<my-select :list="bankList" defaultValue="0" field="yhk_name"></my-select>
			</div>
			<div class="input-flex">
				<div class="input-flex-label">银行卡号</div>
				<input class="input-flex-text" type="text" name="yhk_haoma" id="yhk_haoma" value="" >
			</div>
			<div class="input-flex">
				<div class="input-flex-label">银行卡户名</div>
				<input class="input-flex-text" type="text" name="yhk_huming" id="yhk_huming" value="" >
			</div>
			<div class="input-flex">
				<div class="input-flex-label">开户地址</div>
				<input class="input-flex-text" type="text" name="yhk_address" id="yhk_address" value="" >
			</div>
			 
			<div class="input-flex">					
				<div class="input-flex-label">支付密码</div>					 
				<input type="password" name="paypwd" class="input-flex-text">				 
			 
			</div>
			<button form-type="submit" class="btn-row-submit js-submit">保存</button> 
		</form> 
	</view>
</template>

<script>
	import mySelect from "../../components/myselect.vue";
	export default {
		components:{
			mySelect
		},
		data: function() {
			return {
				pageLoad:false,
				data: {},
				bankList:[]
			}
		},
		onLoad: function() {
			this.getPage();
		},
		methods: {
			gourl:function(url){
				uni.navigateTo({
					url:url
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/bankcard/add?ajax=1",
					success: function(res) {
						that.pageLoad=true;
						that.bankList=res.data.bankList;
						console.log(that.bankList)
					}
				})
			},
			formSubmit:function(e){
				var that = this;
				that.app.post({
					url:that.app.apiHost + "/bankcard/save?ajax=1",
					data:e.detail.value,
					success:function(res){
						uni.showToast({
							title:res.message
						})
						if(res.error){
							return false;
						}
						
						uni.navigateBack({
							delta:1
						})
					}
				})
			}
		}
	}
</script>

<style>
</style>
