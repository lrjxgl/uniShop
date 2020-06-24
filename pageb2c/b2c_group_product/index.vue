<template>
	<view v-if="pageLoad">
		<view class="mtlist">
			 
			<view @click="goProduct(item.id)" class="mtlist-item"  v-for="(item,index) in list" :key="index">
				<view class="mtlist-item-bd">
					<image class="mtlist-img" mode="widthFix" :src="item.imgurl+'.small.jpg'"></image>
					<view class="mtlist-item-pd">
						<view class="flex flex-ai-center mgb-5">
							<text class="cl-money f14">￥</text>
							<text class="cl-money f16">{{item.price}}</text>
							<view class="flex-1"></view>
							 
							<text class="cl2">月销{{item.buy_num}}件</text>
						</view>
						<view class="mtlist-title">{{item.title}}</view>
						 
					</view>
				</view>
			</view>
		</view>
		<view class="loadMore" v-if="per_page>0" @click="getList">加载更多</view>
	</view> 
</template>

<script> 
	
	export default{
	
		data:function(){
			return{
				pageLoad:false, 
				pageHide:false,
				list:{},
				isFirst:true,
				per_page:0,
				gkey:""
			}
			
		},
		onLoad:function(option){
			this.gkey=option.gkey; 
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
			gourl:function(url){
				uni.navigateTo({
					url:url
				})
			},
			goProduct:function(id){
				uni.navigateTo({
					url:"../b2c_product/show?id="+id
				})
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_group_product&ajax=1&gkey="+this.gkey,
					success:function(res){
						that.isFirst=false;
						that.pageLoad=true;
						that.list=res.data.list;
						that.per_page=res.data.per_page;
						uni.setNavigationBarTitle({
							title:res.data.group.title
						}) 
					}
				})
			},
			 
			getList:function(){
				var that=this;
				if(!that.isFirst && that.per_page==0) return false;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_group_product&ajax=1&gkey="+this.gkey,
					data:{
						per_page:that.per_page,
					},
					success:function(res){
						if(that.isFirst){
							that.list=res.data.list;
							that.isFirst=false;
						}else{
							for(var i in res.data.list){
								that.list.push(res.data.list[i]);
							}
						}
						that.per_page=res.data.per_page;						
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
			}
		},
	}
</script>

<style>
 
</style>
