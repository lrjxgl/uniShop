<template>
	<view class="flex-1">
		<view @click="pickerBoxShow()" class="input-flex-select  flex flex-ai-center">
			<view class="cl3">{{pholder}}</view>
		</view>
		 
			<view class="pickerBox-mark" v-bind:class="showClass"></view>
			<view class="pickerBox" v-bind:class="showClass">
				<view class="flex mgt-10">
					<view class="cl2" @click="cancel">取消</view>
					<view class="flex-1"></view>
					<view class="cl-success" @click="choiceSelect">确定</view>
				</view>
				<view class="none">
					<input type="text" name="sc_id" :value="sc_id" />
					 
				</view>
				<picker-view   style="height: 300px;"   indicator-style="height: 36px; line-height:36px" :value="value" @change="bindChange">
					<picker-view-column class="flex-col">
						<view class="item flex-center" v-for="item in data" :key="item.sc_id">{{item.title}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		 
	</view>
</template>

<script>
	export default {
	 
		props:{
			scList:{},
			defaultScid:0,
		},
		data() {
			return {
				showClass: "pickerBoxHide",
				data:this.scList,
				pholder:"请选择",
				sc_id:this.defaultScid,
				value:[0]
			};
		},
		created:function(){
			var m=0;
			var i=0;
			var sdata=[];
			for(var key in this.data){
				sdata.push(this.data[key]);
				if(this.data[key].sc_id==this.sc_id){
					m=i;
				}
				i++;
			}
	 
			this.pholder=sdata[m].title;
			this.data=sdata;
			this.value=[m]; 
		},
		methods:{
			bindChange: function (e) {				 
				var m = e.detail.value[0];
				this.pholder=this.data[m].title;
				this.sc_id=this.data[m].sc_id;
			},
			pickerBoxShow: function(){
				this.showClass = "";
			},
			choiceSelect: function () {
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
