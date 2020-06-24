<template>
	<view>
		 
		 <view class="tabs-border">
			<view @click="setOrder('')" :class="{'tabs-border-active':orderby==''}" class="tabs-border-item">综合</view>
			<view @click="setOrder('buy_num')"  :class="{'tabs-border-active':orderby=='buy_num'}" class="flex flex-center tabs-border-item">
				<text class="mgr-5">销量</text>
				<text class="iconfont icon-godown"></text>
			</view>
			<view @click="setOrder('price')"  :class="{'tabs-border-active':orderby=='price'}" class="tabs-border-item flex flex-center ">
				<text class="mgr-5">价格</text>
				<text class="iconfont icon-godown"></text>
			</view> 
		 </view>
		 <view class="emptyData" v-if="Object.keys(list).length==0">暂无产品上架</view>
		 <view class="mtlist mgt-5">
		 	 
		 	<view @click="goProduct(item.id)" v-for="(item,index) in list" :key="index" class="mtlist-item">
		 		<view class="mtlist-item-bd">
		 			<image mode="widthFix" class="mtlist-img" :src="item.imgurl+'.small.jpg'"></image>
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
				isFirst:0,
				orderby:""
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
			setOrder:function(o){
				this.orderby=o;
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
					url:that.app.apiHost+"/module.php?m=b2c_product&a=list&ajax=1",
					data:{
						orderby:this.orderby,
						catid:that.catid
					},
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
					url:that.app.apiHost+"/module.php?m=b2c_product&a=list&ajax=1",
					data:{
						orderby:this.orderby,
						catid:that.catid
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
			},
		}
	}
</script>

<style>
</style>
