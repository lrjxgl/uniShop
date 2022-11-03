<template>
	<view>
		<div class="list">
			
			<div v-if="listNum==0" class="emptyData">暂无优惠券</div>
			 
			<div class="row-box mgb-5" v-for="(item,index) in pageData.list" :key="index">
				<div class="flex mgb-5">
					<div class=" mgb-5">
						{{item.title}}
					</div>
					<div class="flex-1"></div>
					<div class="cl-primary" v-if="item.status==1">已使用</div>
					<div class="cl-primary"  v-else>未使用</div>
				</div>
				<div class="flex">					 
					<div class="cl2 f12">截止时间：{{item.end_time}}</div>
					<div class="flex-1"></div>
					<div class="cl2 f12 mgb-5">
						金额 {{item.money}}元						
					</div>
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
				pageLoad:false,
				listNum:0
			}
		},
		created:function(){
			this.getPage();
		},
		methods:{
			
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/coupon_user/index",
					dataType:"json",
					success:function(res){
						that.pageData=res.data;
						that.pageLoad=true;
						that.listNum=Object.keys(that.pageData.list).length;
					}
				})
			}
		}  
	}
</script>

<style>
</style>
