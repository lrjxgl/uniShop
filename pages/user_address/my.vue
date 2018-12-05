<template>
	<view>
			<view class="fixBt" @click="goAdd()">添加</view>
			<view v-if="pageData.rscount==0">
				<view class="emptyData">暂无地址
					
				</view>
				
			</view>
			<view v-else>
				<view class="row-box mgb-10" v-for="(item,index) in pageData.list" :key="index">
					<view class="flex-table">
							<view class="flex-table-label">姓名</view>
							<view class="flex-table-box">{{item.truename}}</view>
					</view>
					<view class="flex-table">
	
						<view class="flex-table-label">手机 </view>
						<view class="flex-table-box">{{item.telephone}} </view>
					</view>
					<view class="flex-table">
	
						<view class="flex-table-label">地址 </view>
						<view class="flex-table-box">{{item.pct_address}} </view>
					</view>
	
					<view class="pd-10 flex flex-center">
						 
							<view class="btn-small btn-outline-primary mgr-10" @click="goEdit(item.id)">编辑</view> 
							<view class="btn-small btn-outline-danger" @click="del(item.id)">删除</view>
						 
					</view>
				</view>
			</view>	
	</view> 
</template>

<script> 
	 
 
	var per_page=0;
	var isfirst=true;
 
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
				title: '收货地址'
			});
			this.getPage();
		},
		onShow:function(){
			if(this.pageHide){
				this.getPage();
			}
		},
		onHide:function(){
			this.pageHide=true;
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
					url:that.app.apiHost+"?m=user_address&a=my&ajax=1",
					data:{
						fromapp:that.app.fromapp(),
						authcode:that.app.getAuthCode()
					},
					success:function(data){
						isfirst=false;
						that.pageData=data.data.data;
						per_page=data.data.data.per_page; 
					}
				})
			},
		 
			getList:function(){
				var that=this;
				if(!isfirst && per_page==0) return false;
				uni.request({
					url:that.app.apiHost+"?m=user_address&a=my&ajax=1",
					data:{
						per_page:per_page,
						fromapp:that.app.fromapp(),
						authcode:that.app.getAuthCode()
					},
					success:function(data){
						
						if(!data.data.error){
							if(isfirst){
								that.pageData.list=data.data.data.list;
								isfirst=false;
							}else{
								
								that.pageData.list=that.app.json_add(that.pageData.list,data.data.data.list);
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
			},
			goAdd:function(){
				uni.navigateTo({
					url:'../user_address/add',
				})
			},
			goEdit:function(id){
				uni.navigateTo({
					url:"../user_address/edit?id="+id,
				})
			},
			del:function(id){
				var that=this;
				var id=id;
				uni.showModal({
					content:"删除后不可恢复,确认删除？",
					success:function(ops){
							console.log(ops)
					}
				})
				uni.request({
					url:that.app.apiHost+"?m=user_address&a=delete&ajax=1&id="+id,
					data:{
						fromapp:that.app.fromapp(),
						authcode:that.app.getAuthCode()
					},
					success:function(res){
						if(!res.data.error){
								var list=that.pageData.list;
								var newlist=[];
								for(var i in list){
									if(list[i].id!=id){
										newlist.push(list[i]);
									}
									
								}
		
								that.pageData.list=newlist;
						}
						uni.showToast({
							title:res.data.message,
						})
					}
				})
			}
		},
	}
</script>

<style>
 .fixBt{
	 position: fixed;
	 width: 120upx;
	 height: 120upx;
	 text-align: center;
	 line-height: 120upx;
	 border-radius: 50%;
	 background-color: #007AFF;
	 color: #fff;
	 right: 5upx;
	 bottom: 10upx;
 }
</style>
