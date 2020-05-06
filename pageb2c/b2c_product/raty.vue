<template>
	<view>
		<div class="row-box mgb-5 none" :class="'flex-col'" id="App">
			
			<div class="bd-mp-5" v-for="(item,index) in pageData.list" :key="index" >
				<div class="flex mgb-5 flex-ai-center">
					<img :src="item.user_head+'.100x100.jpg'" class="wh-30 mgr-5" />
					<div class="flex-1">
						<div class="flex-1 f12 cl3">{{item.nickname}}</div>
						<sky-raty readonly="true" len="10" :grade="item.raty_grade"></sky-raty>
						<div class="cl2 f12">
							{{item.raty_content}}
						</div>
					</div>
					
				</div>
			</div>
			
		</div>
	</view>
</template>

<script>
	import skyRaty from "../../components/skyraty.vue";
	export default{
		components:{
			skyRaty
		},
		data:function(){
			return {
				pageData:{},
				productid:0
			}
		},
		onLoad:function(ops){
			this.productid=ops.productid;
			this.getPage();
		},
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_product&a=raty&ajax=1&id="+this.productid,
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
