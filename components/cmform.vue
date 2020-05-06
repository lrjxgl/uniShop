<template>
	<view>
		<view v-if="cmData.rscount==0" class="emptyData">暂无评论</view>
		<view v-else id="comment-list" class="comment-list">
			
			<view class="comment-item" v-for="(item,key) in cmData.list" :key="key">
				<image class="comment-item-head" :src="item.user_head+'.100x100.jpg'"></image>
				<view class="flex-1">
					<view class="comment-item-nick">
						{{item.nickname}}
					</view>
					<view class="comment-item-tools">
						<view class="comment-item-addr">
							{{item.ip_city}}
						</view>
						<view class="comment-item-time">
							{{item.timeago}}
						</view>
					</view>
					<view class="comment-item-content" :pid="item.id" :title="'回复@'+item.nickname" :reply_text="'回复@'+item.nickname">
						{{item.content}}
					</view>
				</view>
			</view>
		</view>
		<view class="h60"></view>
		<view class="comment-formbox">
			<view class="comment-input-btn js-write" @click="cmFormShow()" v-bind:class="cmBtnClass">写跟帖</view>
			<form @submit="cmFormSubmit" class="comment-formbox-form js-form" v-bind:class="cmFormClass">
				<view class="none">
					<input type="text" name="tablename" :value="tablename" />
					<input type="text" name="objectid" :value="objectid" />
				</view>
				<textarea name="content" class="comment-formbox-textarea"></textarea>
				<view class="comment-formbox-btns">
					<button formType="submit" class="comment-formbox-bt  js-submit">评论</button>
					<view class="w60"></view>
					<view @click="cmFormHide()" class="comment-formbox-bt js-cancel">取消</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	 
	export default {
		props:{
			tablename:"",
			objectid:""
		},
		data:function(){
			return {
				cmData:{},
				cmFormClass:"",
				cmBtnClass:""
			}
		},
		created:function(){
			this.getList();
		},
		methods:{
			getList:function(){
				var that=this;
				uni.request({
					url:that.app.apiHost+"?fromapp=wxapp&m=comment&ajax=1&tablename="+this.tablename+"&objectid="+this.objectid,
					success:function(res){
						that.cmData=res.data.data;
					}
				})
			},
			cmFormShow:function(){
				console.log("show");
				this.cmBtnClass="none";
				this.cmFormClass="flex-col";
			},
			cmFormHide:function(){
				console.log("hide");
				this.cmBtnClass="";
				this.cmFormClass="";
			},
			cmFormSubmit:function(e){
				var that=this;
				uni.request({
					url:that.app.apiHost+"?fromapp=wxapp&m=comment&a=save&ajax=1&authcode="+that.app.getAuthCode(),
					data:e.detail.value,
					method:"POST",
					header:{
						"content-type":"application/x-www-form-urlencoded"
					},
					success:function(res){
						console.log(res.data);
						uni.showToast({
							title: res.data.message,
							duration: 2000
						});
						that.cmBtnClass="";
						that.cmFormClass="";
					}
				})
			}
		}
	}
</script>

<style>

</style>
