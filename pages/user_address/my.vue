<template>
	<view>
			<view class="fixBt" @click="goAdd()">添加</view>
			<view v-if="rscount==0">
				<view class="emptyData">暂无地址
					
				</view>
				
			</view>
			<view v-else>
				<view class="row-box mgb-10" v-for="(item,index) in  list" :key="index">
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
				that.app.get({
					url:that.app.apiHost+"/user_address/my?ajax=1",
					success:function(res){
						that.pageLoad=true;
						that.rscount=res.data.rscount;
						that.list=res.data.list;
						that.per_page=res.data.per_page;
						that.isFirst=false;
					}
				})
			},
		 
			getList:function() {
				var that=this;
				if(that.per_page==0 && !that.isFirst){
					return false;
				}
				that.app.get({
					url:that.app.apiHost+"/user_address/my?",
					data:{
						per_page:that.per_page
					},
					success:function(res){						 
						that.per_page=res.data.per_page;
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
					success:function(e){
							if(e.confirm){
								that.app.get({
									url:that.app.apiHost+"/user_address/delete?id="+id,
									success:function(res){
										if(!res.error){
												var list=that.list;
												var newlist=[];
												for(var i in list){
													if(list[i].id!=id){
														newlist.push(list[i]);
													}
													
												}
										
												that.list=newlist;
										}
										uni.showToast({
											title:res.message,
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
