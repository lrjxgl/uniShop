<template>
	<div>
		 <div v-if="pageData.catList" class="tabs-border">
			
		 	<div @click="setCat(item.catid)" v-bind:class="{'tabs-border-active':catid==item.catid}" v-for="(item,index) in pageData.catList" :key="index" class="tabs-border-item">{{item.title}}</div> 	 
		 </div>
		 <div class="mtlist mgt-5">
		 	 
		 	<div @click="goProduct(item.id)" v-for="(item,index) in pageData.list" :key="index" class="mtlist-item">
		 		<div class="mtlist-item-bd">
		 			<a class="mtlist-imgbox" >
		 				<image mode="widthFix" class="mtlist-img" :src="item.imgurl+'.small.jpg'"></image>
		 			</a>
		 			<div class="mtlist-item-pd">
		 				<div class="mtlist-item-money">
		 					<div class="mtlist-item-money-flex">￥
		 						<text class="mtlist-item-money_money">{{item.price}}</text>
		 					</div>
		 					<div class="mtlist-item-money_num">月销{{item.buy_num}}件</div>
		 				</div>
		 				<div class="mtlist-title">{{item.title}}</div>
		 				<div class="mtlist-desc">{{item.description}}</div>
		 			</div>
		 		</div>
		 	</div>
		 	 
		 	
		 </div>
	</div>
</template>

<script>
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
		methods:{
			setCat:function(catid){
				this.catid=catid;
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
						that.pageData=res.data;
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
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_product&a=list&ajax=1&catid="+that.catid,
					success:function(res){
						that.pageData.list=res.data.list;
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
