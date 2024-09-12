<template>
	<view>
		<div>
			<div class="input-flex">
				<label class="input-flex-label">手机</label>
				<input class="input-flex-text" v-model="telephone" name="telephone" id="telephone" />
				
			</div>
			<div class="input-flex">
				<label class="input-flex-label">验证码</label>
				<input class="input-flex-text" type="text" v-model="yzm" />
				<div class="input-flex-btn" @click="getSms()">获取</div>
			</div>
			
			<div class="btn-row-submit" @click="submit()">
				确定修改
			</div>
		</div>
	</view>
	
</template>

<script>
	export default{
		data(){
			return {
				user:{},
				telephone:"",
				yzm:""
			}
			
		},
		onLoad(){
			this.getPage()
		},
		methods:{
			getPage(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/user/bindmobile",
					success:function(res){
						that.user=res.data.user;
						that.telephone=that.user.telephone;
					}
				})
			},
			getSms(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/user/bindmobile?op=send",
					data:{
						telephone:that.telephone
					},
					success:function(res){
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				})
			},
			submit(){
				var that=this;
				that.app.post({
					url:that.app.apiHost+"/index/user/bindmobile?op=save",
					data:{
						telephone:that.telephone,
						yzm:that.yzm
					},
					success:function(res){
						uni.showToast({
							title:res.message,
							icon:"none"
						})
						if(res.error){
							return false;
						}
						setTimeout(function(){
							uni.navigateBack()
						},1000)
					}
				})
			}
		}
	}
</script>

<style>
</style>