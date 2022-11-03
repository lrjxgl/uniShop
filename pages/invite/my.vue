<template>
	<view v-if="pageLoad">
		<view class="row-box flex mgb-5">
			<view>您的邀请码：</view>
			<view class="cl-red">{{pageData.invitecode}}</view>
		</view>
		<view class="row-box">
			
		    <view class="stat">
		    		<view class="stat-item">邀请 <span class="stat-n">{{pageData.rscount}}</span>人</view>
		    		<view @click="gourl('../invite_account_log/index')" class="stat-item">总收益  <span class="stat-n">{{pageData.iaccount.income}}</span> 元</view>
		    		<view class="stat-item">余额 <span class="stat-n">{{pageData.iaccount.money}}</span> </view>
		    </view>
		    <view class="f16 fwb mgb-10">邀请奖励</view>
		    <view class="con">
		    	<view class="mgb-5 cl2">1.邀请一个用户奖励1元,可以在商城购买产品</view>
		    	<view class="mgb-10 cl2">2.另外还可以获得邀请用户销售额1%的奖励</view>
		    </view>
		    <view class="f16 fwb mgb-10">邀请方法</view>
		    <view class="con">
				<view class="mgb-10 cl2">
					1.用户注册的时候填写邀请码注册
				</view>
		    	<view class="mgb-10 cl2"> 
		    		
		    		2.保存二维码 将二维码分享给朋友 
		    		<view>
		    		<image mode="widthFix" class="w300" :src="pageData.ewm"  />
					</view>
		    	</view>
		    	<view>
		    		3.在微信可以直接分享当前页面给好友
		    	</view>
		    	
		    	
		    	
		    	 
		    </view>
		</view>
		
		<view class="row-box">
			<view class="row-box-hd">邀请列表</view>
			<view class="invitelist">
				<block v-if="pageData.rscount>0">
				<view v-for="(item,index) in pageData.data" :key="index" class="invitelist-item">
					<img class="invitelist-img" :src="item.user_head+'.100x100.jpg'"  />
					<view class="invitelist-nick">{{item.nickname}}</view>
				</view>
				</block> 
				<view v-else class="emptyData">
					暂无邀请
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data:function(){
			return {
				pageLoad:false,
				pageData:""
				
			}
		},
		onLoad:function(){
			this.getPage();
		},
		methods:{
			gourl:function(url){
				uni.navigateTo({
					url:url
				})
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/invite/my?",
					success:function(res){
						that.pageData=res.data;
						that.pageLoad=true;
					}
				})
			}
		}
	}
</script>

<style>
	.stat{
		display: flex;
		flex-direction: row;
		line-height: 40px;
		margin-bottom: 10px;
		font-size: 14px;
		border-bottom: 1px solid #eee;
	}
	.stat-item{
		flex-direction: row;
		flex: 1;
		justify-content: center;
	}
	.stat-n{
		padding: 0px 3px;
		color: #f60;
		font-size: 16px;
	}
	 
	.invitelist:after{
		clear: both;
		display: block;
		content: ".";
		visibility: hidden;
		height: 0;
	}
	.invitelist-item{
		float: left;
		width: 25%;
		text-align: center;
	}
	.invitelist-img{
		width: 60px;
		display: block;
		margin: 0 auto;
	}
	.invitelist-nick{
		font-size: 12px;
		color: #444;
	}
</style>
