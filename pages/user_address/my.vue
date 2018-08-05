<template>
	<view class="bg-a">
			<view v-if="pageData.rscount==0">
				<view class="emptyData">暂无地址</view>
			</view>
			<view v-else>
				<view class="row-box" v-for="(item,index) in pageData.list" :key="index">
					<view class="flex-table">
							<view class="flex-table-label">姓名</view>
							<view class="flex-table-box">{{item.truename}}</view>
					</view>
					<view class="flex-table">
	
						<view class="flex-table-label">手机 </view>
						<view class="flex-table-box">{{item.telephone}} </view>
					</view>
					<view class="flex-table">
	
						<view class="flex-table-label">详细地址 </view>
						<view class="flex-table-box">{{item.address}} </view>
					</view>
	
					<view class="flex center">
						 
							<view class="btn btn-info mgr-10" @click="goEdit(item.id)">编辑</view> 
							<view class="btn btn-danger" @click="del(item.id)">删除</view>
						 
					</view>
				</view>
			</view>	
	</view> 
</template>

<script> 
	var app= require("../../common/common.js"); 
	import mtFooter from "../../components/footer.vue";
	var per_page=0;
	var isfirst=true;
	var catid=0;
	var activeClass="list-side-item-active";
	export default{
		components:{
			mtFooter
		},
		data:{
			pageLoad:false, 
			pageData:{},
			winHeight:600,
			defaultActive:"list-side-item-active",
		},
		onLoad:function(option){
			var win=uni.getSystemInfoSync();
			this.winHeight=win.windowHeight-50;
			uni.setNavigationBarTitle({
				title: '资讯'
			});
			this.getPage();
		},
		onReachBottom:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.refresh();
		},
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=user_address&a=my&ajax=1",
					data:{
						fromapp:app.fromapp(),
						authcode:app.getAuthCode()
					},
					success:function(data){
						isfirst=false;
						that.pageData=data.data.data;
						per_page=data.data.data.per_page; 
					}
				})
			},
		 
			getList:function(){
				var that=this;
				if(!isfirst && per_page==0) return false;
				uni.request({
					url:app.apiHost+"?m=user_address&a=my&ajax=1",
					data:{
						per_page:per_page,
						fromapp:app.fromapp(),
						authcode:app.getAuthCode()
					},
					success:function(data){
						
						if(!data.data.error){
							if(isfirst){
								that.pageData.list=data.data.data.list;
								isfirst=false;
							}else{
								
								that.pageData.list=app.json_add(that.pageData.list,data.data.data.list);
							}
							per_page=data.data.data.per_page;  
							
						}
						
						
					}
				})
			},
			 
			refresh:function(){
				this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
			loadMore:function(){
				this.getList();
			},
			goEdit:function(id){
				uni.navigateTo({
					url:"/pages/user_address/edit?id="+id,
				})
			},
			del:function(id){
				var that=this;
				var id=id;
				uni.showModal({
					content:"删除后不可恢复,确认删除？",
					success:function(ops){
							console.log(ops)
					}
				})
				uni.request({
					url:app.apiHost+"?m=user_address&a=delete&ajax=1&id="+id,
					data:{
						fromapp:app.fromapp(),
						authcode:app.getAuthCode()
					},
					success:function(res){
						if(!res.data.error){
								var list=that.pageData.list;
								var newlist=[];
								for(var i in list){
									if(list[i].id!=id){
										newlist.push(list[i]);
									}
									
								}
		
								that.pageData.list=newlist;
						}
						uni.showToast({
							title:res.data.message,
						})
					}
				})
			}
		},
	}
</script>

<style>
 

.flex-main {
 flex: 1;
 
}

.catlist-item {
  line-height: 40px;
  border-bottom: 1px solid #eee;
  padding-left: 5px;
  overflow: hidden;
  cursor: pointer;
}

.catlist-item.active {
  background-color: #eee;
}

.prolist-item-row-cart .numbox {
  display: none;
}

.prolist-item-row-cart-active .numbox {
  display: block;
}



.prolist-item{
  position: relative;
  padding: 5px 0;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
}

.prolist-item-g-sd1 {
  width: 50px;
  margin-right: 5px;
}

.prolist-item-img {
  width: 50px;
  height: 50px;
}

.prolist-item-g-mn1 {
  flex: 1;
}

.prolist-item-title {
  height: 40px;
  line-height: 20px;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 3px;
}

.prolist-item-row-price {
  line-height: 22px;
  font-size: 16px;
  margin-bottom: 5px;
  
}
.prolist-item-price{
  color: #fa215f;
  margin-right: 5px;
  display: inline-block;
}
.prolist-item-sold-num {
  color: #999;
  font-size: 12px;
  display: inline-block;
}

.numbox {
  padding-top: 5px;
}

.prolist-item-buy-btn {
  display: block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  width: 30px;
  background-color: #83c44e;
  color: #fff;
  border-radius: 50%;
  float: right;
  cursor: pointer;
}

.prolist-item-row-cart-active .prolist-item-buy-btn {
  display: none;
}

.prolist-item-row-sold {
  line-height: 30px;
  height: 30px;
  color: #aaa;
}

.prolist-item-lower_price {
  text-decoration: line-through;
  color: #999;
}

</style>
