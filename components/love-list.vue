<template>
	<view>
		<div v-if="list.length>0" class="mgb-5 flex flex-wrap">
			<span class="iconfont icon-like cl-red mgr-5"></span>
			<div class="mgr-5" v-for="(item,index) in list" :key="index">
				<span class="cl-primary">{{item.nickname}}</span>
			</div>
		</div>
	</view>
</template>

<script>
	export default{
		props:{
			tablename:"",
			objectid:"",
			love_num:0
			 
		},
		data(){
			return {
				list:[],
				rscount:0,
				per_page:0,
				isFirst:true
			}
		},
		created(){
			this.getPage();
		},
		watch:{
			love_num(n){
				this.getPage()
			}
		},
		methods:{
			getPage(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/love/index",
					data:{
						tablename:this.tablename,
						objectid:this.objectid
					},
					success:function(res){
						that.list=res.data.list;
						that.rscount=res.data.rscount;
						that.per_page=res.data.per_page;
						that.isFirst=false;
					}
				})
			},
			getList(){
				var that=this;
				if(!that.isFirst && that.per_page==0){
					return false;
				}
				that.app.get({
					url:that.app.apiHost+"/index/love/index",
					data:{
						per_page:this.per_page,
						tablename:this.tablename,
						objectid:this.objectid
					},
					success:function(res){
						if(res.error){
							uni.showToast({
								title:res.message,
								icon:"none"
							})
							return false;
						}
						if(that.isFirst){
							that.list=res.data.list;
							that.isFirst=false;
						}else{
							//var list=[];
							for(var i in res.data.list){
								that.list.push(res.data.list[i]);
							}
						}
						
						that.rscount=res.data.rscount;
						that.per_page=res.data.per_page;
						that.isFirst=false;
					}
				})
			},
			
			 
		}
	}
</script>

<style>
</style>