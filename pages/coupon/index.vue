<template>
	<view >
		
		<div class="row-box mgb-5" v-for="(item,index) in pageData.list" :key="index">
				<div class="flex mgb-5">
					<div class="cl-primary">{{item.title}}</div>
				</div>
				<div class="cl2 f12 mgb-5">
					金额 {{item.money}}元
					&nbsp;&nbsp;
					领取 {{item.get_num}} 人
					&nbsp;&nbsp;
					使用 {{item.use_num}} 人
				</div>
				<div class="flex flex-ai-center">
					<div class="cl3 f12">截止：{{item.etime}}</div>
					<div class="flex-1"></div>
					<div class="btn-small mgr-10" @click="getCoupon(item.id)" >领取</div>
					
				</div>
			</div>
		</div>
	</view> 
</template>

<script> 
	export default{
		data:function(){
			return {
				pageData:{},
				pageLoad:false
			}
		},
		created:function(){
			this.getPage();
		},
		methods:{
			
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/coupon/index",
					dataType:"json",
					success:function(res){
						that.pageData=res.data;
						that.pageLoad=true;
					}
				})
			},
			getCoupon:function(id){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/coupon/getcoupon?id="+id,
					dataType:"json",
					success:function(res){
						uni.showToast({
							title:res.message,
							icon:"none"
						})
						 
					}
				})
			},
		}
	}
</script>

<style>
 
</style>
