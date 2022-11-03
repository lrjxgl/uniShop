<template>
	<view  >
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
				
				<picker-view   style="height: 300px;"   indicator-style="height: 36px; line-height:36px" :value="value" @change="bindChange">
					<picker-view-column class="flex-col">
						<view class="item flex-center" v-for="item in data" :key="item.value">{{item.text}}</view>
					</picker-view-column>
					<picker-view-column class="flex-col">
						<view class="item flex-center" v-for="item in child" :key="item.value">{{item.text}}</view>
					</picker-view-column>
					<picker-view-column class="flex-col">
						<view class="item flex-center" v-for="item in lastchild" :key="item.value">{{item.text}}</view>
					</picker-view-column>
					

				</picker-view>
			</view>
		 
	</view>
</template>

<script>
	const district=require("../common/district.js");
	export default {
		name:"picker-region",
		props: {
			
			defaultProvinceid: 0,
			defaultCityid: 0,
			defaultTownid: 0,
			
		},
		data: function () {
			return {
				
				showClass: "pickerBoxHide",
				data:district.district,				
				child: {},
				lastchild:{},
				pholder:"请选择",
				provinceid:this.defaultProvinceid,
				cityid:this.defaultCityid,
				townid:this.defaultTownid,
				value:[0,0,0],
				spid:0,
				scid:0,
				stid:0,
				saddr:""
			}
		},
		 
		created: function () {
		 
			 
			var pholder="请选择";
			var m=0,n=0,z=0;
		 
			if(this.defaultProvinceid==0){
				this.child=this.data[m]['children'];
				this.lastchild=this.data[m]['children'][n]['children'];
				this.value=[m,n,z]; 
				this.spid=this.data[m].value;
				this.scid=this.child[n].value;
				this.stid=this.lastchild[z].value;
				this.saddr=this.data[m].text+" "+this.child[n].text+" "+this.lastchild[z].text;
				
				return ;
				
			}
			
			for(var i in this.data){
				if(this.data[i].value==this.defaultProvinceid){
					m=i;
					pholder=this.data[i].text;
					 
				}
			}
			
			if(this.data[m]['children']!=undefined){
				var cp=this.data[m]['children'];
				this.child=cp;
				for(var i in cp){
					if(cp[i].value==this.defaultCityid){
						n=i;
						pholder=pholder+" "+cp[i].text;
					}
				}
			}else{
				this.child=[];
			}
			if(this.data[m]['children'][n]['children']!=undefined){
				var zp=this.data[m]['children'][n]['children'];
				this.lastchild=zp;
				for(var i in zp){
					if(zp[i].value==this.defaultTownid){
						z=i;
						pholder=pholder+" "+zp[i].text;
					}
				}
			}else{
				this.lastchild=[];
			}
			m=parseInt(m);
			n=parseInt(n);
			z=parseInt(z);
			this.value=[m,n,z];
			this.spid=this.defaultProvinceid;
			this.scid=this.defaultCityid;			this.stid=this.defaultTownid;
			this.saddr=pholder; 
			this.pholder=pholder;
			
		},
		methods: {
			 
			bindChange: function (e) {
				 
				var m = e.detail.value[0];
				var n=e.detail.value[1];
				var z=e.detail.value[2];
				this.child = this.data[m]['children'];
				this.lastchild=this.data[m]['children'][n]['children'];			
				this.value=[m,n,z];
				this.spid=this.data[m].value;
				this.scid=this.child[n].value;
				this.stid=this.lastchild[z].value;
				this.saddr=this.data[m].text+" "+this.child[n].text+" "+this.lastchild[z].text;
			},
			pickerBoxShow: function(){
				this.showClass = "";
			},
			choiceSelect: function () {
				this.showClass = "pickerBoxHide";
				this.provinceid=this.spid;
				this.cityid=this.scid;
				this.townid=this.stid;
				this.pholder=this.saddr;
				console.log(this.$data)
				this.$emit("callParent",{
					provinceid:this.provinceid,
					cityid:this.cityid,
					townid:this.townid
				})
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
