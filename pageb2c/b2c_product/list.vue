<template>
	<view>
		 <view v-if="catList" class="tabs-border">
			
		 	<view @click="setCat(item.catid)" v-bind:class="{'tabs-border-active':catid==item.catid}" v-for="(item,index) in catList" :key="index" class="tabs-border-item">{{item.title}}</view> 	 
		 </view>
		 <view class="emptyData" v-if="Object.keys(list).length==0">暂无产品上架</view>
		 <view class="mtlist mgt-5">
		 	 
		 	<view @click="goProduct(item.id)" v-for="(item,index) in list" :key="index" class="mtlist-item">
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
	 
	export default{
		data:function(){
			return {
				catid:0,
				pageLoad:false,
				catList:[],
				list:[],
				pageCatid:0,
				per_page:0,
				isFirst:0
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
			setCat:function(catid){
				this.catid=catid;
				this.isFirst=true;
				this.per_page=0;
				this.getList();
			},
			goProduct:function(id){
				uni.navigateTo({
					url:"../b2c_product/show?id="+id
				})
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_product&a=list&ajax=1&catid="+that.catid,
					success:function(res){					
						that.per_page=res.data.per_page;
						that.list=res.data.list;
						that.catList=res.data.catList;
						that.isFirst=false;
						that.pageLoad=true;
						if(that.pageCatid==0){
							that.pageCatid=res.data.cat.catid;
						}						
						uni.setNavigationBarTitle({
							title:res.data.cat.title
						})
					}
				})
			},
			getList:function(){
				var that=this;
				if(that.per_page==0 && !that.isFirst){
					return false;	
				}
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_product&a=list&ajax=1&catid="+that.catid,
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
			},
		}
	}
</script>

<style>
</style>
