<template>
	<view >
		<view :style="sty" v-if="muser" class="d-userbox">
			<image @click="goHome(muser.userid)" class="d-userbox-head" :src="muser.user_head+'.100x100.jpg'"></image>
			<view class="flex-1">
				<view  @click="goHome(muser.userid)"  class="d-userbox-nick">{{muser.nickname}}</view>
				<view class="d-userbox-follows flex-ai-center">
					<view>粉丝</view>
					<text class="cl-num mgr-5 flex-center">{{muser.followed_num}}</text> 
					<view>关注</view>
					<text class="cl-num flex-center">{{muser.follow_num}}</text>
					<view class="btn-pm" @click="goPm(muser.userid)">私信</view>
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
			sty:""
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
			goPm:function(userid){
				uni.navigateTo({
					url:"../../pages/pm/detail?userid="+userid
				})
			},
			goHome:function(userid){
				uni.navigateTo({
					url:"../../pagesblog/sblog_home/index?userid="+userid
				})
			},
			followToggle:function(userid){
				var that=this;
				this.app.get({
					url:this.app.apiHost+"/follow/toggle?t_userid="+userid,
					 
					success:function(res){
						if(res.error){
							uni.showToast({
								title:res.message,
								icon:"none"
							})
							return false;
						}
						if(res.error==0){
							if(res.status==0){
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
	.btn-pm{
		padding:3px 5px;
		line-height: 1;
		border: 1px solid #F4ABA7;
		font-size: 12px;
		color: #F4ABA7;
		border-radius: 5px;
		margin-left: 10px;
	}
</style>
