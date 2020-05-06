<template>
	<div class="row-box mgb-5"   v-if="pageData.rscount>0">
		<div class="flex mgb-10" @click="goRaty" >
			
			<div class="cl2">商品评价 ({{pageData.rscount}})</div>
			<div class="flex-1"></div>
			<div class="f12 cl-money">查看全部</div>
			<div class="iconfont cl-money icon-right f14 cl3"></div>
		</div>
		<div class="bd-mp-5" v-for="(item,index) in pageData.list" :key="index" >
			<div class="flex mgb-5 flex-ai-center">
				<img :src="item.user_head+'.100x100.jpg'" class="wh-30 mgr-5" />
				<div class="flex-1">
					<div class="flex-1 f12 cl3">{{item.nickname}}</div>
					<sky-raty len="10" readonly="true" :grade="item.raty_grade"></sky-raty>
					<div class="cl2 f12">
						{{item.raty_content}}
					</div>
				</div>
				
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import skyRaty from "./skyraty.vue";
	export default{
		components:{
			skyRaty
		},
		props:{
			productid:0
		},
		data:function(){
			return {
				pageData:{}
			}
		},
		created:function(){
			this.getPage();
		},
		methods:{
			goRaty:function(){
				uni.navigateTo({
					url:"raty?productid="+this.productid
				})
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_product&a=raty&ajax=1&limit=1&id="+this.productid,
					dataType:"json",
					success:function(res){
						that.pageData=res.data;
					}
				})
			}
		}
	}
</script>

<style>
</style>
