<template>
	<view>
		{{dateFmt}}
	</view>
</template>

<script>
	export default {
		props: {
			dateline: 0,
			fmt: ""
		},
		data: function() {
			return {
				dateFmt: ""
			}
		},
		created: function() {
			this.dateFmt = this.formatDate(this.dateline, this.fmt);
		},
		methods: {
			formatDate: function(now, fmt) {
				var date = new Date(now * 1000);
				var o = {
					"M+": date.getMonth() + 1, //月份 
					"d+": date.getDate(), //日 
					"h+": date.getHours(), //小时 
					"m+": date.getMinutes(), //分 
					"s+": date.getSeconds(), //秒 
					"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
					"S": date.getMilliseconds() //毫秒 
				};
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt))
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[
							k]).length)));
				return fmt;
			}
		}
	}
</script>

<style>
</style>
