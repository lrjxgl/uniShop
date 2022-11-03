<template>
	<view>
		<view class="main-body">
			<view v-if="pageLoad" class="list" id="app">
				 
				<view v-for="(item,index) in pageData.list" :key="index" class="pd-10">
					 
					<view  v-if="item.tablename=='user'">
						<view class="flex">
							<view class="flex-1"></view>
							<view class="cl2">我</view>
						</view>
						<view class="flex">
							<view class="flex-1"></view>
							<view class="kf-content mgr-20">{{item.content}}</view>
						</view>
					</view>
					<view  v-else>
						<view class="cl2 mgb-5">
							
							客服
						</view>
						<view class="kf-content mgl-20">{{item.content}}</view>
				
				 
					</view>
				</view>
			 
			</view>
			<view class="footer-row"></view>
			<view style="position: fixed;bottom: 0;left: 0;right: 0;">
				<view class="input-flex">
					<input type="text" v-model="content" class="input-flex-text" />
					<view class="input-flex-btn" @click="submit">发送</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data:function(){
			return {
				pageLoad:false,
				pageData:[],
				content:""
			}
		},
		onLoad:function(){
			this.getPage();
			var that=this;
			setInterval(function(){
				that.getPage();
			},10000)
		},
		methods:{
			getPage:function(){
				var that=this;
				this.app.get({
					url:this.app.apiHost+"/kefu/data?ajax=1",
					
					dataType:"json",
					success:function(res){
						that.pageLoad=true;
						that.pageData=res.data
						console.log(res.data);
					}
				})
			},
			submit:function(){
				var that=this;
				if(this.content=="") return false;
				that.app.post({
					url:that.app.apiHost+"/kefu/save?ajax=1",
					data:{
						content:this.content
					},
					success:function(res){
						if(res.error){
							uni.showToast({
								title:res.message
							})
						}else{
							that.content="";
							that.getPage();
						}
					}
				})
			}
		}
	}
</script>

<style>
	.w200{
		max-width: 200px;
	}
	.kf-content{
		border:1px solid #eee;
		padding: 5px 8px;
		border-radius: 10px;
		font-size: 14px;
		color: #646464;
		background-color: #fff;
		max-width: 80%;
	}
</style>
