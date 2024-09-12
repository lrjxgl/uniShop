<template>
	<view >
		<view class="header">
			<view class="header-back"></view>
			<view class="header-title">文章</view>
		</view>
		<view class="header-row"></view>
		<view class="main-body" v-if="pageLoad">
			<swiper class="bd-mp-5"  v-if="flashList.length>0" :style="{height:swipeHeight+'px'}" :indicator-dots="true" :autoplay="true" :interval="3000"
				:duration="1000">
				<swiper-item v-for="(item,key) in  flashList" :key="key">
					<view class="swiper-item">
						<image @click="gourl(item.link1)" :src="item.imgurl" class="wall" mode="widthFix">
						</image>
					</view>
				</swiper-item>
					
			</swiper>
			
			<scroll-view v-if="catList.length>0" class="bg-fff" scroll-x="true">
				<view class="tabs-border">
					<view @click="setCatid(scatid)" :class="catid==scatid?'tabs-border-active':''" class="tabs-border-item">全部</view>
					<view @click="setCatid(item.catid)" v-for="(item,index) in catList" :key="index" :class="catid==item.catid?'tabs-border-active':''"  class="tabs-border-item" >{{item.cname}}</view>
							
				</view>	
			</scroll-view>
			<view class="sglist">
				<view class="sglist-item" v-for="(item,key) in list" :key="key" @click="goArticle(item.id)">
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
		<go-top></go-top> 
	</view>
</template>

<script>
	 
 
	export default{
		 
		data:function(){
			return {
				pageData:{},
				pageLoad:false,
				type:"",
				isFirst:true,
				per_page:0,
				catid:0,
				scatid:0,
				catList:[],
				list:[],
				cat:{},
				swipeHeight: 320,
				flashList:[]
			}
		},
		onLoad:function(ops){
			this.catid=ops.catid;
			this.scatid=ops.catid;
			var sys = uni.getSystemInfoSync();
			this.swipeHeight = Math.min(640, sys.windowWidth) / 2;
			this.getPage();
			
		},
		methods:{
			gourl(url){
				uni.navigateTo({
					url:url
				})
			},
			setCatid:function(catid){
				this.catid=catid;
				isFirst=true;
				this.per_page=0;
				this.getList();
			},
			goArticle:function(id){
				uni.navigateTo({
					url:"show?id="+id
				})
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/article/list?catid="+this.catid,
				 
					success:function(res){
						if(res.error){
							skyToast(res.message)
							return false;
						}
						that.list=res.data.list;
						that.pageLoad=true;
						that.per_page=res.data.per_page;
						that.isFirst=false;
						that.cat=res.data.cat;
						that.flashList=res.data.flashList;
						uni.setNavigationBarTitle({
							title:res.data.cat.cname
						})
					}
				})
			},
			getList:function(){
				var that=this;
				if(that.per_page==0 && !that.isFirst){
					skyToast("已经到底了");
					return false;
				}
				that.app.get({
					url:that.app.apiHost+"/index/article/list?catid="+this.catid,
					data:{
						type:that.type,
						per_page:that.per_page,
						catid:this.catid
					},
					dataType:"json",
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
			}
		}
	}
</script>
<style>
	.tabs-border-item{
		width: 60px;
	}
</style>

