<template>
	<div>
		<form v-if="pageLoad" @submit="ratySubmit">
			<input type="text" class="none" name="orderid" :value="pageData.order.orderid" />
		<div class="row-box mgb-5">
			<sky-raty readonly="1" label="质量评价" fields="raty_quality" len="10" :grade="pageData.raty.raty_quality"></sky-raty>
			<sky-raty label="服务评价" fields="raty_service" len="10" :grade="pageData.raty.raty_service"></sky-raty>
			<sky-raty label="配送评价" fields="raty_express" len="10" :grade="pageData.raty.raty_express"></sky-raty>
			
		</div>
		<div class="textarea-flex">
			<div class="textarea-flex-label">评价内容</div>
			<textarea name="content" placeholder="请输入评价内容" :value="pageData.raty.content" class="textarea-flex-text h60"></textarea>
		</div>
		<div class="row-box">
		 
			<div class="flexlist-item" v-for="(item,index) in pageData.proList" :key="index">
				<img class="flexlist-img" :src="item.imgurl+'.100x100.jpg'" />
				<div class="flex-1">
					<div class="flexlist-title">{{item.title}}</div>
					<sky-raty label="" :fields="'ratyPros['+item.id+']'" len="10" :grade="item.raty_grade"></sky-raty>
					
				</div>
			</div>
			 
		</div>
		 
		<button form-type="submit" v-if="pageData.order.israty==0" class="btn-row-submit" id="submit">提交评价</button>
		 
		</form>
	</div>
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
				orderid:0
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
			getPage:function(){
				var that=this;
				uni.request({
					url:that.app.apiHost+"/module.php?m=b2c_order&a=raty&ajax=1&orderid="+this.orderid,
					data:{
						authcode:that.app.getAuthCode()
					},
					success:function(rs){
						var res=rs.data;
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
