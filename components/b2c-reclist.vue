<template>
	<view>
		<view class="rec-hd">{{title}}</view>
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
			productid:0,
			ptitle:""
		},
		data:function(){
			return {
				list:[],
				title:""
			}
		},
		created:function(){
			that=this;
			if(this.ptitle=='' || this.ptitle==undefined){
				this.title="推荐商品"
			}else{
				this.title=this.ptitle;
			}
			this.getPage();
		},
		methods:{
			goProduct:function(id){
				uni.navigateTo({
					url:"../../pageb2c/b2c_product/show?id="+id
				})
			},
			getPage:function(){
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_product&a=reclist&ajax=1",
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
	.rec-hd{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		font-size:40rpx;
		font-weight: bold;
		color: #d44e1d;
	}
</style>
