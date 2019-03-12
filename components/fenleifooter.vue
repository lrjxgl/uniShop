<template>
	<div>
		<div class="footer-row"></div>
		<div class="footer">
			<div @click="goHome()" v-bind:class="{'footer-active':tab=='home'}" class="footer-item icon-job ">分类信息</div>
			<div @click="goGuest()" v-bind:class="{'footer-active':tab=='guest'}" class="footer-item icon-service_light ">咨询</div>
			<div @click="goUser" v-bind:class="{'footer-active':tab=='user'}" class="footer-item icon-my_light ">我的</div>
		</div>
	</div>
</template> 

<script>
	export default{
		props:{
			tab:""
		},
		data:function(){
			return {
				
			}
		},
		methods:{
			goHome:function(){
				uni.redirectTo({
					url:"../fenlei/index"
				})
			},
			goGuest:function(){
				uni.redirectTo({
					url:"../fenlei_guest/index"
				})
			},
			goUser:function(){
				uni.redirectTo({
					url:"../fenlei/user"
				})
			}
		}
	}
</script>

<style>
</style>
