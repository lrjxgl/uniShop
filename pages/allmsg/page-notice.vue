<template>
	<view>
		<div>
			<div v-if="list.length==0" class="emptyData">暂无消息</div>
			<div v-else class="list ">
				 
				<div v-for="(item,index) in list" :key="index" class="row-box mgb-5">
					<div class="flex bd-mp-5">
						<div class="cl-status">{{item.status_name}}</div>
						<div class="flex-1"></div>
						<div class="f12 cl2">{{item.timeago}}</div>
					</div>
					<rich-text :nodes="item.content" class="cl3 bd-mp-5"></rich-text>
					<div class="flex">
						<div class="flex-1"></div>
						<div @click="read(item)" class="btn-mini btn-outline-primary mgr-5">已阅</div>
						<div @click="goLink(item.linkdata)" class="btn-mini btn-outline-primary">去查看</div>
					</div>
				</div>
				 
				 
			</div>
		</div>
	</view>
</template>

<script>
	function parseLink(ops){
		var $root=""
		if(ops.path=="/"){
			$root="../../pages/";
		}
		var m="";
		var a=ops.a;
		console.log(ops.m.substr(0,4));
		var arr=ops.m.split("_");
		if(ops.m.substr(0,4)=="mod_"){
			var mm=arr[1];
			m=ops.m.substr(4,ops.m.length);
			switch(mm){
				case "sblog":
					$root="../../page"+mm;
					break;
				default:
					$root="../../"+mm;
					break;
			}
		}
		var url=$root+"/"+m+"/"+a+"?"+ops.param;
		return url;
	}
	export default{
		data:function(){
			return {
				pageLoad:false,
				list:[],
				per_page:0,
				isFirst:true,
				catid:0,
				type:"all"
			}
		},
		created:function(){
		 
			this.getPage();
		},
		methods:{
			goLink:function(ops){
				var url=parseLink(ops);
				console.log(url)
				uni.navigateTo({
					url:url
				})
				
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/notice/index",
					data:{
						type:this.type
					},
					dataType:"json",
					success:function(res){
						if(res.error){
							skyToast(res.message);
							return false;
						}
						that.list=res.data.data;
						that.isFirst=false;
						that.per_page=res.data.per_page;
						that.pageLoad=true;
					}
				})
			},
			getList:function(){
				var that=this;
				if(that.per_page==0 && !that.isFirst){
					return false;
				}
				that.app.get({
					url:that.app.apiHost+"/notice/index",
					data:{
						type:this.type,
						per_page:that.per_page
					},
					dataType:"json",
					success:function(res){
						if(res.error){
							skyToast(res.message);
							return false;
						}
						if(that.isFirst){
							that.list=res.data.data;
							that.isFirst=false;
						}else{
							for(var i in res.data.data){
								that.list.push(res.data.data[i]);
							}
						}
						
						
						that.per_page=res.data.per_page;
						 
					}
				})
			},
			read:function(item){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/notice/ReadNotice?ajax=1",
					dataType:"json",
					data:{
						id:item.id
					},
					success:function(res){
						item.isread=1;
						item.status_name="已读";
					}
				})
			}
		}
	}
	
</script>

<style>
</style>
