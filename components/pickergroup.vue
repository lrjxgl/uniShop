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
</template>

<script>
	export default {
		props: {
			data: {},
			defaultGid: 0,
			defaultCatid: 0,
			placeholder: ""
		},
		data: function () {
			return {
				showClass: "pickerBoxHide",
				child: {},
				pholder:this.placeholder,
				gid:this.defaultGid,
				catid:this.defaultCatid,
				value:[0,0]
			}
		},
		created: function () {
			var pholder="请选择";
			var m=0,n=0;
			for(var i in this.data){
				if(this.data[i].gid==this.gid){
					m=i;
				}
				pholder=this.data[m].title;
			}
			if(this.data[m]['child']!=null){
				for(var i in this.data[m]['child']){
					if(this.data[m]['child'][i].catid==this.catid){
						n=i;
						
					}
				}
				this.catid=this.data[m]['child'][n].catid;
				pholder=pholder+" "+this.data[m]['child'][n].title;
			}
			this.child = this.data[m]['child'];
			
			this.gid=this.data[m].gid;
			this.pholder=pholder;
			this.value=[parseInt(m),parseInt(n)];
			this.$emit("callParent",{gid:this.gid,catid:this.catid}); 
		},
		methods: {
			bindChange: function (e) {
				console.log(e.detail.value);
				var m = e.detail.value[0];
				var n=e.detail.value[1];
				this.value=[m,n];
				this.child = this.data[m]['child'];
				var pholder=this.data[m].title;
				
				if(this.data[m]['child']!=null){
					pholder+=this.data[m]['child'][n].title;
					this.catid=this.data[m]['child'][n].catid;
				}else{
					this.catid=0;
				}
				this.gid=this.data[m].gid;
				
				this.pholder=pholder;
				console.log({gid:this.gid,catid:this.catid})
				this.$emit("callParent",{gid:this.gid,catid:this.catid});
			},
			pickerBoxShow: function(){
				this.showClass = "";
			},
			choiceSelect: function () {
				console.log("selected")
				this.showClass = "pickerBoxHide";
			},
			cancel: function () {
				this.showClass = "pickerBoxHide";
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
	.pickerBoxHide{
		position: absolute;
		transform: translate3d(-100%, 0, 0);
	}
</style>
