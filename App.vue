<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("common/iconfont.css");
	@import url("common/dt-ui-uni.css");

	/*修复uniapp flex*/
	.uni-app--maxwidth {
		max-width: 640px;
		margin: 0 auto;
	}

	
	.uni-page-head {
		display: flex;
		flex-direction: row;
	}

	.uni-tabbar,
	.uni-picker-view-wrapper {
		flex-direction: row !important;
	}

	.uni-swiper-dots {
		flex-direction: row;
	}

	.uni-scroll-view>div {
		flex-direction: row;
	}

	.uni-modal__ft {
		flex-direction: row;
	}

	.input-flex-btn {
		z-index: 2;
	}

	.flexIcon {
		display: flex;
	}

	.uni-modal__ft {
		flex-direction: row;
	}

	.input-flex-btn {
		z-index: 2;
	}

	.rankLogo {
		width: 30px;
		height: auto;
		max-height: 30px;
	}

	.my-h-cl {
		color: #fff;
	}

	.mgb-30 {
		margin-bottom: 30px;
	}
	.btn3{
			background-color:#aaa;
		}
</style>