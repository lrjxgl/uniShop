<script>
	export default {
		onLaunch: function () {
			
		},
		onLoad:function(){
			console.log("App load");
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
@import "./common/iconfont.css";
@import "./common/dt-ui-uni.css";
 
@import "./common/shop.css";
page{
	background-color: #efefef;
}
.header,.header-row{
	display:none;
}
uni-page-head .uni-page-head-hd{
		flex-direction: row;
	}
	.uni-tabbar{
		flex-direction: row !important;
	}
.uni-page-head__title{
	color: #fff;
}
.uni-swiper .uni-swiper-dots-horizontal{
	flex-direction: row;
}
</style>
