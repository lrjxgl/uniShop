<template>
	<view>
		 
		<div :class="show==true?'dtui-select-active':''" class="dtui-select  mgr-5" name="id">
			<div  @click="show=true" class="dtui-select-option flex flex-ai-center" :value="item.k">
				<view class="flex-1">{{item.v}}</view>
				<view class="iconfont cl3 icon-unfold"></view>
			</div>
			<div class="dtui-select-box">
				<div :class="item.k==0?'dtui-select-option-active':''" @click="setItem(0,'请选择')" class="dtui-select-option" value="0">请选择</div>
				<div :class="item.k==c.id?'dtui-select-option-active':''"  @click="setItem(c.id,c.title)" class="dtui-select-option" v-for="(c,i) in list" :key="i"  :value="c.id">{{c.title}}</div>
			</div>
			
		</div>
	</view>
</template>

<script>
	export default{
		props:{
			list:{},
			val:0
		},
		data:function(){
			return {
				show:false,
				item:{
					k:0,
					v:"请选择"
				},
				
			}
		},
		created:function(){
			var val=this.val;			
			if(val!=0){			 
				for(var i in this.list){									 
					if(this.list[i].id==val){						
						this.item={
							k:this.list[i].id,
							v:this.list[i].title
						};
						this.$emit("call-parent",this.item.k);
						break;
					}
					
				}
			}
			console.log(this.list);
		},
		methods:{
			
			setItem:function(k,v){
				this.show=false;
				this.item={
					k:k,
					v:v
				}
				this.$emit("call-parent",this.item.k);
			}
		}
	}
</script>

<style>
	.dtui-select{
		border: 1px solid #ddd;
		height: 30px;
		line-height: 30px;
		flex:1;
		padding: 0px 10px;
		position: relative;
	}
	.dtui-select-box{
		display: none;
		
	}
	.dtui-select-active .dtui-select-box{
		z-index: 999;
		display: flex;
		flex-direction: column;
		position: absolute;
		top:30px;
		left: 0;
		right: 0;
		background-color: #fff;
		border: 1px solid #eee;
		padding: 5px;
	}
	.dtui-select-option{
		height: 30px;
		line-height: 30px;
		padding-left: 10px;
	}
	.dtui-select-option-active{
		color: #f60;
	}
</style>
