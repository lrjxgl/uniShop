<template>
	<view>
		<view class="pd-10 bg-fff" v-if="pageLoad">
			<view class="d-title">{{pageData.data.title}}</view>
			 
			<view class="d-content">
				<rich-text type="text" :nodes="pageData.data.content"></rich-text>
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
	export default{
		components: {
			skyShare,
			cmform
		},
		data:function(){
			return {
				pageLoad:false, 
				pageData:{},
				skyShareShow:0,
				shareLink:""
			}
		},
		onLoad:function(option){
			id=option.id;
			this.getPage();
			 
		},
		onShareAppMessage:function(){
			
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
				uni.request({
					url:that.app.apiHost+"?m=article&ajax=1&a=show&id="+id,
					data:{
						authcode:that.app.getAuthCode(),
					},
					success:function(res){
						that.pageLoad=true;
						res.data.data.data.content=that.app.html(res.data.data.data.content);
						that.pageData=res.data.data;
						that.shareLink=that.app.apiHost+"/index.php?m=article&a=show&id="+res.data.data.data.id;
					}
				})
			},
			favToggle:function(id){
				var that=this;
				uni.request({
					url:that.app.apiHost+"?fromapp=wxapp&m=fav&a=toggle&ajax=1",
					data:{
						objectid:id,
						authcode:that.app.getAuthCode(),
						tablename:"article"
					},
					success:function(res){
						if(res.data.data=='delete'){
							that.pageData.isfav=false;
						}else{
							that.pageData.isfav=true;
						}
						 
					}
				})
			},
			loveToggle:function(id){
				var that=this;
				uni.request({
					url:that.app.apiHost+"?m=love&a=toggle&ajax=1",
					data:{
						
						fromapp:that.app.fromapp(),
						objectid:id,
						authcode:that.app.getAuthCode(),
						tablename:"article"
					},
					success:function(res){
						if(res.data.data=='delete'){
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