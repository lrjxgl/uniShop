<template>
	<div v-if="pageLoad" class="bg-a">	
		<div class="header">
			<div class="header-back"></div>
			<div class="header-title">我的评论</div>
		</div>
		<div class="header-row"></div>
		<div class="main-body">
			<div class="tabs-border mgb-5">
				<div @click="setTab('mod_forum')" class="tabs-border-item" v-bind:class="tablename=='mod_forum'?'tabs-border-active':''">论坛</div>
				<div @click="setTab('article')" class="tabs-border-item " v-bind:class="tablename=='article'?'tabs-border-active':''">文章</div>
				
			</div>
			<div v-if="pageData.rscount==0">
				<div class="emptyData">暂无评论</div>
			</div>
			<div v-else>
				<div class="row-box mgb-5"  v-for="(item,index) in pageData.list" :key="index">
					<div class="cl3 bd-mp-5"><rich-text :nodes="item.content"></rich-text></div>
					<div class="flex ">
						<div class="flex-1 cl2 f12 flex-jc-center">{{item.timeago}}</div>
						<div @click="goShow(item.objectid)" class="cl-success pointer mgr-10" >查看</div>
						<div class="cl-danger pointer" @click="del(item.id)">删除</div>
					</div>
				</div>	
					 
			</div>
		</div>			
	</div> 
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
				tablename:"article"
			}
			
		},
		onLoad:function(ops){
			var win=uni.getSystemInfoSync();
			this.winHeight=win.windowHeight-50;
			uni.setNavigationBarTitle({
				title: '我的评论'
			});
			this.tablename=ops.tablename;
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
					url:app.apiHost+"?fromapp=wxapp&m=comment&a=my&ajax=1",
					data:{
						authcode:app.getAuthCode(),
						tablename:this.tablename
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
					url:app.apiHost+"?fromapp=wxapp&m=comment&a=my&ajax=1",data:{
						per_page:per_page,
						catid:catid,
						tablename:this.tablename,
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
							uni.request({
								url:app.apiHost+"?m=comment&a=delete&ajax=1&id="+id,
								data:{
									tablename:this.tablename,
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
