<template>
	<view>
		<div class="list">
			
			<div v-if="list.length==0" class="emptyData">暂无优惠券</div>
			 
			<div class="row-box mgb-5" v-for="(item,index) in list" :key="index">
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
				 
				pageLoad:false,
				list:[]
			}
		},
		created:function(){
			this.getPage();
		},
		methods:{
			
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/coupon_user/index",
					unLogin:true,
					success:function(res){
						if(res.error){
							if(res.error==1000){
								that.app.showLoginBox(true);
							}
							return false;
						}
						that.list=res.data.list;
						that.pageLoad=true;
						 
					}
				})
			}
		}  
	}
</script>

<style>
</style>
