<template>
	<view class="regBg">
		<view class="regBox" v-if="pageLoad">
			<form    @submit="formSubmit">
			<view class="input-flex">
				<view class="input-flex-label">手机</view>
				<input class="input-flex-text" name="telephone" v-model="telephone" type="text"   placeholder="请填手机号码">
			</view>	
			
			<view class="input-flex">
				<view class="input-flex-label">验证码</view>
				<input type="text" class="input-flex-text" name="yzm" v-model="yzm"  >
				<view class="input-flex-btn" v-bind:class="yzmClass" @click="getYzm()">{{yzmStatus}}</view>
			</view>
			
			<view class="input-flex">
				<view class="input-flex-label">昵称</view>
				 <input class="input-flex-text" name="nickname" type="text" placeholder="请填写昵称">
			</view>
			
			<view class="input-flex">
				<view class="input-flex-label">密码</view>
				<input class="input-flex-text" name="password" type="text" password=true  placeholder="请填写密码">
			</view>
			
			 
			
			<button type="primary" form-type="submit" class="btn-row-submit btn-success">立即注册</button>
		   
			</form>
		</view>
	</view>
</template>

<script>
	 
	var yzmTimer=60,yzmTime=59,yzmEnable=true;
	export default{
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
		onLoad:function(option){
			this.pageLoad=true;
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
						url:that.app.apiHost+"/register/SendSms?ajax=1",
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
				e.detail.value.password2=e.detail.value.password;
				that.app.post({
					url:that.app.apiHost+"/register/regsave?ajax=1",
					data:e.detail.value,
					success:function(res){						 
						if(res.error){
							uni.showToast({
								"title":res.message
							})
						}else{
							uni.setStorageSync("token",res.data.token);
							uni.setStorageSync("refresh_token",res.data.refresh_token);
							that.app.goHome();
						}
						
					}
				})
				
			}
		},
	}
</script>

<style>
	.yzmDisable{
		background-color: #eee;
		color: #999;
	}
	.regBox{
		position: absolute;
		top: 50%;
		left: 30upx;
		right: 30upx;
		margin-top: -390upx;
		padding:30upx 20upx;
		background-color: #fff; 
		border-radius: 20upx;
	}
	.regBg{
		background: linear-gradient( #29cee8,#619ad6);
		position: absolute;
		top: 0upx;
		bottom: 0upx;
		left: 0upx;
		right: 0upx;
	}
</style>
