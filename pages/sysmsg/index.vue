<template>
	<view>
		<div>
			 
			<div v-if="list.length==0" class="emptyData">暂无通知</div>
			<div v-else>
				<div v-for="(item,index) in list" :key="index" class="row-box mgb-5">
					<div class="flex mgb-5">
						<div class="cl-status">{{item.status_name}}</div>
						<div class="flex-1"></div>
						<div class="f12 cl3">{{item.createtime}}</div>
					</div>
					<div class="mgb-5">{{item.title}}</div>
					<div class="flex">
						<div class="flex-1"></div>
						<div :gourl="'/sysmsg/show?id='+item.id" class="btn-mini mgr-5">查看</div>
						<div @click="del(item)" class="btn-mini btn-danger">删除</div>
					</div>
				</div>
				<div @click="getList()" v-if="per_page>0" class="loadMore">加载更多</div>
			</div>
		</div>
	</view>
</template>

<script>
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
		onLoad:function(){
		 
			this.getPage();
		},
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/sysmsg/index",
					data:{
						type:this.type
					},
					dataType:"json",
					success:function(res){
						if(res.error){
							skyToast(res.message);
							return false;
						}
						that.list=res.data.list;
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
					url:that.app.apiHost+"/sysmsg/index",
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
							that.list=res.data.list;
							that.isFirst=false;
						}else{
							for(var i in res.data.list){
								that.list.push(res.data.list[i]);
							}
						}
						
						
						that.per_page=res.data.per_page;
						 
					}
				})
			},
			del:function(item){
				var that=this;
				skyJs.confirm({
					content:"删除后不可恢复，确认删除码",
					success:function(){
						that.app.get({
							url:that.app.apiHost+"/sysmsg/delete?ajax=1",
							dataType:"json",
							data:{
								id:item.id
							},
							success:function(res){
								var list=[];
								for(var i in that.list){
									if(that.list[i].id!=item.id){
										list.push(that.list[i])
									}
								}
								that.list=list;
							}
						})
					}
				})
				
			}
		}
	}
</script>

<style>
</style>
