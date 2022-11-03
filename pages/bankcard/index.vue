<template>
	<view class="main-body">
		<view class="sglist">
			<view v-if="list.length==0" class="emptyData">暂无</view>
			<view v-for="(item,index) in list" :key="index" class="sglist-item js-item">
				<view class="sglist-title flex">
					<view class="flex-1">{{item.yhk_huming}}</view>
					<view>{{item.yhk_name}}</view>
					<view class="mgl-10 cl-warning pointer" @click="del(item)">删除</view>
				</view>
				<view class="sglist-desc">卡号：{{item.yhk_haoma}}</view>
				<view class="sglist-desc">{{item.yhk_address}}</view>
			</view>
			<view @click="gourl('add')" class="fixedAdd">添加</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: function() {
			return {

				list: []
			}
		},
		onLoad: function() {
			this.getPage();
		},
		onShow:function(){
			this.getPage();
		},
		methods: {
			gourl:function(url){
				uni.navigateTo({
					url:url
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/bankcard/index",
					success: function(res) {
						 
						that.list = res.data.list;
					}
				})
			},
			del:function(item){
				var that = this;
				uni.showModal({
					title:"提示",
					content:"删除后不可恢复",
					success: function (res) {
						if (res.confirm) {
							that.app.get({
								url: that.app.apiHost + "/bankcard/delete?ajax=1",
								data:{
									id:item.id
								},
								success: function(res) {
									var list=[];
									for(var i in that.list){
										if(that.list[i].id!=item.id){
											list.push(that.list[i]);
										}
									} 
									that.list = list;
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				
			}
		}
	}
</script>

<style>
</style>
