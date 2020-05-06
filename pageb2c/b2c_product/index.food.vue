<template>
	<view>
		<view class="side" :style="{'top':sideTop+'px'}">
			<view @click="setCat(0)" v-bind:class="catActive" class="side-menu">推荐</view>
			<view @click="setCat(item.catid)" v-bind:class="item.isactive?'cl-money':''" class="side-menu" v-for="(item,index) in pageData.catList" :key="index">{{item.title}}</view>
		</view>
		<view class="main">
			
			<view class="flexlist">
				<view class="flexlist-item" v-for="(item,index) in pageData.list" :key="index">
					<img @click="goProduct(item.id)" class="flexlist-img pointer bd-radius-5" :src="item.imgurl" />
					<view class="flex-1">
						<view @click="goProduct(item.id)" class="flexlist-title pointer">{{item.title}}</view>
						<view class="flex mgb-5">
							<view class="flex-1 cl3">库存 {{item.total_num}}</view>
							<view class="cl3">已售 {{item.buy_num}}</view>
						</view>
						<view class="flex">
							<view class="flex-1"></view>
							<view v-if="item.isksid>0">
								<view @click="ksBox(item.id)" class="btn-small btn-outline-success">选规格</view>
							</view>
							<view class="pdb-5" v-else>
								
								<view v-if="item.incart" class="numbox prolist-numbox">
									<view @click="minusCart(item.id,item.cart_amount)" class="numbox-minus">-</view>
									<input type="text" name="amount" :value="item.cart_amount" class="numbox-num" />
									<view @click="plusCart(item.id,item.cart_amount)" class="numbox-plus">+</view>	
								</view>
								<view @click="addCart(item.id)"  class="btn-buy  iconfont icon-cart" v-else></view>
							</view>
					</view>
					</view>
				</view>
			</view>
			<view     v-if="ksShow">
				<view class="modal-mask" @click="ksHide"></view>
				<view class="modal">
					<view class="modal-header">
						<view class="modal-title">选择款式</view>
						<view class="modal-close icon-close" @click="ksHide"></view>
					</view>
					<view class="modal-body pdt-10">	
						<view class="ksBox mgb-10">
							<view class="kslist mgb-10">
								<view class="kslist-label">{{ksproduct.ks_label_name}}</view>
								<view @click="ks1(item.id)" v-bind:class="{'kslist-active':item.id==ksid1}" class="kslist-item" v-for="(item,index) in ksList" :key="index">{{item.title}}</view>
							</view>
							<view class="kslist">
								<view class="kslist-label">{{ksproduct.ks_label_size}}</view>
								<view class="kslist-item" @click="ks2(item.id)"  v-bind:class="{'kslist-active':item.id==ksid}" v-for="(item,index) in ksList2" :key="index">{{item.size}}</view>
							</view>
						</view>
						<view class="flex">
							<view class="cl2 mgr-10 mgl-10">价格</view>
							<view class="cl-money">￥{{ksproduct.price}}</view>
							<view class="flex-1"></view>
							<view v-if="ksproduct.incart" class="numbox prolist-numbox">
								<view @click="ksMinusCart(ksproduct.id,ksproduct.cart_amount)" class="numbox-minus">-</view>
								<input type="text" name="amount" :value="ksproduct.cart_amount" class="numbox-num" />
								<view @click="ksPlusCart(ksproduct.id,ksproduct.cart_amount)" class="numbox-plus">+</view>	
							</view>
							<view @click="ksAddCart(ksproduct.id)"  class="btn-buy iconfont icon-cart" v-else></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<b2c-footer tab="product"></b2c-footer>
	</view>
</template>

<script>
	var catid=0;
	var isFirst=true;
	var per_page=0;
	import b2cFooter from "../../components/b2cfooter.vue";
	export default{
		components:{
			b2cFooter
		},
		data:function(){
			return {
				pageData: {},
				pageLoad:false,
				sideTop:44,
				show:"flex",
				catActive:"cl-money",
				ksShow:false,
				ksproduct:[],
				ksList:[],
				ksList2:[],
				ksid:0,
				ksid1:0,
				ksid2:0
			}
		},
		onLoad: function() {
			uni.setNavigationBarTitle({
				title:"点餐"
			})
			// #ifndef H5
			this.sideTop=0;
			// #endif
			this.getPage();
		},
		onReachBottom:function(){
			this.getList();
		},
		methods: {
			goProduct:function(id){
				uni.navigateTo({
					url:"../b2c_product/show?id="+id
				})
			},
			getPage: function() {
				var that = this;
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_product&ajax=1",
					data:{
						authcode:that.app.getAuthCode()
					},
					success:function(rs){
						var res=rs.data;
						per_page=res.data.per_page;
						that.pageData = res.data;
						that.pageLoad=true;
					}
				})
				 
			},
			getList:function(){
				var that=this;
				if(per_page==0 && !isFirst){
					return false;	
				}
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_product&ajax=1",
					data:{
						catid:catid,
						authcode:that.app.getAuthCode()
					},
					dataType:"json",
					success:function(rs){
						
						var res=rs.data;
						per_page=res.data.per_page;
						for(var i in res.data.catList){
							if(res.data.catList[i].catid==catid){
								res.data.catList[i].isactive=1;
							}else{
								res.data.catList[i].isactive=0;
							}
						}
						if(!isFirst){
							var list=that.pageData.list;
							if(res.data.list.length>0){
								list=that.app.json_add(list,res.data.list);
								res.data.list=list;
							}
							
						}
						isFirst=false;
						that.pageData = res.data;
					}
				})
			},
			setCat:function(cid){
				var that=this;
				catid=cid;
				if(catid==0){
					that.catActive="cl-money";
				}else{
					that.catActive='';
				}
				isFirst=true;
				per_page=0;
				this.getList();
			},
			addCart: function(id, ksid) {
				var that = this;
				var id = id;
				var ksid = ksid == undefined ? 0 : ksid;
				var amount = 1;
				uni.request({
					url: that.app.apiHost+'/module.php?m=b2c_cart&a=add&ajax=1',
					data: {
						productid: id,
						amount: amount,
						ksid: ksid,
						authcode:that.app.getAuthCode()
					},
					method: 'GET',
					dataType: "json",
					success: function(rs) {
						var res=rs.data;
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						var list = that.pageData.list;
						for (var i = 0; i < list.length; i++) {
							if (list[i].id == id) {
								if (res.data.amount > 0) {
									list[i].incart = 1;
								}
								list[i].cart_amount = res.data.amount;
								break;
							}
						}
						that.pageData.list = that.parseList(list);
					}
				})
			},
			plusCart: function(id, amount, ksid) {
				var that = this;
				var id = id;
				var amount = amount;
				var ksid = ksid == undefined ? 0 : ksid;
				amount++;
				uni.request({
					url: that.app.apiHost+'/module.php?m=b2c_cart&a=add&ajax=1',
					data: {
						productid: id,
						amount: amount,
						ksid: ksid,
						authcode:that.app.getAuthCode()
					},
					method: 'GET',
					dataType: "json",

					success: function(rs) {
						var res=rs.data;
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						var list = that.pageData.list;
						for (var i = 0; i < list.length; i++) {
							if (list[i].id == id) {

								list[i].cart_amount = res.data.amount;
								break;
							}
						}

						that.pageData.list = that.parseList(list);
					}
				})
			},
			minusCart: function(id, amount, ksid) {
				var that = this;
				var id = id;
				var amount = amount;
				var ksid = ksid == undefined ? 0 : ksid;
				amount--;
				var isdelete = 0;
				if (amount == 0) {
					isdelete = 1
				}
				uni.request({
					url: that.app.apiHost+'/module.php?m=b2c_cart&a=add&ajax=1',
					data: {
						productid: id,
						amount: amount,
						ksid: ksid,
						isdelete: isdelete,
						authcode:that.app.getAuthCode()
					},
					method: 'GET',
					dataType: "json",

					success: function(rs) {
						var res=rs.data;
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						var list = that.pageData.list;
						for (var i = 0; i < list.length; i++) {
							if (list[i].id == id) {
								if (res.data.amount == 0) {
									list[i].incart = 0;
								}
								list[i].cart_amount = res.data.amount;
								break;
							}
						}

						that.pageData.list = that.parseList(list);
					}
				})
			},
			parseList: function(list) {
				for (var i = 0; i < list.length; i++) {
					if (list[i].cart_num > 0) {
						list[i].cart_num_class = "prolist-item-row-cart-active";
					} else {
						list[i].cart_num_class = "";
					}
				}
				return list;
			},
			//规格操作
			ksBox:function(id){
				var that=this;
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_product_ks&ajax=1&productid="+id,
					data:{
						authcode:that.app.getAuthCode()
					},
					dataType:"json",
					success:function(rs){
						var res=rs.data;
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						that.ksShow=true;
						that.ksproduct=res.data.product;
						that.ksList=res.data.ksList;
						that.ksList2=res.data.ksList2;
						that.ksid1=res.data.ksid;
						that.ksid=res.data.ksid;
					}
				})
			},
			ksHide:function(){
				this.ksid=0;
				this.ksShow=false;
			},
			ks1:function(id){
				var that=this;
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_product_ks&a=sizeList&ajax=1&id="+id,
					dataType:"json",
					data:{
						authcode:that.app.getAuthCode()
					},	
					success:function(rs){
						var res=rs.data;
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						that.ksid1=res.data.ksid;
						that.ksid=res.data.ksid;
						that.ksproduct=res.data.product;
						that.ksList2=res.data.ksList2;
					}
				})
			},
			ks2:function(id){
				var that=this;
				that.ksid=id;
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_product_ks&a=get&ajax=1&id="+id,
					dataType:"json",
					data:{
						authcode:that.app.getAuthCode()
					},
					success:function(rs){
						var res=rs.data; 
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						that.ksproduct=res.data.product;
						 
					}
				 })
			},
			ksAddCart: function(id) {
				var that = this;
				var id = id;
				var ksid=that.ksid;
				var amount = 1;
				uni.request({
					url: that.app.apiHost+'/module.php?m=b2c_cart&a=add&ajax=1',
					data: {
						productid: id,
						amount: amount,
						ksid: ksid,
						authcode:that.app.getAuthCode()
					},
					method: 'GET',
					dataType: "json",
					success: function(rs) {
						var  res=rs.data;
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						that.ksproduct.incart=1;
						that.ksproduct.cart_amount=res.data.amount; 
					}
				})
			},
			ksPlusCart: function(id, amount) {
				var that = this;
				var id = id;
				var amount = amount;
				var ksid=that.ksid;
				amount++;
				uni.request({
					url: that.app.apiHost+'/module.php?m=b2c_cart&a=add&ajax=1',
					data: {
						productid: id,
						amount: amount,
						ksid: ksid,
						authcode:that.app.getAuthCode()
					},
					method: 'GET',
					dataType: "json",
			
					success: function(rs) {
						var  res=rs.data;
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						that.ksproduct.cart_amount=res.data.amount; 
					}
				})
			},
			ksMinusCart: function(id, amount) {
				var that = this;
				var id = id;
				var amount = amount;
				var ksid=that.ksid;
				amount--;
				var isdelete = 0;
				if (amount == 0) {
					isdelete = 1
				}
				uni.request({
					url: that.app.apiHost+'/module.php?m=b2c_cart&a=add&ajax=1',
					data: {
						productid: id,
						amount: amount,
						ksid: ksid,
						isdelete: isdelete,
						authcode:that.app.getAuthCode()
					},
					method: 'GET',
					dataType: "json",
			
					success: function(rs) {
						var  res=rs.data;
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						if(res.data.amount==0){
							that.ksproduct.cart_amount=0;
							that.ksproduct.incart=0;
						}else{
							that.ksproduct.cart_amount=res.data.amount;
						}
						
					}
				})
			},
		}
	}
</script>

<style>
		.side{
			position: fixed;
			top: 96upx;
			left: 0upx;
			width: 200upx;
			bottom: 110upx;
			background-color: #fff;
		}
		.side-menu{
			cursor: pointer;
			padding: 22upx 11upx;
			border-bottom: 2upx solid #eee;
			color: #646464;
			font-size: 16px;
		}
		.main{
			margin-left: 205upx;
		}
	</style>
