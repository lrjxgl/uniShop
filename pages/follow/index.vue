<template>
	<div class="main-body" id="App">
		<div class="tabs-border">
			<div @click="setTab('follow')" :class="tab=='follow'?'tabs-border-active':''" class="tabs-border-item ">
				关注
			</div>
			<div @click="setTab('followed')"  :class="tab=='followed'?'tabs-border-active':''" class="tabs-border-item">
				粉丝
			</div>
		</div>
		<div class="list">
			<div v-if="Object.keys(list).length==0" class="emptyData">暂无</div>
			<div v-for="(item,index) in list" :key="index" class="row-box flex mgb-5">
				<img @click="goUser(item.userid)"  class="wh-60 mgr-5" :src="item.user_head+'.100x100.jpg'" />
				<div class="flex-1">
					<div @click="goUser(item.userid)"  class="mgb-5">{{item.nickname}}</div>
					<div class="flex">
						<div class="mgr-5">关注</div>
						<div class="mgr-5 cl-num">{{item.follow_num}}</div>
						<div class="mgr-5">粉丝</div>
						<div class="cl-num">{{item.followed_num}}</div>
					</div>
				</div>
				<div>
					<div v-if="item.isfollow" @click="followtoggle(item)" class="btn-mini">取消关注</div>
					<div v-else @click="followtoggle(item)" class="btn-mini">关注</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data: function() {
			return {
				list: [],
				tab: "follow",
				isFirst:true,
				per_page:0,
				userid:0
			}
		},
		onLoad: function(ops) {
			if(ops.userid!=undefined){
				this.userid=ops.userid;
			}
			if(ops.tab!=undefined){
				this.tab=ops.tab;
			}
			this.getFollow();
		},
		methods: {
			getFollow: function() {
				var that = this;
				if(that.per_page && !that.isFirst){
					return false;
				}
				that.app.get({
					url: that.app.apiHost+"/follow/index",
					dataType: "json",
					data:{
						userid:this.userid
					},
					success: function(res) {
						that.isFirst=false;
						that.per_page=res.data.per_page;
						for(var i in res.data.list){
							that.list.push(res.data.list[i]);
						}
						
					}
				})
			},
			getFollowed: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost+"/follow/followed?ajax=1",
					dataType: "json",
					data:{
						userid:this.userid
					},
					success: function(res) {
						that.isFirst=false;
						that.per_page=res.data.per_page;
						for(var i in res.data.list){
							that.list.push(res.data.list[i]);
						}
					}
				})
			},
			setTab: function(t) {
				this.tab = t;
				this.list=[];
				this.per_page=0;
				this.isFirst=true;
				if (t == 'follow') {
					this.getFollow();
				} else {
					this.getFollowed();
				}
			},
			followtoggle: function(item) {
				var that = this;
				switch (that.tab) {
					case "follow":
						uni.showModal({
							title:"提示",
							content:"确认取消关注吗?",
							success:function(res){
								if(res.confirm){
									that.app.get({
										url: that.app.apiHost+"/follow/toggle?ajax=1",
										dataType: "json",
										data: {
											t_userid: item.userid
										},
										success: function(res) {
											var nlist = Array();
											for (var i in that.list) {
												if (that.list[i].userid != item.userid) {
													nlist.push(that.list[i]);
												}
											}
											that.list = nlist;
										}
									})
								}
							}
						})
						 
						break;
					default:
						that.app.get({
							url: that.app.apiHost+"/follow/toggle?ajax=1",
							dataType: "json",
							data: {
								t_userid: item.userid
							},
							success: function(res) {
								item.isfollow = res.follow;
	
							}
						});
						break;
				}
	
	
			},
			goUser:function(userid){
				uni.navigateTo({
					url:"../../pagesblog/sblog_home/index?userid="+userid
				})
			},
		}
	}
	
</script>

<style>
</style>
