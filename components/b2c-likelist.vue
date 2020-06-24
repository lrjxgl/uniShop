<template>
	<view>
		<view class="mtlist">
			 
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
	var that=this;
	export default{
		props:{
			productid:0
		},
		data:function(){
			return {
				list:[]
			}
		},
		created:function(){
			that=this;
			this.getPage();
		},
		methods:{
			goProduct:function(id){
				uni.redirectTo({
					url:"../../pageb2c/b2c_product/show?id="+id
				})
			},
			getPage:function(){
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_product&a=likelist&ajax=1",
					data:{
						productid:this.productid
					},
					success:function(res){
						that.list=res.data.list;
					}
				})
			}
		}
	}
</script>

<style>
</style>
