<template>
	<view>
		<view v-if="muser" class="d-userbox">
			<image class="d-userbox-head" :src="muser.user_head+'.100x100.jpg'"></image>
			<view class="flex-1">
				<view class="d-userbox-nick">{{muser.nickname}}</view>
				<view class="d-userbox-follows flex-ai-center">
					<view>粉丝</view>
					<text class="cl-num mgr-5 flex-center">{{muser.followed_num}}</text> 
					<view>关注</view>
					<text class="cl-num flex-center">{{muser.follow_num}}</text>
					<view class="cl3 f12  mgl-10" v-if="timeago">{{timeago}}</view>
				</view>
			</view>
			<view class="btn-small btn-outline-success" @click="followToggle(muser.userid)">{{followStr}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			user:false,
			timeago:"",
		},
		data:function(){
			return {
				muser:{},
				
				followStr:"已关注"
			}
		},
		created:function(){
			this.muser=this.user;
			if(!this.user.isFollow){
				this.followStr="关注";
			}
		},
		methods:{
			followToggle:function(userid){
				var that=this;
				uni.request({
					url:this.app.apiHost+"/index.php?m=follow&a=toggle&ajax=1&t_userid="+userid,
					data:{
						authcode:this.app.getAuthCode(),
						fromapp:this.app.fromapp()
					},
					success:function(res){
						if(res.data.error==0){
							if(res.data.status==0){
								that.followStr="关注";
							}else{
								that.followStr="已关注";
							}
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
