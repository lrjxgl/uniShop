<template>
	<view >
		 
		<view class="main-body" v-if="pageLoad">
			 
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
				gkey:""
			}
		},
		onLoad:function(ops){
			this.gkey=ops.gkey
			this.getPage();
			
		},
		methods:{
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
					url:that.app.apiHost+"/index/article_tags_index/index",
					dataType:"json",
					data:{
						gkey:this.gkey
					},
					success:function(res){
						uni.showToast({
							title:res.message,
							icon:"none"
						})
						if(res.error){
							return false;
						}
						that.list=res.data.list;
						that.pageLoad=true;
						that.per_page=res.data.per_page;
						that.isFirst=false;
						that.cat=res.data.cat;
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
					url:that.app.apiHost+"/index/article_tags_index/index",
					data:{
						type:that.type,
						per_page:that.per_page,
						gkey:this.gkey
					},
					dataType:"json",
					success:function(res){
						uni.showToast({
							title:res.message,
							icon:"none"
						})
						if(res.error){
							return false;
						}
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

