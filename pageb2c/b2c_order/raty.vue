<template>
	<view>
		<form v-if="pageLoad" @submit="ratySubmit">
			<input type="text" class="none" name="orderid" :value="pageData.order.orderid" />
		<view class="row-box mgb-5">
			<view class="none">
				<input type="text" name="raty_quality" :value="raty_quality"/>
				<input type="text" name="raty_service" :value="raty_service"/>
				<input type="text" name="raty_express" :value="raty_express"/>
			</view>
			
			<sky-raty @callParent="setQuality"  label="质量评价" fields="raty_quality" len="10" :grade="raty_quality"></sky-raty>
			<sky-raty @callParent="setService" label="服务评价" fields="raty_service" len="10" :grade="raty_service"></sky-raty>
			<sky-raty @callParent="setExpress" label="配送评价" fields="raty_express" len="10" :grade="raty_express"></sky-raty>
			
		</view>
		<view class="textarea-flex">
			<view class="textarea-flex-label">评价内容</view>
			<textarea name="content" placeholder="请输入评价内容" :value="pageData.raty.content" class="textarea-flex-text h60"></textarea>
		</view>
		<view class="row-box">
		 
			<view class="flexlist-item" v-for="(item,index) in  proList" :key="index">
				<img class="flexlist-img" :src="item.imgurl+'.100x100.jpg'" />
				<view class="flex-1">
					<view class="flexlist-title">{{item.title}}</view>
					<input class="none" type="text" :name="'ratyPros['+item.id+']'" :value="item.raty_grade"/> 
					<sky-raty @callParent="setPros" :keyId="item.id"   len="10" :grade="item.raty_grade"></sky-raty>
					
				</view>
			</view>
			 
		</view>
		 
		<button form-type="submit" v-if="pageData.order.israty==0" class="btn-row-submit" id="submit">提交评价</button>
		 
		</form>
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
				pageLoad:false,
				orderid:0,
				raty_quality:1,
				raty_service:1,
				raty_express:1,
				proList:[]
			}
		},
		onLoad:function(ops){
			uni.setNavigationBarTitle({
				title:"订单评价"
			})
			this.orderid=ops.orderid;
			this.getPage();
		},
		methods:{
			setQuality:function(e){
				this.raty_quality=e.num;
			},
			setService:function(e){
				this.raty_service=e.num;
			},
			setExpress:function(e){
				this.raty_express=e.num;
			},
			setPros:function(e){
				for(var i in this.proList){
					if(this.proList[i].id==e.keyId){
						this.proList[i].raty_grade=e.num;
					}
				}
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=b2c_order&a=raty&ajax=1&orderid="+this.orderid,
					 
					success:function(res){
						if(res.data.raty){
							that.raty_express=res.data.raty.raty_express;
							that.raty_quality=res.data.raty.raty_quality;
							that.raty_service=res.data.raty.raty_service;
						}
						that.proList=res.data.proList;
						that.pageLoad=true; 
						that.pageData=res.data;
					}	
				})
			},
			 
			ratySubmit:function(e){
				var that=this;
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_order&a=ratysave&ajax=1&authcode="+that.app.getAuthCode(),
					data:e.detail.value,
					method:"POST",
					header:{
						"content-type":"application/x-www-form-urlencoded"
					},
					success:function(rs){
						 
						that.getPage();
					}	
				})
			}
		}
	}
</script>

<style>
</style>
