<template>
	<view v-if="pageLoad">

		<view v-if="rscount==0">
			<view class="emptyData">暂无记录</view>
		</view>
		<view v-else>
			<view class="row-box mgb-5" v-for="(item,index) in list" :key="index">
				<view class="flex mgb-5">
					<view class="cl-num mgr-10">{{item.status_name}}</view>
					<view class="cl-money">￥{{item.money}}</view>
					<view class="flex-1"></view>
					<view class="time cl2">{{item.orderno}}</view>
				</view>
				<view class="flex mgb-10">
					<view class="cl3 mgr-10">{{item.timeago}}</view>
					<view class="cl2">{{item.pay_type_name}}</view>

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
				list:[],
				per_page:0,
				isFirst:true,
				rscount:0
			}
		},
		onLoad:function(){
			this.getPage();
		},
		onReachBottom:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.getPage();
			uni.stopPullDownRefresh();
		},
		onShareAppMessage:function(){
			
		},
		onShareTimeline:function(){
			
		},
		methods: {
			gourl:function(url){
				uni.navigateTo({
					url:url
				})
			},
			getPage:function() {
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/recharge/my?",
					success:function(res){
						that.pageLoad=true;
						that.list=res.data.list;
						that.per_page=res.data.per_page;
						that.rscount=res.data.rscount;
					}
				})
			},
			getList:function() {
				var that=this;
				if(that.per_page==0 && !that.isFirst){
					return false;
				}
				that.app.get({
					url:that.app.apiHost+"/recharge/my?",
					data:{
						per_page:that.per_page
					},
					success:function(res){						 
						that.per_page=res.data.per_page;
						that.rscount=res.data.rscount;
						if(that.isFirst){
							that.list=res.data.list;
							that.isFirst=false;
						}else{
							for(var i in res.data.list){
								that.list.push(res.data.list[i]);
							}							
						}
						
					}
				})
			}
		},
	}
</script>

<style>


</style>
