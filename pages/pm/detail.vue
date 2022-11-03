<template>
	<view id="main">
		<view @click="getPage" class="fixNotice" v-if="hasNew>0">你有{{hasNew}}条新消息</view>
		<view v-if="Object.keys(list).length==0" class="emptyData">暂无私信</view>
		<view class="pmList">
			<view class="row-box mgb-5" v-for="(item,index) in list" :key="index">
				<view class="flex flex-ai-center" v-if="item.isme">
					<div class="flex-1">
						<div class="flex">
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
					<img class="pm-head mgr-5" :src="item.t_user_head+'.100x100.jpg'" />
					<div class="flex-1">
						<div class="flex mgb-5">
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
		<view class="ftBox-row"></view>
		<view class="ftBox">
			<input v-model="content" type="text" class="ftBox-text" />
			<view @click="sendPm" class="ftBox-btn">发布</view>
		</view>
	</view>
</template>

<script>
	 
	var inAjax=false;
	var windowHeight=0;
	export default{
		data:function(){
			return {
				list:[],
				t_userid:0,
				content:"",
				maxid:0,
				hasNew:0,
				per_page:0,
				isFirst:true,
				sch: 0,
				oldsch: 0,
				scrollTop: 10000,
				time:0,
				timer:0
			}
		},
		onLoad:function(ops){
			var that=this;
			var sys=uni.getSystemInfoSync()
			windowHeight=sys.windowHeight;
			this.t_userid=ops.userid;
			this.getPage();
			
		},
		onUnload:function(){
			clearInterval(this.timer);
			this.timer=0;
			console.log("close timer");
		},
		onHide:function(){
			clearInterval(this.timer);
			this.timer=0;
			console.log("close timer");
		},
		onShow:function(){
			this.setTimer();
		},
		onPageScroll:function(e){
			if(e.scrollTop==0 && !inAjax){
				this.getList();
				inAjax=true;
				setTimeout(function(){
					inAjax=false;
				},2000);
			}
		},
		methods:{
			scrollY: function(e) {
				this.sch = e.detail.scrollHeight;
			},
			scTop: function(e) {
				if (this.oldsch == 0) {
					this.oldsch = this.sch;
				}
			
				var that = this;
				that.scrollTop = 0;
				this.getList();
			},
			setTimer:function(){
				var that=this;
				if(this.timer>0){
					clearInterval(this.timer);
				}
				this.timer=setInterval(function(){
					that.getNew()
				},10000)
			},
			getNew:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/pm/getnew?ajax=1",
					data:{
						t_userid:that.t_userid
					},
					success:function(res){
						that.hasNew=res.data;
						
					}
				})
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/pm/detail?ajax=1",
					data:{
						t_userid:that.t_userid
					},
					success:function(res){
						that.setTimer();
						that.isFirst=false;
						that.hasNew=0;
						that.list=res.data.pmlist;
						that.per_page=res.data.per_page;
						uni.setNavigationBarTitle({
							title:res.data.t_nickname
						})
						var it=setTimeout(function(){
							const query = uni.createSelectorQuery().in(that);
							query.select('#main').boundingClientRect(function(res) {				  
								that.oldsch=res.height;
							}).exec();
							uni.pageScrollTo({
								scrollTop:that.scrollTop+10,
								duration:1
							})
							
						},30)
					}
				})
			},
			getList:function(){
				var that=this;
				if(that.per_page==0 && !that.isFirst){
					return false;
				}
				that.app.get({
					url:that.app.apiHost+"/pm/detail?ajax=1",
					data:{
						t_userid:that.t_userid,
						per_page:that.per_page
					},
					success:function(res){
						that.setTimer();
						that.hasNew=0;
						that.per_page=res.data.per_page;
						var list = that.list;
						for (var i in res.data.pmlist) {
							list.unshift(res.data.pmlist[i]);
						}						
						that.list =list;
						setTimeout(function() {
							that.scrollTop += 10;
						}, 100)
						setTimeout(function(){
							const query = uni.createSelectorQuery().in(that);
							 query.select('#main').boundingClientRect(res => {
								if(that.oldsch==0){
									uni.pageScrollTo({
										scrollTop:100000,
										duration:1
									})
								}else{
									var st=res.height-that.oldsch-windowHeight+160;
									uni.pageScrollTo({
										scrollTop:st,
										duration:1
									})
								}
								that.oldsch=res.height;
							}).exec();
						},10)
					}
				})
			},
			sendPm:function(){
				var that=this;
				that.app.post({
					url:that.app.apiHost+"/pm/sendSave?ajax=1",
					data:{
						t_userid:that.t_userid,
						content:that.content
					},
					success:function(res){
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						that.content='';
						that.getPage();
					}
				})
			}
		}
	}
</script>

<style>
	.fixNotice{
		position: fixed;
		opacity: 0.8;
		top: 44px;
		left: 0;
		right: 0;
		background-color: #fff;
		padding: 6px;
		color: #f00;
		text-align: center;
	}
	.pm-head{
		width:40px;
		height: 40px;
		margin-right: 5px;
	}
	.pm-l-msg,.pm-r-msg{
		
		color: #646464;
		font-size: 14px;
		padding: 10px 5px;
		box-sizing: border-box;
		background-color: #eee;
		border-radius: 5px;
	}
	.pm-l-msg{
		margin-right:50px;
	}
	.pm-r-msg{
		margin-left:50px;
		text-align: right;
	}
	.ftBox{
		display: flex;
		flex-direction: row;
		position: fixed;
		bottom:0;
		left:0;
		right: 0;
		background-color: #fff;
		padding: 5px;
	}
	.ftBox-text{
		box-sizing: border-box;
		height: 36px;
		line-height: 36px;
		border: 1px solid #eee;
		flex:1;
		padding: 5px;
		color: #323232;
		font-size: 14px;
	}
	.ftBox-btn{
		box-sizing: border-box;
		height: 36px;
		line-height: 36px;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		background-color: #15ABA5;
		color: #fff;
		padding: 0px 10px;
	}
	.ftBox-row{
		height: 44px;
	}
</style>
