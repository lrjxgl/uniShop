module.exports={
	apiHost:"https://kfbc.deitui.com/",
	appRoot:"https://kfbc.deitui.com/uniapp/h5/", 
	urlSuccess:"../b2c_order/success",
	urlFail:"../b2c_order/fail",
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
			url:that.apiHost+"/index.php?m=recharge_wxapp_pay&a=go&ajax=1",
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
						console.log("正在跳转："+that.urlSuccess)
						uni.redirectTo({
							url:that.urlSuccess
						})
						
					},
					fail: function (res) {
						
						uni.redirectTo({
							url:that.urlFail
						}) 
					} 
				});
			}
		})
		// #endif
		// #ifdef MP-ALIPAY
		uni.request({
			url:that.apiHost+"/index.php?m=recharge_alipay_mini&a=PayUrl&ajax=1",
			data:{
				orderno:ops.orderno,
				openid: uni.getStorageSync('openid')
			},
			success:function(res){
				my.tradePay({
				  // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
				  tradeNO: res.data.data.trade_no,
				  success: (res) => {
				    uni.redirectTo({
				    	url:that.urlSuccess
				    })
				  },
				  fail: (res) => {
				    uni.redirectTo({
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
				console.log(p) 
				if(that.paytype=='alipay'){
					var orderInfo=p.data.data;
				}else{
					var orderInfo=p.data;
				}
				uni.requestPayment({
					provider: that.paytype,
					orderInfo: orderInfo, //微信、支付宝订单数据
					success: function (res) {
						uni.redirectTo({
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