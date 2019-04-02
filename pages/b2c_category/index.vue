<template>
	<div>
		<div class="main-body bg-white mh100" >
			<div class="list-side" :style="{'top':sideTop+'px'}">

				<div @click="setCat(item.catid)" v-for="(item,index) in pageData.catList"  :key="index" class="list-side-item" v-bind:class="{'list-side-item-active':catid==item.catid}">{{item.title}}</div>

			</div>
			<div class="list-main" v-bind:style="{'min-height':height+'upx'}">

				<div v-for="(item,index) in pageData.catList" :key="index" class="list-cat-item">
					<div v-if="item.catid==catid">
						<div @click="goList(item.catid)">
							<image class="list-cat-img" mode="widthFix" :src="item.imgurl+'.middle.jpg'"></image>
						</div>
						<div class="list-cat-hd">{{item.title}}</div>
						<div class="list-child">

							<div v-for="(cc,ccIndex) in item.child" :key="ccIndex" @click="goList(cc.catid)" class="list-child-item">
								<image class="list-child-img" mode="widthFix" :src="cc.imgurl+'.middle.jpg'"></image>
								<div class="list-child-title">{{cc.title}}</div>
							</div>
						</div>
					</div>
				</div>


			</div>
		</div>
		<b2c-footer tab="category"></b2c-footer>
	</div>	
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
	left: 0upx;
	top: 110upx;
	bottom: 130upx;
	width: 170upx;
	border-right: 1px solid #eee;
	text-align: center;
	background-color: #fff;
}

.list-side-item {
	color: #707070;
	padding: 22upx 11upx;
	font-size: 14px;
	display: block;
	cursor: pointer;
}

.list-side-item-active {
	color: #ff842b;
	border-left: 7upx solid #ff842b;
}

.list-main {
	margin-left: 180upx;
	padding-top: 11upx;
}

.list-cat-img {
	max-width: 100%;
	padding-right: 11upx;
}

.list-cat-hd {
	text-align: center;
	padding: 22upx 0;
	color: #666;
	font-size: 14px;
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
	width: 44upx;
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
	flex-direction: row;
	flex-wrap: wrap;
}

.list-child-item {
	float: left;
	display: block;
	width: 33.333%;
	margin-bottom: 22upx;
	padding: 0 22upx;
	box-sizing: border-box;
	font-size: 14px;
	color: #666;
	text-align: center;
}

.list-child-img {
	width: 100%;
	height: 60upx;
	display: block;
	margin-bottom: 11upx;
}

.list-child-title {
	height: 66upx;
	line-height: 66upx;
	overflow: hidden;
}

 
</style>
