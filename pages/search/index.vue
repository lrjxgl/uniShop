<template>
	<view class="bg-ef">
		<view class="flex pd-5 bg-white mgb-5">
			<input class="input-flex-text bd-radius-10 outline-none" v-model="keyword" id="keyword" />
			<view class="input-flex-btn w60" @click="search()">搜一下</view>
		</view>
		<view v-if="pageLoad">
			<view v-if="!list" class="emptyData">没找到你搜的</view>
			<view class="list" v-else>
				<div v-for="(item,index) in list" :key="index">
					<div @click="goDetail(item)" v-if="item.tablename=='article' || item.tablename=='forum' " class="row-box mgb-10">
						<div class="flex">
							<image v-if="item.imgurl!=''" :src="item.imgurl+'.100x100.jpg'"  mode="widthFix"  class="w100   mgr-10"></image>
							<div class="flex-1">
								<div class="mgb-5">{{item.title}}</div>
								<div class="mgb-5 cl2">{{item.description}}</div>
							</div>
						</div>
		
					</div>
					<div @click="goDetail(item)" class="row-box mgb-10" v-else>
						<div class="flex">
							<image    v-if="item.imgurl!=''"  :src="item.imgurl+'.100x100.jpg'" mode="widthFix" class="w100   mgr-10"></image>
							<div class="flex-1">
								<div class="mgb-5">{{item.title}}</div>
								<div class="mgb-5 cl2">{{item.description}}</div>
								<div class="flex flex-ai-center">
									<div class="cl-money f12">￥</div>
									<div class="cl-money f16">{{item.price}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</view>
			<div class="loadMore" v-if="per_page>0" @click="search()">加载更多</div>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				pageLoad:false,
				keyword: "",
				list: [],
				per_page:0,
				isFirst:true,
				rscount:0
			}
		},
		onLoad(ops) {
			this.keyword=ops.keyword;
			if(this.keyword){
				this.search();
			}
		},
		methods: {
			search: function() {
				var that = this;
				if(this.per_page==0 && !this.isFirst){
					return false;
				}
				this.app.get({
					url: that.app.apiHost + "/index/search/all",
					data: {
						keyword: this.keyword,
						per_page:this.per_page
					},
					dataType: "json",
					success: function(res) {
						that.pageLoad = true;
						if(that.isFirst){
							that.list = res.data.list;
						}else{
							for(var i in res.data.list){
								that.list.push(res.data.list[i])
							}
						}
						that.per_page=res.data.per_page;
						that.isFirst=false;
						
					}
				})
			},
			goDetail(item){
				if(item.tablename=='article'){
					uni.navigateTo({
						url:"../article/show?id="+item.id
					})
				}else if(item.tablename=='forum'){
					uni.navigateTo({
						url:"../../pageforum/forum/show?id="+item.id
					})
				}else if(item.tablename=="product"){
					uni.navigateTo({
						url:"../../pageb2c/b2c_product/show?id="+item.id
					})
				}
			}
		}
	}
</script>

<style>
</style>