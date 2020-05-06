<template>
	<view>
		  
		 <view class="mtlist mgt-5">
		 	 
		 	<view @click="goProduct(item.id)" v-for="(item,index) in pageData.list" :key="index" class="mtlist-item">
		 		<view class="mtlist-item-bd">
		 			<image mode="widthFix" class="mtlist-img" :src="item.imgurl+'.small.jpg'"></image>
		 			<view class="mtlist-item-pd">
		 				<view class="mtlist-item-money">
		 					<view class="mtlist-item-money-flex">￥
		 						<text class="mtlist-item-money_money">{{item.price}}</text>
		 					</view>
		 					<view class="mtlist-item-money_num">月销{{item.buy_num}}件</view>
		 				</view>
		 				<view class="mtlist-title">{{item.title}}</view>
		 				<view class="mtlist-desc">{{item.description}}</view>
		 			</view>
		 		</view>
		 	</view>
		 	 
		 	
		 </view>
	</view>
</template>

<script>
	var isFirst=true;
	var per_page=0;
	export default{
		data:function(){
			return {
				catid:0,
				pageLoad:false,
				pageData:{},
				pageCatid:0
			}
		},
		onLoad:function(ops){
			this.catid=ops.catid
			this.getPage();
		},
		onReachBottom:function(){
			this.getList();
		},
		methods:{
			 
			goProduct:function(id){
				uni.navigateTo({
					url:"../b2c_product/show?id="+id
				})
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_pintuan&ajax=1&catid="+that.catid,
					success:function(res){
						per_page=res.data.per_page;
						that.pageData=res.data;
						that.pageLoad=true;
						 
					}
				})
			},
			getList:function(){
				var that=this;
				if(per_page==0 && !isFirst){
					return false;	
				}
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_pintuan&ajax=1&catid="+that.catid,
					success:function(res){
						per_page=res.data.per_page;
						if(!isFirst){
							var list=that.pageData.list;
							if(res.data.list.length>0){
								list=that.app.json_add(list,res.data.list);
								res.data.list=list;
							}
							
						}else{
							that.pageData.list=res.data.list;
						}
						
						that.pageLoad=true;
						 
						uni.setNavigationBarTitle({
							title:res.data.cat.title
						})
					}
				})
			},
		}
	}
</script>

<style>
</style>
