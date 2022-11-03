module.exports={
	apiHost:"https://www.fd175.com/",
	appRoot:"https://www.fd175.com/uniapp/h5/", 
	urlSuccess:"../flk_order/success",
	urlFail:"../flk_order/fail",
	paytype:"alipay",
	pay:function(ops){
		var that=this;
		/**
		 * ops={payurl,orderno}
		 */
		// #ifdef H5
			window.location=ops.payurl;
		// #endif
		// #ifdef MP-WEIXIN
		uni.request({
			url:that.apiHost+"/recharge_wxapp_pay/go?ajax=1",
			data:{
				orderno:ops.orderno,
				openid: uni.getStorageSync('openid')
			},
			success:function(res){
				uni.requestPayment({
					'appId': res.data.appId,
					'timeStamp': res.data.timeStamp,
					'nonceStr': res.data.nonceStr,
					'package': res.data.package,
					'signType': 'MD5',
					'paySign': res.data.paySign,
					success: function (res) {
						
						uni.reLaunch({
							url:that.urlSuccess
						})
						
					},
					fail: function (res) {
						
						uni.reLaunch({
							url:that.urlFail
						}) 
					} 
				});
			}
		})
		// #endif
		 
		// #ifdef APP-PLUS
		uni.request({
			url:that.apiHost+"/index.php?m=recharge_app&a=payurl&ajax=1",
			data:{
				orderno:ops.orderno,
				paytype:that.paytype
			},
			success:function(p){
				 
				if(that.paytype=='alipay'){
					var orderInfo=p.data.data;
				}else{
					var orderInfo=p.data;
				}
				uni.requestPayment({
					provider: that.paytype,
					orderInfo: orderInfo, //微信、支付宝订单数据
					success: function (res) {
						uni.reLaunch({
							url:that.urlSuccess
						})
					},
					fail: function (e) {
						uni.showModal({
						    content: "支付失败,原因为: " + e.errMsg,
						    showCancel: false
						})
						/*
						uni.redirectTo({
							url:that.urlFail
						})
						 */
					}
				});
			}
			
		})
		
		// #endif
	}
}