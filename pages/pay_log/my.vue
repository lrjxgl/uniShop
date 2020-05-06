<template>
	<view v-if="pageLoad" >
			<view v-if="pageData.rscount==0">
				<view class="emptyData">暂无消费记录</view>
			</view>
			<view v-else>
				 
					<view  class="row-box mgb-5"  v-for="(item,index) in pageData.list" :key="index">	 
							<view class="flex mgb-5">
								<view class="cl1">{{item.timeago}}</view>
								<view class="flex-1"></view>
								<view class="cl-money">{{item.money}}元</view>
							</view>
							<view class="cl2 f12">{{item.content}}</view>
 
					</view>
		</view>		 
			 
  
	</view> 
</template>

<script> 
	var app= require("../../common/common.js"); 
 
	var per_page=0;
	var isfirst=true;
	var catid=0;
 
	export default{
	 
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},
		onLoad:function(option){

			uni.setNavigationBarTitle({
				title: '消费记录'
			});
			this.getPage();
		},
		onReachBottom:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.refresh();
		},
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=pay_log&a=my&ajax=1",
					data:{
						authcode:app.getAuthCode()
					},
					success:function(data){
						isfirst=false;
						that.pageLoad=true;
						that.pageData=data.data.data;
						per_page=data.data.data.per_page; 
					}
				})
			},
			 
			getList:function(){
				var that=this;
				if(!isfirst && per_page==0) return false;
				uni.request({
					url:app.apiHost+"?m=pay_log&a=my&ajax=1",data:{
						per_page:per_page,
						catid:catid,
						authcode:app.getAuthCode()
					},
					success:function(data){
						
						if(!data.data.error){
							if(isfirst){
								that.pageData.list=data.data.data.list;
								isfirst=false;
							}else{
								
								that.pageData.list=app.json_add(that.pageData.list,data.data.data.list);
							}
							per_page=data.data.data.per_page;  
							
						}
						
						
					}
				})
			},
			 
			refresh:function(){
				this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
			loadMore:function(){
				this.getList();
			}
		},
	}
</script>

<style>
 
 
</style>
