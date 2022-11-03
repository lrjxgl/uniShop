<template>
	<view v-if="pageLoad" class="bg-a">	
		<view class="header">
			<view class="header-back"></view>
			<view class="header-title">我的评论</view>
		</view>
		<view class="header-row"></view>
		<view class="main-body">
			 
			<view v-if="rscount==0">
				<view class="emptyData">暂无评论</view>
			</view>
			<view v-else>
				<view class="row-box mgb-5"  v-for="(item,index) in list" :key="index">
					<view class="cl3 bd-mp-5"><rich-text :nodes="item.content"></rich-text></view>
					<view class="flex ">
						<view class="flex-1 cl2 f12 flex-jc-center">{{item.timeago}}</view>
						<view @click="goShow(item.objectid)" class="cl-success pointer mgr-10" >查看</view>
						<view class="cl-danger pointer" @click="del(item.id)">删除</view>
					</view>
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
					url:that.app.apiHost+"/comment/my?",
					data:{
						tablename:this.tablename
					},
					success:function(res){
						that.pageLoad=true;
						that.rscount=res.data.rscount;
						that.list=res.data.list;
						that.per_page=res.data.per_page;
					}
				})
			},
			getList:function() {
				var that=this;
				if(that.per_page==0 && !that.isFirst){
					return false;
				}
				that.app.get({
					url:that.app.apiHost+"/comment/my?",
					data:{
						per_page:that.per_page,
						tablename:this.tablename
					},
					success:function(res){				
						that.rscount=res.data.rscount;
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
			setTab:function(tablename){
				this.tablename=tablename;
				isfirst=true;
				per_page=0;
				this.getList();
			},
			del:function(id){
				var that=this;
				var id=id;
				uni.showModal({
					content:"删除后不可恢复,确认删除？",
					success:function(res){
						if(res.confirm){
							that.app.get({
								url:that.app.apiHost+"/comment/delete?id="+id,
								data:{
									tablename:that.tablename
								},
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
										title:res.data.message,
									})
								}
							})
						}
						
					}
				})
			},
			goShow:function(id){
				var $m=this.tablename;
				if(this.tablename.substr(0,4)=="mod_"){
					$m=this.tablename.replace("mod_","");
				}
				uni.navigateTo({
					url:"/pages/"+$m+"/show?id="+id
				})
			}
		},
	}
	 
	 
	 
</script>

<style>
 
 
</style>
