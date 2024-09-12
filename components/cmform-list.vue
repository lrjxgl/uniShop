<template>
	<view>
		 
		<view   id="comment-list" class="comment-list">
			<block v-for="(item,key) in cmData.list" :key="key">
				<div class="bdBox">
					<view class="flex mgb-5" >
						<div class="cl-primary f12">{{item.nickname}}：</div>
						<div class="f12" @click="setPid(item.id)">
							{{item.content}}
						</div> 
						 
					</view>
					<view v-if="item.child.length>0" class="cmment-item-child">
						<div class="flex mgb-5" v-for="(cc,ii) in item.child" :key="ii">
							<div class="cl-primary f12">{{cc.nickname}}</div>
							<div class="f12 mgl-5 mgr-5" >回复</div>
							<div  class="cl-primary  f12">{{item.nickname}}：</div>
							<div class="f12" @click="setPid(item.id)">
								{{cc.content}}
							</div> 
						</div>
					</view>
				</div>
				
			</block>
		</view>
		<view v-if="showForm">
			<view class="h100"></view> 
			<div class="modal-mask" @click="hideForm()"></div>
			<view class="comment-formbox-list">
				 
				<form @submit="cmFormSubmit" class="pd-10">
					<view class="none">
						<input type="text" name="tablename" :value="tablename" />
						<input type="text" name="objectid" :value="objectid" />
						<input type="text" name="pid" :value="pid" />
					</view>
					<div class="flex">
						<input class="input-flex-text"  type="text" name="content" />
						<button formType="submit" class="input-flex-btn">发评论</button>
					</div>
					
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	 
	export default {
		 
		props:{
			tablename:"",
			objectid:"",
			dshowForm:0,
			dItem:""
		},
		data:function(){
			return {
				cmData:{},
				pid:0,
				cmFormClass:"",
				cmBtnClass:"",
				showForm:0,
				item:{}
			}
		},
		created:function(){
			this.item=this.dItem
			this.getList();
			
		},
		watch:{
			dItem(n,o){
				this.dItem=n;
				//this.showForm=n.showForm
			},
			dshowForm(n,o){
				console.log(n)
				this.showForm=n
			}
		},
		methods:{
			hideForm(){
				console.log(this.item)
				this.showForm=0;
				this.$emit("call-parent",this.item);
			},
			setPid(id){
				this.pid=id;
				this.showForm=1;
			},
			getList:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/index/comment/index?tablename="+this.tablename+"&objectid="+this.objectid,
					success:function(res){
						that.cmData=res.data;
					}
				})
			},
			cmFormShow:function(){
				console.log("show");
				this.cmBtnClass="none";
				this.cmFormClass="flex-col";
			},
			cmFormHide:function(){
				console.log("hide");
				this.cmBtnClass="";
				this.cmFormClass="";
			},
			cmFormSubmit:function(e){
				var that=this;
				that.app.post({
					url:that.app.apiHost+"/index/comment/save?ajax=1",
					data:e.detail.value,
					unLogin:true,
					success:function(res){
						if(res.error==1000){
							that.app.showLoginBox(false)
							return false;
						}
						uni.showToast({
							title: res.message,
							duration: 2000,
							icon:"none"
						});
						if(res.error){
							return false;
						}
						that.cmBtnClass="";
						that.cmFormClass="";
						 
						that.pid=0;
						that.hideForm();
						that.getList();
					}
				})
			}
		}
	}
</script>

<style>
.comment-formbox-list{
	position: fixed;
	bottom: 60px;
	left: 0;
	right: 0;
	background-color: #fff;
	border-top: 1px solid #ddd;
	z-index: 999;
}
.cmment-item-child{
	margin-left: 20px;
}
</style>
