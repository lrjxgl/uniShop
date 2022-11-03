<template>
	<view v-if="pageLoad">
		<view v-if="unLogin" class="mgb-5">
			<un-login></un-login>
		</view>
		<view v-else>
			<view class="emptyData" v-if="Object.keys(list).length==0">暂无消息</view>
			<view v-else class="pmList">
				<view @click="goPm(item.t_userid)" class="row-box mgb-5" v-for="(item,index) in list" :key="index">
					<view class="flex flex-ai-center" v-if="item.isme">
						<image class="pm-head mgr-5" :src="item.t_user_head+'.100x100.jpg'" mode="widthFix" ></image>
						<div class="flex-1">
							<div class="flex mgb-5">
								<text v-if="item.status==0" class="badge badge-mini"></text>
								<div class="mgr-5 f12 cl3 mgr-10 ">{{item.t_nickname}} </div>

								<div class="f12 cl3">{{item.timeago}}</div>
								<div class="flex-1"></div>
								<div class="mgl-5 f12 cl3">我</div>
							</div>
							<div class="pm-r-msg">
								{{item.content}}
							</div>

						</div>
						<img class="pm-head mgl-5" :src="item.user_head+'.100x100.jpg'" />
					</view>
					<view class="flex flex-ai-center" v-else>
						<image class="pm-head mgr-5" :src="item.t_user_head+'.100x100.jpg'" mode="widthFix"></image>
						<div class="flex-1">
							<div class="flex">
								<text v-if="item.status==0" class="badge badge-mini"></text>
								<div class="mgb-5 f12 cl3">{{item.t_nickname}}</div>
								<div class="flex-1"></div>
								<div class="f12 cl3">{{item.timeago}}</div>

							</div>

							<div class="pm-l-msg">
								{{item.content}}
							</div>
						</div>


					</view>
				</view>
			</view>
		</view>
		
		<mt-footer tab="pm"></mt-footer>
	</view>
</template>

<script>
	import mtFooter from "../../components/footer.vue";
	import unLogin from "../../components/un-login.vue";
	export default {
		components: {
			mtFooter,
			unLogin
		},
		data: function() {
			return {
				pageLoad:false,
				list: [],
				t_userid: 0,
				isFirst: true,
				per_page: 0,
				unLogin: true,
				timer:0,
				pageCacheKey:"page-pm-index"
			}
		},
		onLoad: function(ops) {
			this.t_userid = ops.userid;
			 
			this.getPage();
		},
		onShow: function() {
			this.getPage();
		},
		onReachBottom: function() {
			this.getList();
		},
		 
		methods: {
			 
			 
			goPm: function(userid) {
				uni.navigateTo({
					url: "detail?userid=" + userid
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/pm/index",
					unLogin: true,
					success: function(res) {
						if (res.error == 1000) {
							that.unLogin = true;
							 
						}else{
							that.unLogin = false;
							that.list = res.data.msglist;
							uni.pageScrollTo({
								scrollTop:10000
							})
						}
						
						that.pageLoad=true;
					}
				})
			},
			getList: function() {
				var that = this;
				if (that.per_page == 0 && !that.isFirst) {
					return false;
				}
				that.app.get({
					url: that.app.apiHost + "/pm/index",
					data: {
						per_page: that.per_page
					},
					success: function(res) {
						that.per_page = res.data.per_page;
						if (that.isFirst) {
							for (var i in res.data.msglist) {
								that.list.push(res.data.msglist[i]);
							}
							that.isFirst = false;
						} else {
							that.list = res.data.msglist;
						}
						uni.pageScrollTo({
							scrollTop:10000
						})

					}
				})
			}

		}
	}
</script>

<style>
	.pm-head {
		width: 40px;
		height: 40px;
		margin-right: 5px;
	}

	.pm-l-msg,
	.pm-r-msg {

		color: #646464;
		font-size: 14px;
		padding: 5px;
		box-sizing: border-box;
		background-color: #eee;
		border-radius: 5px;
	}

	.pm-l-msg {
		margin-right: 50px;
	}

	.pm-r-msg {
		margin-left: 10px;
	}
</style>
