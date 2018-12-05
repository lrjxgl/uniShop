<template>
	<view class="flex-col">
		
		<view class="tabs-border">
			<view  @click="setCat(0)" class="tabs-border-item" v-bind:class="defaultActive">推荐</view>
			<view @click="setCat(item.id)" v-bind:class="{ 'tabs-border-active':item.isactive }" v-for="(item,key) in pageData.catlist" :key="key" class="tabs-border-item">{{item.title}}</view>
			 
		</view>
		<view class="flex-main">
				<view class="flexlist">
					<view @click="goArticle(item.id)" class="flexlist-item pdb-10"  v-for="(item,index) in pageData.list" :key="index">
					 
							<image v-if="item.imgurl!=''" class="flexlist-img" :src="item.imgurl+'.100x100.jpg'"></image>
							<view class="flex-1">
								<view class="flexlist-title f16">{{item.title}}</view>
								<view class="flexlist-desc cl2 f14">{{item.description}}</view>
							</view>
					 
					</view>
				</view>
			 
 
		</view>
		<mt-footer></mt-footer>
	</view> 
</template>

<script> 
	var app= require("../../common/common.js"); 
	import mtFooter from "../../components/footer.vue";
	var per_page=0;
	var isfirst=true;
	var catid=0;
	var activeClass="tabs-border-active";
	export default{
		components:{
			mtFooter
		},
		data:function(){
			return {
				pageLoad:false, 
				pageData:{},
				winHeight:600,
				defaultActive:"tabs-border-active",
			}
		},
		onLoad:function(option){
			console.log("文章");
			var win=uni.getSystemInfoSync();
			this.winHeight=win.windowHeight-50;
			uni.setNavigationBarTitle({
				title: '资讯'
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
					url:app.apiHost+"?m=article&ajax=1",
					success:function(data){
						isfirst=false;
						that.pageData=data.data.data;
						per_page=data.data.data.per_page; 
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
					if(catlist[i].id==catid){
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
					url:app.apiHost+"?m=article&ajax=1",data:{
						per_page:per_page,
						shop_cid:catid
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
			goArticle:function(id){
				uni.navigateTo({
					url:"/pages/article/show?id="+id
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

 