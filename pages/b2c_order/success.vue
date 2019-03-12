<template>
	<div>
		<div class="row-box mg-10 bd-radius-10 ">
			<div class="flex flex-center mgb-20 mgt-10">
				<div class="iconfont icon-squarecheck cl-red f36 mgr-5"></div>
				<div class="">
					<div class="f18">恭喜下单成功</div>
					<div class="f14">感谢您的下单！</div>
				</div>
			</div>
			<div class="flex flex-jc-center  mgb-20">
				 
				<div class="btn btn-primary" @click="goHome">返回首页</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		methods:{
			goHome:function(){
				this.app.goHome();
			}
		}
	}
</script>

<style>
</style>
