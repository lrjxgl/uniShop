<template>
	<view>
		<view class="main-body">
			<form @submit="formSubmit">
		 
			<view class="input-flex">
				<view class="input-flex-label">手机</view>
				<input class="input-flex-text" name="telephone" v-model="telephone" placeholder="请输入手机号码">
			</view>
			<view class="input-flex">
				<view class="input-flex-label">验证码</view>
				<input type="text" class="input-flex-text" name="yzm" v-model="yzm"  >
				<view class="input-flex-btn" v-bind:class="yzmClass" @click="getYzm()">{{yzmStatus}}</view>
			</view>
			<view class="input-flex">
				<view class="input-flex-label">新密码</view>
				<input class="input-flex-text" name="password" type="text" password=true  placeholder="请填写密码">
			</view>
			 
			<view class="row-box">
				<button form-type="submit" class="btn-row-submit">确认提交</button>
				 
			</view>
			</form>
		</view>
	</view>
</template>

<script>
	 
	var yzmTimer=60,yzmTime=59,yzmEnable=true;
	export default {
		data:function(){
			return {
				pageLoad:false, 
				pageData:{},
				yzm:"",
				telephone:"",
				yzmClass:"",
				yzmStatus:"获取验证码",
			
			};
		},
		methods:{
			downTimer:function(){
				var that=this;
				var it=setInterval(function(){
					yzmEnable=false;
					that.yzmStatus="倒计时"+yzmTime+"秒";
					that.yzmClass="yzmDisable";
					yzmTime--;
					if(yzmTime==0){
						yzmTime=59;
						yzmEnable=true;
						that.yzmClass="";
						that.yzmStatus="获取验证码";
						clearInterval(it);
					}
				},1000);
			},
			getYzm:function(){
					if(!yzmEnable) return false;
					var that=this;
					that.app.get({
						url:that.app.apiHost+"/login/sendsms?ajax=1",
						data:{
							telephone:this.telephone
						},
						success:function(res){
							uni.showToast({
								title:res.message,
							})
							if(!res.error){
								that.downTimer();
							}
							
						}
					})
			},
			
			formSubmit:function(e){
				var that=this;
				that.app.post({
					url:that.app.apiHost+"/login/findpwdsave?ajax=1",
					data:e.detail.value,
					success:function(res){
						 
						uni.showToast({
							"title":res.message
						})
						if(!res.error){
							
							setTimeout(function(){
								uni.navigateBack();
							},1000);
							 
							
						}
						
					}
				})
				
			}
		},
	}
</script>

<style>

</style>
