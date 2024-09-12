<template>
	<view>
		<view v-if="errMsg!=''" class="emptyData">文章出走啦</view>
		<view class="pd-10 bg-fff" v-if="pageLoad">
			<view class="d-title">{{data.title}}</view>

			<view class="d-content">

				<mp-html :content="data.content" />

			</view>
			<div class="mgb-10" v-if="pdfList.length>0">
				<div class="flex" v-for="(item,index) in pdfList" :key="index">
					<div>{{item.name}}</div>
					<div class="flex-1"></div>
					<!--<div @click="downPdf(item)" class="cl-primary mgr-10 pointer">下载</div>-->
					<div @click="goPdf(item)" class="cl-primary mgr-10 pointer">预览</div>
				</div>
			</div>
			<view class="flex flex-center mgb-10">
				<view class="btn-love  mgr-10" @click="loveToggle(data.id)" v-bind:class="islove?'btn-love-active':''">
					喜欢
				</view>

				<view class="btn-fav mgr-10" @click="favToggle(data.id)" v-bind:class="isfav?'btn-fav-active':''">收藏
				</view>

				<button style="margin: 0;" open-type="share" class="btn-share " @click="share()">分享</button>
			</view>
			<view class="comment-hd">回复列表</view>
			<cmform tablename="article" :objectid="data.id"></cmform>
			<view v-if="skyShareShow">
				<sky-share :title="data.title" :imgurl="data.imgurl" :link="shareLink" :desc="data.description"
					:isshow="1"></sky-share>
			</view>
		</view>
	</view>
</template>

<script>
	import cmform from "../../components/cmform.vue";


	import skyShare from "../../components/skyshare.vue";
	 
	export default {
		components: {
			skyShare,
			cmform
			 
		},
		data: function() {
			return {
				pageLoad: false,
				data: {},
				isfav: 0,
				islove: 0,
				pdfList: [],
				skyShareShow: 0,
				shareLink: "",
				errMsg: "",
				pdfList: [],
				timer: 0,
				id: 0
			}
		},
		onLoad: function(option) {
			var that = this;
			that.id = option.id;
			this.getPage();
			this.timer = setTimeout(function() {
				that.addClick()
			}, 2000)
		},
		onHide() {
			clearTimeout(this.timer);
		},
		onShareAppMessage: function() {

		},
		onShareTimeline: function() {

		},
		methods: {
			downPdf(item) {
				// #ifdef H5
				var a = document.createElement("a");
				a.target = "_blank";
				a.href = item.pdf;
				a.click();
				// #endif
				uni.downloadFile({
					url: item.pdf,
					success: (res) => {
						var tempFilePath = res.tempFilePath;
						uni.saveFile({
							tempFilePath: tempFilePath,
							success: function(res) {
								uni.showModal({
									title: "下载完成",
									showCancel: false,
									content: "文件存放位置：" + res.savedFilePath
								})

							}
						});
					}
				})
			},
			goPdf(item) {
				uni.navigateTo({
					url: "../../pages/web/index?url=" + encodeURI(item.html)
				})
			},
			share: function() {
				var that = this;
				this.skyShareShow = 0;
				setTimeout(function() {
					that.skyShareShow = 1;
				}, 30)
			},
			addClick() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index/article/addclick?id=" + that.id,
					success: function(res) {

					}
				})

			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index/article/show?id=" + that.id,

					success: function(res) {
						if (res.error) {
							that.errMsg = res.message;
							return false;
						}
						that.pageLoad = true;
						that.pdfList = res.data.pdfList;
						that.data = res.data.data;
						that.isfav = res.data.isfav;
						that.islove = res.data.islove;
						that.shareLink = that.app.apiHost + "/index/article/show?id=" + res.data
							.data.id;
						uni.setNavigationBarTitle({
							title: res.data.data.title
						})
					}
				})
			},
			favToggle: function(id) {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index/fav/toggle",
					data: {
						objectid: id,
						tablename: "article"
					},
					unLogin: true,
					success: function(res) {
						if (res.error) {
							if (res.error == 1000) {
								that.app.showLoginBox(false)
								return false;
							}
							uni.showToast({
								title: res.message,
								icon: "none"
							})
							return false;
						}
						if (res.data == 'delete') {
							that.isfav = false;
						} else {
							that.isfav = true;
						}

					}
				})
			},
			loveToggle: function(id) {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index/love/toggle",
					data: {
						objectid: id,
						tablename: "article"
					},
					unLogin: true,
					success: function(res) {
						if (res.error) {
							if (res.error == 1000) {
								that.app.showLoginBox(false)
								return false;
							}
							uni.showToast({
								title: res.message,
								icon: "none"
							})
							return false;
						}
						if (res.data == 'delete') {
							that.islove = false;
						} else {
							that.islove = true;
						}

					}
				})
			}
		},
	}
</script>

<style>
</style>