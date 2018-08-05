<template>
	<view v-if="pageLoad" class="bg-a">	
		<view v-if="pageData.rscount==0">
			<view class="emptyData">暂无评论</view>
		</view>
		<view v-else>
					<view  class="row-box"  v-for="(item,index) in pageData.list" :key="index">	
							<view class="row-box-hd">
								<view class="cor1">{{item.timeago}}</view>
								<view class="flex-1"></view>
								<view class="btn-small btn-outline-warning" @click="del(item.id)">删除</view>
							</view>
							<rich-text :nodes="item.content"></rich-text>						 
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
		 
		data:{
			pageLoad:false, 
			pageData:{}
			 
		},
		onLoad:function(option){
			var win=uni.getSystemInfoSync();
			this.winHeight=win.windowHeight-50;
			uni.setNavigationBarTitle({
				title: '我的评论'
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
					url:app.apiHost+"?m=comment&a=my&ajax=1",
					data:{
						authcode:app.getAuthCode()
					},
					success:function(data){
						isfirst=false;
						
						that.pageData=data.data.data;
						that.pageLoad=true;
						per_page=data.data.data.per_page; 
					}
				})
			},
			 
			getList:function(){
				var that=this;
				if(!isfirst && per_page==0) return false;
				uni.request({
					url:app.apiHost+"?m=comment&a=my&ajax=1",data:{
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
			},
			del:function(id){
				var that=this;
				var id=id;
				uni.showModal({
					content:"删除后不可恢复,确认删除？",
					success:function(res){
						if(res.confirm){
							uni.request({
								url:app.apiHost+"?m=comment&a=delete&ajax=1&id="+id,
								data:{
									fromapp:app.fromapp(),
									authcode:app.getAuthCode()
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
						
					}
				})
			}	
		},
	}
</script>

<style>
 
 
</style>
