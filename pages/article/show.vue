<template>
	<view>
		<view v-if="errMsg!=''" class="emptyData">文章出走啦</view>
		<view class="pd-10 bg-fff" v-if="pageLoad">
			<view class="d-title">{{pageData.data.title}}</view>
			 
			<view class="d-content">
			 
				<jyf-parser class="wmax" :html="pageData.data.content" ref="article"></jyf-parser> 
			</view>
			<view class="flex flex-center mgb-10">
				<view class="btn-love  mgr-10" @click="loveToggle(pageData.data.id)" v-bind:class="pageData.islove?'btn-love-active':''">
					喜欢
				</view>
				 
				<view class="btn-fav mgr-10" @click="favToggle(pageData.data.id)" v-bind:class="pageData.isfav?'btn-fav-active':''">收藏</view>
				 
				<button style="margin: 0;" open-type="share" class="btn-share " @click="share()">分享</button>
			</view>
			<view class="comment-hd">回复列表</view>
			<cmform tablename="article" :objectid="pageData.data.id"></cmform>
			<view v-if="skyShareShow">
				<sky-share :title="pageData.data.title" :imgurl="pageData.data.imgurl" :link="shareLink" :desc="pageData.data.description"  :isshow="1"></sky-share>
			</view>
		</view>
	</view>
</template>

<script> 
	import cmform from "../../components/cmform.vue";
	var id;
	
	import skyShare from "../../components/skyshare.vue";
	import jyfParser from "../../components/jyf-parser/jyf-parser"; 
	export default{
		components: {
			skyShare,
			cmform,
			 jyfParser
		},
		data:function(){
			return {
				pageLoad:false, 
				pageData:{},
				skyShareShow:0,
				shareLink:"",
				errMsg:""
			}
		},
		onLoad:function(option){
			id=option.id;
			this.getPage();
			 
		},
		onShareAppMessage:function(){
			
		},
		 onShareTimeline:function(){
		 	
		 },
		methods:{
			share:function(){
				var that=this;
				this.skyShareShow=0;
				setTimeout(function(){
					that.skyShareShow=1;
				},30)
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/article/show?id="+id,
				 
					success:function(res){
						if(res.error){
							that.errMsg=res.message;
							return false;
						}
						that.pageLoad=true;
						 
						that.pageData=res.data;
						that.shareLink=that.app.apiHost+"/article/show?id="+res.data.data.id;
						uni.setNavigationBarTitle({
							title:res.data.data.title
						})
					}
				})
			},
			favToggle:function(id){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/fav/toggle?ajax=1",
					data:{
						objectid:id,
						tablename:"article"
					},
					success:function(res){
						if(res.data=='delete'){
							that.pageData.isfav=false;
						}else{
							that.pageData.isfav=true;
						}
						 
					}
				})
			},
			loveToggle:function(id){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/love/toggle?ajax=1",
					data:{
						objectid:id,	 
						tablename:"article"
					},
					success:function(res){
						if(res.data=='delete'){
							that.pageData.islove=false;
						}else{
							that.pageData.islove=true;
						}
						
					}
				})
			}
		},
	}
</script>

<style>
</style>