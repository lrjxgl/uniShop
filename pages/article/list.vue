<template>
	<view >
		<view class="header">
			<view class="header-back"></view>
			<view class="header-title">文章</view>
		</view>
		<view class="header-row"></view>
		<view class="main-body" v-if="pageLoad">
			<scroll-view class="bg-fff" scroll-x="true">
				<view class="tabs-border">
					<view @click="setCat(0)" class="tabs-border-item-inner tabs-border-active">全部</view>
					<view class="tabs-border-item-inner" v-for="(item,key) in pageData.catlist" :key="key" @click="setCat(item.catid)"  >{{item.cname}}</view>				 
				</view>	
			</scroll-view>
			<view class="sglist">
				<view class="sglist-item" v-for="(item,key) in pageData.list" :key="key" @click="goArticle(item.id)">
					<view v-if="item.imgurl" class="sglist-imgbox">
						<image class="sglist-img" mode="widthFix" :src="item.imgurl+'.middle.jpg'"></image>
					</view>
					 				 
					<view class="sglist-title">{{item.title}}</view>
 
					<view class="sglist-desc">
						{{item.description}}
					</view>
					<view class="flex flex-jc-bettwen pd-10">
						 
						<view class="btn-love btn-love-small mgr-5">{{item.love_num}}</view>
						<view class="btn-fav btn-fav-small mgr-5">{{item.fav_num}}</view>
						<view class="btn-comment btn-comment-small">{{item.comment_num}}</view>
					</view>	
									 
				</view>
				 
				 
			</view>
		</view>
		
	</view>
</template>

<script> 
	var app= require("../../common/common.js"); 
	var per_page=0;
	var isfirst=true;
	var catid=0;
	var activeClass="tabs-border-active"; 
	export default{
	
		data:function(){
			return {
				defaultActive:"tabs-border-active",
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},
		onLoad:function(option){
		 
			catid=option.catid;
			uni.setNavigationBarTitle({
				title: '资讯'
			});
			this.getPage();
		},
		 
		onShow:function(){
			if(this.pageHide){
				this.pageHide=false;
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
					url:app.apiHost+"?fromapp=wxapp&m=article&ajax=1",
					data:{
					 
						catid:catid,
						authcode:app.getAuthCode()
					},
					success:function(res){
						//登录
						if(res.data.error==1000){
							uni.navigateTo({
								url:"/pages/login/index",
							})
						}else{
							isfirst=false;
							that.pageLoad=true;
							that.pageData=res.data.data;
							per_page=res.data.data.per_page;
						}
						 
					}
				})
			},
			setCat:function(cid){
				catid=cid;
				isfirst=true;
				per_page=0;
				if(catid==0){
					this.defaultActive=activeClass;
				}else{
					this.defaultActive="";
				}
				var catlist=this.pageData.catlist;
				for(var i in catlist){
					if(catlist[i].catid==catid){
						catlist[i].isactive=1;
					}else{
						catlist[i].isactive=0;
					}
				}
				this.pageData.catlist=catlist;
				this.getList();
			 },
			getList:function(){
				var that=this;
				if(!isfirst && per_page==0) return false;
				uni.request({
					url:app.apiHost+"?fromapp=wxapp&m=article&ajax=1",data:{
						per_page:per_page,
						catid:catid,
						authcode:app.getAuthCode()
					},
					success:function(res){
						
						if(!res.data.error){
							if(isfirst){
								that.pageData.list=res.data.data.list;
								isfirst=false;
							}else{
								
								that.pageData.list=app.json_add(that.pageData.list,res.data.data.list);
							}
							per_page=res.data.data.per_page;  
							
						}
						
						
					}
				})
			},
			goArticle: function (id) {
				uni.navigateTo({
					url: "/pages/article/show?id=" + id
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

