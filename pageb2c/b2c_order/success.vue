<template>
	<view>
		<view  v-if="order.ispin">
			<div class="row-box mgb-10">
				<div class="text-center fwb">还差{{need_num}}人，赶快邀请好友来拼单吧</div>
				<div @click="showEwm" class="btn-row-submit mgb-10" style="background-color: #e02e24;">邀请好友拼单</div>
				<div @click="goHome()" class="btn-row-submit btn-outline-danger mgt-5 cl1" style="background-color:#f1a7a4">去首页逛逛</div>
				<div class="flex" style="display: none!important;">
					<div class="flex-1 text-center">添加推荐语言</div>
					<div class="flex-1 text-center">面对面扫码拼单</div>
				</div>
			</div>
			<div class="row-box">
				<div class="flex flex-wrap">
					<div></div>
				</div>
				<div gourl="/b2c_order/show?orderid={$order.orderid}" class="row-item">
					<div>订单详情</div>
					<div class="flex-1"></div>
					<div class="f14">订单商品</div>
				</div>
				<div class="row-item-text">
					<div>拼单规则</div>
					<div class="flex-1"></div>
					<div class="mgr-5">好友拼单</div>
					<div class="mgr-5">·</div>
					<div class="mgr-5">人满发货</div>
					<div class="mgr-5">·</div>
					<div>不满退货</div>
				</div>
			</div>
			<div :class="ewmClass" class="modal-group" id="mdEwm">
				<div @click="ewmClass=''" class="modal-mask"></div>
				<div class="modal">
					<div class="flex flex-center">
						<img :src="pt_ewm" mode="widthFix">
					</div>
					<div class="text-center mgb-10 cl-red">让好友扫一扫，或者长按保存分享图片</div>
				</div>
			</div>
		</view>
		<view v-else class="row-box mg-10 bd-radius-10 ">
			<view class="flex flex-center mgb-20 mgt-10">
				<view class="iconfont icon-squarecheck cl-red f36 mgr-5"></view>
				<view class="">
					<view class="f18">恭喜下单成功</view>
					<view class="f14">感谢您的下单！</view>
				</view>
			</view>
			<view class="flex flex-jc-center  mgb-20">
				 
				<view class="btn btn-primary" @click="goHome">返回首页</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data:function(){
			return {
				order:{},
				orderid:0,
				need_num:0,
				ewmClass:"",
				pt_ewm:""
			}
		},
		onLoad:function(ops){
			this.orderid=ops.orderid;
			this.getPage();
		},
		methods:{
			showEwm:function(){
				this.ewmClass="flex-col";
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/b2c_order/success?orderid="+that.orderid,
					success:function(res){
						that.order=res.data.order;
						that.need_num=res.data.need_num;
						that.pt_ewm=res.data.pt_ewm;
					}
				})
			},
			goHome:function(){
				this.app.goHome();
			}
		}
	}
</script>

<style>
</style>
