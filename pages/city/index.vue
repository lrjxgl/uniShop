<template>
	<view>
		<view class="row-box">
			<view class="header-search-box mgb-10">
				<view class="header-search-icon icon-search"></view>
				<input  v-model="keyword" @click="searchShow" @input="search" placeholder="输入城市名搜索" type="search" class="header-search" />				
				<view @click="aaBoxClass=''" :class="aaBoxClass" class="header-search-close icon-close"></view>
			</view>
			<view class="flex mgb-20">
				<view class="iconfont icon-location_light"></view>
				<view class="mgr-5">当前定位城市</view>
				<view class="fwb">{{city}}</view>
			</view>
			<view class="mgb-10 f14 fwb">热门城市</view>
			<view class="rBox">
				<view @click="setCity(item.name)" v-for="(item,index) in recList" :key="index" class="bta">{{item.name}}</view>
			
			</view>
			<view>
				<view v-for="(item,name,index) in cityGroup" :key="name">
					<view :id="'zms'+name" class="f16 zms">{{name}}</view>
					<block  v-for="(cc,cckey) in item.child" :key="cckey">
					<view  @click="setCity(cc.name)" class="row-item-text">
						<div class="row-item-title">{{cc.name}}</div>
					</view>
					</block>
				</view>
			</view>
			<view class="pBox">			
				<view @click="setZm(name)" v-for="(item,name,index) in cityGroup" :key="index" :class="zm==name?'pBox-active':''" class="pBox-item">{{name}}</view>				
			</view>
		</view>
		<scroll-view scroll-y="true" class="aaBox" :class="aaBoxClass">
			<view  @click="setCity(item.name,item.cityid)" v-for="(item,index) in searchList" :key="index" class="flex bd-mp-5">
				<view class="f16 mgb-5 cl1">{{item.name}}</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	var query
	export default{
		data:function(){
			return {
				aaBoxClass:"",
				keyword:"",
				searchList:{},
				city:"厦门",
				cityGroup:{},
				zm:"A",
				zms:{},
				recList:{}
			}
		},
		onLoad:function(){
			query = uni.createSelectorQuery().in(this);
			this.getPage();
			this.city=this.app.getCity();
			
		},
		onPageScroll: function(e) {
			var that = this;
			//e.scrollTop
			var y=e.scrollTop;
			var zms=this.zms;
			for(var el in zms){
				if(zms[el]>y){
					that.zm=el;
					break;
				}
			}
		},
		methods:{
			search:function(){
				var that=this;
				setTimeout(function(){
					that.app.get({
						url:that.app.apiHost+"/city/search?city="+that.keyword,						
						success:function(res){
							that.searchList=res.data.list
						}
					}) 
				},30)
				
			},
			searchShow:function(){
				this.aaBoxClass="flex-col";
			},
			setCity:function(acity,acityid){
				this.app.setCity(acity,acityid);
				 
				this.city=acity;
				uni.navigateBack();
			},
			setZm:function(zm){
				this.zm=zm;
				
				var y=this.zms[zm];
				uni.pageScrollTo({
					scrollTop:y
				})
			},
			getZmsy:function(){
				var that=this;
				var zms=this.zms;
				// #ifdef H5
				for(var el in zms){					
					zms[el] = document.getElementById("zms"+el).offsetTop;
				}
				this.zms=zms;
				console.log(zms);
				// #endif	
				// #ifndef H5
				wx.createSelectorQuery().selectAll('.zms').boundingClientRect(function(rects){
					rects.forEach(function(rect){
						zms[rect.id.replace("zms","")] = rect.top;
					})
					console.log(zms);
				}).exec();
				
				// #endif
				
				
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/city/index",
					success:function(res){
						that.cityGroup=res.data.list;
						var zms=Array();
						for(var i in that.cityGroup){
							zms[i]=0;
						}
						that.zms=zms;
						that.recList=res.data.recList;
						setTimeout(function(){
							that.getZmsy();
						},300)
					}
				})
			}
		}
	}
</script>

<style>
	.header-search-close{
		display:none;
		position:absolute;
		width:30px;
		height:30px;
		right:0px;
		top:0px;
		font-family:iconfont;
		align-items: center;
		 
		flex-direction: row;
		text-align: center;
		justify-content: center;
	}
	.aaBox{
		display:none;
		position:absolute;
		top:50px;
		left:0px;
		right:0px;
		bottom:0px;
		background-color:#fff;
		padding:10px 20px;
		box-sizing: border-box;
	}
	.rBox{
		margin-right: 20px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-bottom: 10px;
	}
	.bta{
		width:24%;
		font-size: 12px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-right: 1%;
		margin-bottom: 5px;
		background-color: #eee;
		text-align: center;
		padding: 5px;
		box-sizing: border-box;
	}
	.pBox{
		position: fixed;
		top: 90px;
		right: 0px;
		background-color: #fff;
		padding: 5px;
	}
	/* #ifdef H5 */
	.pBox{
		top:120px
	}
	/* #endif */
	.pBox-item{
 
		text-align: center;
		width: 18px;
		height: 18px;
		line-height: 18px;
		font-size: 12px;
		
	}
	.pBox-active{
		background-color: #eee;
		border-radius: 20px;
	}
</style>
