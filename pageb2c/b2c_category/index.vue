<template>
	<view>
		<view class="main-body bg-white mh100" >
			<view class="list-side" :style="{'top':sideTop+'px'}">

				<view @click="setCat(item.catid)" v-for="(item,index) in pageData.catList"  :key="index" class="list-side-item" :class="{'list-side-item-active':catid==item.catid}">{{item.title}}</view>

			</view>
			<view class="list-main" :style="{'min-height':height+'px'}">

				<view v-for="(item,index) in pageData.catList" :key="index" class="list-cat-item">
					<view v-if="item.catid==catid">
						 
						<view  @click="goList(item.catid)" class="list-cat-hd">
							<div class="list-cat-hd-line"></div>
							<div class="mgr-5 mgl-5">{{item.title}}</div>
							<div class="list-cat-hd-line"></div>
						</view>
						<view class="list-child">

							<view v-for="(cc,ccIndex) in item.child" :key="ccIndex" @click="goList(cc.catid)" class="list-child-item">
								<image class="list-child-img" mode="widthFix" :src="cc.imgurl+'.100x100.jpg'"></image>
								<view class="list-child-title">{{cc.title}}</view>
							</view>
						</view>
					</view>
				</view>


			</view>
		</view>
		<b2c-footer tab="category"></b2c-footer>
	</view>	
</template>

<script>
	import b2cFooter from "../../components/b2cfooter.vue";
	export default {
		components:{
			b2cFooter
		},
		data: function() {
			return {
			 
				pageLoad: false,
				pageData: {},
				catid:0,
				height:440,
				sideTop:44
			}
		},
		onLoad: function(ops) {
			var win=uni.getSystemInfoSync();
			this.height=win.windowHeight-50;
			// #ifndef H5
			this.sideTop=0;
			// #endif
			this.getPage();
			
		},
		methods: {
			setCat:function(catid){
				this.catid=catid;
			},
			goList:function(catid){
				uni.navigateTo({
					url:"../b2c_product/list?catid="+catid
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/module.php?m=b2c_category&ajax=1",
					success: function(res) {
						that.pageData = res.data;
						for(var i in res.data.catList){
							that.catid=res.data.catList[i].catid;
							break;
						}
						
						that.pageLoad = true;
					}
				})
			}
		}
	}
</script>

<style>
 
.list-side {
	position: fixed;
	left: 0rpx;
	top: 110rpx;
	bottom: 130rpx;
	width: 170rpx;
	border-right: 1px solid #eee;
	text-align: center;
	background-color: #fff;
}

.list-side-item {
	color: #707070;
	padding: 22rpx 11rpx;
	font-size: 14px;
	display: block;
	cursor: pointer;
}

.list-side-item-active {
	color: #ff842b;
	border-left: 7rpx solid #ff842b;
}

.list-main {
	margin-left: 180rpx;
	padding-top: 11rpx;
}

.list-cat-img {
	max-width: 100%;
	padding-right: 11rpx;
}

.list-cat-hd {
	 
	padding: 22rpx 0;
	 
	width:160px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
.list-cat-hd-line{
	width:20px;
	height: 1px;
	background-color: #ddd; 
} 

.list-child {
	margin-bottom: 22rpx;
	flex-direction: row;
	flex-wrap: wrap;
}

.list-child-item {
	float: left;
	display: block;
	width: 33.333%;
	margin-bottom: 22rpx;
	padding: 0 22rpx;
	box-sizing: border-box;
	font-size: 14px;
	color: #666;
	text-align: center;
}

.list-child-img {
	width: 100%;
	height: 60rpx;
	display: block;
	margin-bottom: 11rpx;
}

.list-child-title {
	height: 66rpx;
	line-height: 66rpx;
	overflow: hidden;
}

 
</style>
