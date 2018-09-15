<template>
	<view>
		<view class="header-show">
			<view class="header-search-box">
				 
				<input class="header-search mgl-5 pdl-5" type="text" v-model="searchWord" :value="searchWord" />
				<div @click="search()" form-type="submit" class="header-search-btn iconfont icon-search"></div>
			</view>
		</view>
		<view class="header-row-show"></view>
		<view class="main-body">
			<view v-if="pageData.rscount!=0" class="mtlist bg-ef mgt-10">
				<view class="mtlist-item" v-for="(item,key) in pageData.list" :key="key">
					<view class="mtlist-item-bd">
						<navigator class="mtlist-imgbox" :url="'/pages/product/show?id='+item.id">
							<image mode="widthFix" class="mtlist-img" :src="item.imgurl+'.100x100.jpg'"></image>
						</navigator>
						<view class="mtlist-item-pd">
							<view class="mtlist-item-money">
								<view class="mtlist-item-money-flex">￥
									<text class="mtlist-item-money_money">{{item.price}}</text>
								</view>
								<view class="mtlist-item-money_num">月销{{item.buy_num}}件</view>
							</view>
							<view class="mtlist-title">{{item.title}}</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script> 
	var app= require("../../common/common.js"); 
	import mtFooter from "../../components/footer.vue";
	var per_page=0;
	var isfirst=true;
	var catid=0;
	var activeClass="list-side-item-active";
	export default{
		components:{
			mtFooter
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
				winHeight:600,
				defaultActive:"list-side-item-active",
				searchWord:""
			};
		},
		onLoad:function(option){
			var win=uni.getSystemInfoSync();
			this.winHeight=win.windowHeight-50;
			uni.setNavigationBarTitle({
				title: '产品搜索'
			});
			this.searchWord=option.searchWord;
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
		onPullDownRefresh:function(){
			this.refresh();
		} ,
		onReachBottom:function(){
			this.getList();
		},
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=product&ajax=1",
					data:{
						authcode:app.getAuthCode(),
						keyword:this.searchWord
					},
					success:function(data){
						isfirst=false;
						that.pageLoad=true;
						that.pageData=data.data.data;
						per_page=data.data.data.per_page; 
					}
				})
			},
			 
			getList:function(){
				var that=this;
				if(!isfirst && per_page==0) return false;
				uni.request({
					url:app.apiHost+"?m=product&ajax=1",
					data:{
						per_page:per_page,
					 
						authcode:app.getAuthCode(),
						keyword:this.searchWord
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
			goProduct:function(id){
				uni.navigateTo({
					url:"/pages/product/show?id="+id
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
			search:function(){
				per_page=0;
				isfirst=true;
				this.getPage();
			}
			
		}
	}
</script>

<style>

</style>
