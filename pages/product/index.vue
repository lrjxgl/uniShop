<template>
	<view v-if="pageLoad" class="flex">
		<view class="list-side">
			<view  @click="setCat(0)" class="list-side-item" v-bind:class="defaultActive">推荐</view>
			<view @click="setCat(item.catid)" v-bind:class="{ 'list-side-item-active':item.isactive }" v-for="(item,key) in pageData.catlist" :key="key" class="list-side-item">{{item.cname}}</view>
			 
		</view>
		<view class="flex-main">
			
				<view  class="prolist-item" v-for="(item,key) in pageData.list" :key="key">
					 
					<image @click="goProduct(item.id)" class="prolist-img" :src="item.imgurl+'.100x100.jpg'"></image>
					 
					<view class="prolist-flex-1">
						<view @click="goProduct(item.id)" class="prolist-title">{{item.title}}</view>
						<view class="prolist-row-price">
							价格：<text class="prolist-price">￥{{item.price}}</text>
							<view class="flex-1"></view>
							<view class="fr cor2">{{item.buy_num}}件已售</view>
							 
						</view>	
						<view class="prolist-cart">
							<view class="flex-1"></view>
							<view v-if="item.isksid">
								<view @click="addCart(item.id)" v-if="item.cart_num==0" class="prolist-buy-btn">选规格</view>
							</view>
							<view class="pdb-5" v-else>	
								<view v-if="item.cart_num>0" class="numbox prolist-numbox">
									<view @click="minusCart(item.id,item.cart_num)" class="numbox-minus">-</view>
									<input type="text" name="amount" :value="item.cart_num" class="numbox-num" />
									<view @click="plusCart(item.id,item.cart_num)" class="numbox-plus">+</view>	
								</view>
								<view @click="addCart(item.id)" v-if="item.cart_num==0" class="prolist-buy-btn">买</view>
							</view>
						</view>
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
			pageHide:false,
			pageData:{},
			winHeight:600,
			defaultActive:"list-side-item-active",
		},
		onLoad:function(option){
			var win=uni.getSystemInfoSync();
			this.winHeight=win.windowHeight-50;
			uni.setNavigationBarTitle({
				title: '产品'
			});
			this.getPage();
			
		},
		onShow:function(){
			if(this.pageHide){
				this.pageHide=false;
				this.getPage();
			}			
		},
		onHide:function(){
			this.pageHide=true;
		},
		onPullDownRefresh:function(){
			this.refresh();
		} ,
		onReachBottom:function(){
			this.getList();
		},
		methods:{
			getPage:function(){
				var that=this;
				uni.request({
					url:app.apiHost+"?m=product&ajax=1",
					data:{
						authcode:app.getAuthCode()
					},
					success:function(data){
						isfirst=false;
						that.pageLoad=true;
						that.pageData=data.data.data;
						per_page=data.data.data.per_page; 
					}
				})
			},
			setCat:function(cid){
				catid=cid;
				isfirst=true;
				per_page=0;
				if(catid==0){
					this.defaultActive=activeClass;
				}else{
					this.defaultActive="";
				}
				var catlist=this.pageData.catlist;
				for(var i in catlist){
					if(catlist[i].catid==catid){
						catlist[i].isactive=1;
					}else{
						catlist[i].isactive=0;
					}
				}
				this.pageData.catlist=catlist;
				this.getList();
			 },
			getList:function(){
				var that=this;
				if(!isfirst && per_page==0) return false;
				uni.request({
					url:app.apiHost+"?m=product&ajax=1",
					data:{
						per_page:per_page,
						catid:catid,
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
			goProduct:function(id){
				uni.navigateTo({
					url:"/pages/product/show?id="+id
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
			addCart:function(id,ksid){
				 var that=this;
				 var id=id;
				 var ksid=ksid==undefined?0:ksid;
				  uni.request({
					url: app.apiHost +'?m=order_cart&a=add&fromapp=wxapp&ajax=1&object_id='+id,
					data: {
					  authcode:app.getAuthCode(),
					  ksid:ksid
					},
					method: 'GET', 
					success: function(res){
						var list= that.pageData.list;
						 for(var i=0;i<list.length;i++){
						   if(list[i].id==id){
							  list[i].cart_num=res.data.product_amount;
							  break;
						   }
						 }
						that.pageData.list=that.parseList(list);
					} 
				  })
			},
			plusCart:function(id,amount,ksid){
				 var that=this;
				 var id=id;
				 var amount=amount;
				 var ksid=ksid==undefined?0:ksid;
				 amount++;
				 uni.request({
					url: app.apiHost +'/index.php?m=order_cart&a=add&fromapp=wxapp&ajax=1',
					data: {
					  authcode:app.getAuthCode(),
					  object_id:id,
					  amount:amount,
					  isplus:1,
					  ksid:ksid
					},
					method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					// header: {}, // 设置请求的 header
					success: function(res){
					 var list= that.pageData.list;
					 for(var i=0;i<list.length;i++){
					   if(list[i].id==id){
						  list[i].cart_num=res.data.product_amount;
						  break;
					   }
					 }
					 that.pageData.list=that.parseList(list);
 
					}
				 })
			},
			minusCart:function(id,amount,ksid){
				 var that=this;
				 var id=id;
				 var amount=amount;
				 var ksid=ksid==undefined?0:ksid;
				 amount--;
				 var isdelete=0;
				if(amount==0){
					isdelete=1
				}
				 uni.request({
					url: app.apiHost +'?m=order_cart&a=add&fromapp=wxapp&ajax=1',
					data: {
					  authcode:app.getAuthCode(),
					  amount:amount,
					  isdelete:isdelete,
					 isminus:1,
					 object_id:id,
					 amount:amount,
					},
					method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					// header: {}, // 设置请求的 header
					success: function(res){
					 var list= that.pageData.list;
					 for(var i=0;i<list.length;i++){
					   if(list[i].id==id){
						  list[i].cart_num=res.data.product_amount;
						  break;
					   }
					 }
					 that.pageData.list=that.parseList(list);
					 
					}
				  })
			},
			parseList:function(list){
				   for(var i=0;i<list.length;i++){
					   if(list[i].cart_num>0){
						  list[i].cart_num_class="prolist-item-row-cart-active";
					   }else{
						  list[i].cart_num_class="";
					   }
					 }
					 return list;
			}
		}
	}
</script>

<style>
	.flex{
		display: flex;
	}
	.list-side {
		position: fixed;
		left: 0px;
		top: 0px;
		bottom: 132px;
		width: 154px;
		padding-top: 20px;
		border-right: 2px solid #eee;
		text-align: center;
	}

	.list-side-item {
		color: #707070;
		margin-bottom: 22px;
		padding-bottom: 22px;
		border-bottom:1px solid #eee;
		font-size: 36px;
		display: block;
	}

	.list-side-item-active {
		color: #ff842b;
		border-left: 6px solid #ff842b;
	}


.flex-main {
 flex: 1;
 margin-left: 200px;
}
 



.prolist-item{
  position: relative;
  padding: 5px 10px 5px 0px;
  border-bottom: 1px solid #e4e4e4;
	margin-bottom: 5px;
  display: flex;
	flex-direction: row;
}

 

.prolist-img {
  width: 110px;
  height: 110px;
  margin-right: 22px;
}

.prolist-flex-1 {
  flex: 1;
}
.prolist-row{
	
}
.prolist-title {
  height: 76px;
  line-height: 76px;
  font-size: 30px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 12px;
}

.prolist-row-price {
  line-height: 22px;
  font-size: 32px;
  margin-bottom: 20px;
  flex-direction: row;
}
.prolist-price{
  color: #fa215f;
  margin-right: 5px;
  display: inline-block;
 
}

.prolist-cart{
	padding-right: 5px;
	flex-direction: row;
}

.prolist-sold-num {
  color: #999;
  font-size: 12px;
  display: inline-block;
}

.prolist-numbox{
	float: right;
	margin-right: 10px;
} 

.prolist-buy-btn {
  display: block;
  height: 66px;
  line-height: 66px;
  text-align: center;
  width: 66px;
  background-color: #83c44e;
  color: #fff;
  border-radius: 50%;
  float: right;
  margin-right: 10px;
  cursor: pointer;
}

 

.prolist-row-sold {
  line-height: 30px;
  height: 30px;
  color: #aaa;
}

.prolist-market-price {
  text-decoration: line-through;
  color: #999;
}

</style>