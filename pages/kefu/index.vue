<template  >
	<view>
		<view  >
			<div v-if="list.length==0" class="emptyData">暂无客服消息</div>
			<div class="mgb-5"></div>
			<view style="min-height: 600px;" v-if="pageLoad" class="list bg-ef" >
				 
				<view v-for="(item,index) in list" :key="index" class="pd-10  ">
					 
					<view  v-if="item.tablename=='user'">
						<view class="flex flex-ai-center">
							<view class="flex-1"></view>
							<div class="cl3 f12 mgr-10">
								{{item.createtime}}
							</div>
							<view class="cl1 fw-600">我</view>
						</view>
						 
						<view class="flex">
							<view class="flex-1"></view>
							<view class="kf-content mgr-20">{{item.content}}</view>
						</view>
					</view>
					<view  v-else>
						<div class="flex flex-ai-center mgb-5">
							<div class="cl1 fw-600 mgr-5">客服</div>
							<div class="cl3 f12">
								{{item.createtime}}
							</div>
						</div>
						
						<view class="kf-content mgl-20">{{item.content}}</view>
				
				 
					</view>
				</view>
			 
			</view>
			<div v-if="per_page>0" class="loadMore" @click="getList()">加载更多</div>
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
				list:[],
				isFirst:true,
				per_page:0,
				content:"",
				timer:0,
			}
		},
		onLoad:function(){
			this.getPage();
			var that=this;
			 
			this.timer=setInterval(function(){
				that.getPage();
			},10000)
		},
		onHide(){
			clearInterval(this.timer)
		},
		onUnload(){
			clearInterval(this.timer)
		},
		methods:{
			getPage:function(){
				var that=this;
				this.app.get({
					url:this.app.apiHost+"/index/kefu/data",
					
					dataType:"json",
					unLogin:true,
					success:function(res){
						if(res.error){
							if(res.error==1000){
								that.app.showLoginBox(true)
								return false;
							}
							uni.showToast({
								title:res.message,
								icon:"none"
							})
							return false;
						}
						that.pageLoad=true;
						that.list=res.data.list
						that.isFirst=false;
						that.per_page=res.data.per_page;
					}
				})
			},
			getList:function(){
				var that=this;
				if(!that.isFirst && that.per_page==0 ){
					return false;
				}
				this.app.get({
					url:this.app.apiHost+"/index/kefu/data",
					data:{
						per_page:that.per_page
					},
					dataType:"json",
					success:function(res){
						if(that.isFirst){
							that.list=res.data.list
						}else{
							for(var i in res.data.list){
								that.list.push(res.data.list[i])
							}
						}
						that.isFirst=false;
						that.per_page=res.data.per_page;
						 
					}
				})
			},
			submit:function(){
				var that=this;
				if(this.content=="") return false;
				that.app.post({
					url:that.app.apiHost+"/index/kefu/save",
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
