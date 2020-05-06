<template>
	<view>
		<view class="raty-group" :class="gclass" >
			<view class="raty-label" v-if="label">{{label}}</view>
			
			<view class="raty-row">
				<view class="raty-item">
					<view class="raty-no" @click="setRaty(index)" v-for="(item,index) in items" :key="index"></view> 
					<view class="raty-num">{{num}}</view>
				</view>
				<view class="raty-item">
					<view  v-for="(item,index) in gradeItems" @click="setRaty(index)" :key="index" class="raty-yes"></view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		 
		props:{
			len:0,
			grade:0,
			label:'',
			mod:0,
			readonly:0,
			keyId:""
		},
		data:function(){
			return {
				num:0,
				items:[],
				gradeItems:[],
				half: false,
				gclass: "mgb-10"
			}
		},
		created:function(){
			 
			if (this.groupclass != undefined) {
				this.gclass = this.groupclass;
			}
			var items = [];
			var len = this.len;
			if (len == 0) {
				len = 5;
			}
			for (var i = 0; i < len; i++) {
				items.push(i);
			}
			this.items = items;
			var mod = 1;
			if (this.mod != undefined) {
				mod = this.mod;
			}
			if (this.grade % mod != 0) {
				console.log("mod")
				this.half = true;
			}
			var num = parseInt(this.grade / mod);
			
			var gradeItems = [];
			for (var i = 0; i < num; i++) {
				gradeItems.push(i);
			}
			this.num = this.grade;
			this.gradeItems = gradeItems;
		},
		methods:{
			setRaty:function(index){
				if (this.readonly) {
					return false;
				}
				var gradeItems = [];
				var num = index + 1;
				for (var i = 0; i < num; i++) {
					gradeItems.push(i);
				}
				var mod = 1;
				if (this.mod != undefined) {
					mod = this.mod;
				}
				this.num = num * mod;
				this.half = false;
				this.gradeItems = gradeItems;
				console.log(this.num);
				this.$emit("callParent",{
					keyId:this.keyId,
					num:this.num
				});
			}
		}
	}
</script>

<style>
	.raty-num{
		margin-left: 3px;
	} 
	 
</style>
