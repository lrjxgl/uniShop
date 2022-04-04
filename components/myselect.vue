<template>
	<view class="flex-1">
		<view @click="pickerBoxShow()" class="input-flex-select  flex flex-ai-center">
			<view class="cl3">{{pholder}}</view>
			<view class="none">
				<input type="text" v-bind:name="field" :value="sid" />
				 
			</view>
		</view>
		 
			<view class="pickerBox-mark" v-bind:class="showClass"></view>
			<view class="pickerBox" v-bind:class="showClass">
				<view class="flex mgt-10">
					<view class="cl2" @click="cancel">取消</view>
					<view class="flex-1"></view>
					<view class="cl-success" @click="choiceSelect">确定</view>
				</view>
				
				<picker-view   style="height: 300px;"   indicator-style="height: 36px; line-height:36px" :value="value" @change="bindChange">
					<picker-view-column class="flex-col">
						<view class="item flex-center" v-for="(item,index) in data" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		 
	</view>
</template>

<script>
	export default {
	 
		props:{
			list:{},
			field:"",
			defaultValue:0,
		},
		data() {
			return {
				showClass: "pickerBoxHide",
				data:this.list,
				pholder:"请选择",
				sid:this.defaultValue,
				value:[0]
			};
		},
		created:function(){
			this.init();
		},
		watch:{
			list:function(n,o){
				this.data=n;
				this.sid=this.defaultValue;
				this.init();
			}
		},
		methods:{
			init:function(){
				var m=0;
				var i=0;
				var sid=0;
				console.log(this.sid)
				for(var key in this.data){
					
					if(i==0){
						sid=key;
					}
					if(key==this.sid){
						m=key;
						break;
					}
					i++;
				}
				
				if(m>0){
					this.pholder=this.data[m];
					this.sid=m;
				}else{
					this.sid=sid;
				}
			},
			bindChange: function (e) {				 
				var m = e.detail.value[0];
				
				var i=0;
				for(var key in this.data){				 
					if(i==m){
						this.sid=key;
						break;
					}
					i++;
				}
				this.$emit("call-parent",this.sid)
				 
			},
			pickerBoxShow: function(){
				this.showClass = "";
			},
			choiceSelect: function () {
				this.pholder=this.data[this.sid];
				this.showClass = "pickerBoxHide";
				 
			},
			cancel: function () {
				this.showClass = "pickerBoxHide";
			}
		}
	}
</script>

<style>
.input-flex-select{
		width: 100%;
	}
	
	.pickerBox-mark {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0px;
		background-color: #000;
		opacity: 0.1;
		z-index: 98;
	}

	.pickerBox {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		padding: 10px 20px;
		background-color: #fff;
	}
	.pickerBoxHide{
		position: absolute;
		transform: translate3d(-100%, 0, 0);
	}
</style>
