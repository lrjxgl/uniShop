<template>
	<view>
		<view v-if="user" class="d-userbox">
			<image class="d-userbox-head" :src="user.user_head+'.100x100.jpg'"></image>
			<view class="flex-1">
				<view class="d-userbox-nick">{{user.nickname}}</view>
				<view class="d-userbox-follows">
					粉丝
					<text class="cl-num mgr-5 flex-center">{{user.followed_num}}</text> 
					关注
					<text class="cl-num flex-center">{{user.follow_num}}</text>
				</view>
			</view>
			<view class="btn-small btn-outline-success">关注</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			user:false
		},
	}
</script>

<style>

</style>
