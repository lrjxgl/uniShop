<template>
	<view>
		<div class="row-box">
			<div class="d-title">{{data.title}}</div>
			<div class="flex flex-ai-center mgb-10">
				<div class="f12 cl3">{{data.timeago}}</div>
			</div>
			<div class="d-content" v-html="data.content"></div>
		</div>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				id:0,
				data:{}
			}
		},
		onLoad(ops){
			this.id=ops.id;
			this.getPage();
		},
		methods:{
			getPage(){
				var that=this;
				this.app.get({
					url:this.app.apiHost+"/index/sysmsg/show?id="+this.id,
					success:function(res){
						that.data=res.data.data;
					}
				})
			}
		}
	}
</script>

<style>
</style>