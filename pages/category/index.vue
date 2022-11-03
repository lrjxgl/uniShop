<template>
	<view>
		<view v-if="pageLoad">
			<view class="list-side">

				<view v-for="(item,key) in pageData.catlist" :key="key" class="list-side-item">{{item.cname}}</view>


			</view>
			<view class="list-main">

				<view class="list-cat-item" v-for="($c,key) in pageData.catlist" :key="key">
					<navigator :url="'/pages/product/index?catid='+$c.catid">
						<image class="list-cat-img" :src="$c.imgurl" onerror="this.src='http://img.deitui.com/?w=600&h=200&text=logo&fontsize=64&textcolor=fff&bgcolor=9FB6CD'"></image>
					</navigator>
					<view class="list-cat-hd">{{$c.cname}}</view>
					<view class="list-child">

						<navigator v-for="($cc,cckey) in $c.child" :key="cckey" :url="'/pages/product/index?catid='+$cc.catid" class="list-child-item">
							<image class="list-child-img" :src="$cc.imgurl" onerror="this.src='http://img.deitui.com/?w=50&h=50&text=logo&fontsize=14&textcolor=fff&bgcolor=9FB6CD'"></image>
							<view class="list-child-title">{{$cc.cname}}</view>
						</navigator>

						<view class="clearfix"></view>
					</view>
				</view>

			</view>
		</view>
		<mt-footer  tab="category"></mt-footer>
	</view>
</template>

<script>
	var app = require("../../common/common.js");
	import mtFooter from "../../components/footer.vue";
	export default {
		components:{
			mtFooter
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},
		onLoad: function (option) {

			this.getPage();
		},

		methods: {
			getPage: function () {
				var that = this;
				that.app.get({
					url: app.apiHost + "/category/index?",
					success: function (res) {
						that.pageLoad = true;
						that.pageData = res.data;

					}
				})
			}

		},
	}
</script>

<style>
	.list-side {
		position: fixed;
		left: 0upx;
		top: 132upx;
		bottom: 132upx;
		width: 154upx;
		border-right: 2upx solid #eee;
		text-align: center;
	}

	.list-side-item {
		color: #707070;
		margin-bottom: 22upx;
		font-size: 29upx;
		display: block;
	}

	.list-side-item.active {
		color: #ff842b;
		border-left: 6upx solid #ff842b;
	}

	.list-main {
		margin-left: 176upx;
		padding-top: 132upx;
	}

	.list-cat-img {
		max-width: 100%;
		height: 220upx;
		padding-right: 11upx;
	}

	.list-cat-hd {
		text-align: center;
		padding: 22upx 0;
		color: #666;
		font-size: 29upx;
		position: relative;
	}

	.list-cat-hd:before {
		display: block;
		width: 44upx;
		height: 2upx;
		background-color: #e0e0e0;
		position: absolute;
		right: 60%;
		top: 50%;
		content: "-";
		overflow: hidden;
		color: #666;
	}

	.list-cat-hd:after {
		display: block;
		width: 40upx;
		height: 2upx;
		background-color: #e0e0e0;
		position: absolute;
		left: 60%;
		top: 50%;
		content: "-";
		overflow: hidden;
		color: #666;
	}

	.list-child {
		margin-bottom: 22upx;
	}

	.list-child-item {
		float: left;
		display: block;
		width: 33.333%;
		margin-bottom: 22upx;
		padding: 0 22upx;
		box-sizing: border-box;
		font-size: 29upx;
		color: #666;
		text-align: center;
	}

	.list-child-img {
		width: 160upx;
		height: 160upx; 
		display: block;
		margin-bottom: 11upx;
	}

	.list-child-title {
		height: 66upx;
		line-height: 66upx;
		overflow: hidden;
	}

	.fixtop {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 22upx;
		height: 110upx;
		z-index: 999;
		background-color: #efefef;
	}
</style>
