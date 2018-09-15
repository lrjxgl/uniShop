<template>
	<view class="flex-1">
		<view @click="pickerBoxShow()" class="input-flex-select  flex flex-ai-center">
			<view class="cl3">{{pholder}}</view>
		</view>
		<view :class="showClass">
			<view class="pickerBox-mark"></view>
			<view class="pickerBox">
				<view class="flex mgt-10">
					<view class="cl2" @click="cancel">取消</view>
					<view class="flex-1"></view>
					<view class="cl-success" @click="choiceSelect">确定</view>
				</view>
				<view class="none">
					<input type="text" name="gid" :value="gid" />
					<input type="text" name="catid" :value="catid" />
				</view>
				<picker-view   style="height: 300px;" indicator-style="height: 36px; line-height:36px" :value="value" @change="bindChange">
					<picker-view-column class="flex-col">
						<view class="item flex-center" v-for="item in data" :key="item.gid">{{item.title}}</view>
					</picker-view-column>
					<picker-view-column class="flex-col">
						<view class="item flex-center" v-for="item in child" :key="item.catid">{{item.title}}</view>
					</picker-view-column>

				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {},
			defaultGid: 0,
			defaultCatid: 0,
			placeholder: "请选择"
		},
		data: function () {
			return {
				showClass: "none",
				child: {},
				"pholder":this.placeholder,
				gid:this.defaultGid,
				catid:this.defaultCatid,
				value:[0,0]
			}
		},
		onLoad: function () {
			var pholder="";
			var m=0,n=0;
			for(var i in this.data){
				if(this.data[i].gid==this.gid){
					m=i;
					pholder=this.data[i].title;
				}
			}
			if(this.data[m]['child']!=undefined){
				for(var i in this.data[m]['child']){
					if(this.data[m]['child'][i].catid==this.catid){
						n=i;
						pholder=pholder+" "+this.data[m]['child'][i].title;
					}
				}
			}
			this.child = this.data[m]['child'];
			this.value=[m,n];
			this.pholder=pholder;
			console.log(this.value);
		},
		methods: {
			bindChange: function (e) {
				console.log(e.detail.value);
				var index = e.detail.value[0];
				this.child = this.data[index]['child'];
				var pholder=this.data[index]['title'];
				this.gid = this.data[index].gid;
				if (this.child != undefined) {
					this.catid = this.child[e.detail.value[1]].catid;
					pholder=pholder+" "+this.child[e.detail.value[1]].title;
				} else {
					this.catid = 0;
				}
				this.pholder=pholder;
				
			},
			pickerBoxShow: function(){
				this.showClass = "";
			},
			choiceSelect: function () {
				this.showClass = "none";
			},
			cancel: function () {
				this.showClass = "none";
			}
		}
	}
</script>

<style scoped="">
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
</style>
