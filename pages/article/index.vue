<template>
	<view>
		<view v-if="!pageLoad" class="">
			<page-loading></page-loading>
		</view>
		<view v-if="pageLoad">
			<scroll-view class="bg-fff" scroll-x="true">
				<view class="tabs-border">
					<view @click="setCat(0)"  :class="{ 'tabs-border-active':catid==0 }" class="tabs-border-item-inner ">全部</view>
					<view class="tabs-border-item-inner" :class="{ 'tabs-border-active':item.catid==catid }" v-for="(item,key) in catList"
					 :key="key" @click="setCat(item.catid)">{{item.cname}}</view>
				</view>
			</scroll-view>
		
			<view class="main-body">
				<view class="flexlist">
					<view @click="goArticle(item.id)" class="flexlist-item pdb-10" v-for="(item,index) in list" :key="index">
		
						<image v-if="item.imgurl!=''" mode="widthFix" class="flexlist-img" :src="item.imgurl+'.100x100.jpg'"></image>
						<view class="flex-1">
							<view class="flexlist-title f16">{{item.title}}</view>
							<view class="flexlist-desc cl2 f14">{{item.description}}</view>
						</view>
		
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
				pageLoad:false,
				list:[],
				per_page:0,
				isFirst:true,
				catid:0,
				catList:[]
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
			goArticle: function(id) {
				uni.navigateTo({
					url: "../article/show?id=" + id
				})
			},
			setCat:function(catid){
				this.catid=catid;
				this.isFirst=true;
				this.per_page=0;
				this.getList();
			},
			getPage:function() {
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/article/index",
					success:function(res){
						that.pageLoad=true;
						that.list=res.data.list;
						that.catList=res.data.catlist;
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
					url:that.app.apiHost+"/article/index",
					data:{
						per_page:that.per_page,
						catid:this.catid
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
			}
		},
	}
</script>

<style>
</style>
