<template>
	<view class="w1">
		<view  v-for="(item,index) in nodes" :key="index">
			<view class="flex" v-if="item.type=='audio'" @click="playMusic(item.src)"><view class="iconfont f20 icon-musicfill"></view></view>
			<block v-if="item.type=='video'">
				<view @click="showVideo(item.src)" class="iconfont icon-recordlight f36"></view>
			</block>
			<block v-if="item.type=='img'">
				<image @click="lookImg(item.src)" :src="item.src+'.small.jpg'" mode="widthFix" class="w100"></image>
			</block>
			<block v-if="item.type=='file'">
				<view @click="downFile(item.src)" class="iconfont icon-file f20"></view>
			</block>
			<block v-if="item.type=='gift'">
				<view @click="getGift(item.src)" class="text-center">
					<text class="iconfont animated animated-rotateIn slower infinite cl-red icon-present f20"></text>
					<view>收到神秘礼物</view>
					</view>
			</block>
			<block v-else >
				<rich-text class="flex cl2 f12" :nodes="item.content"></rich-text>
			</block>
			
		</view>
	</view>
</template>

<script>
	import emo from "../common/emo.js";
	import audioClass from "../common/audio.class.js";
	export default{
		props:{
			content:""
		},
		data:function(){
			return {
				nodes:[]
			}
		},
		created:function(){
			var con=this.content;
			
			var res;
			//匹配音乐
			var patt = new RegExp(/\[([^=]*)=([^\]]*)\]/g,"g");
			res=patt.exec(con);
			 
			if(res){
				con=res[2];
				 
				this.nodes=[{
					type:res[1],
					src:con,
					content:""
					
				}]
				
			}else{
				this.nodes=[{
					type:"text",
					content:emo.decodeEmo(this.content)
				}]
			}
			
		},
		methods:{
			lookImg:function(ee){
				uni.previewImage({
				            urls: [ee]
				});
			},
			playMusic:function(url){
				console.log("play music") 
				audioClass.play(url);
			},
			downFile:function(url){
				uni.downloadFile({
					url: url, 
					success: (res) => {
						if (res.statusCode === 200) {
							//console.log('下载成功');
						}
					}
				});
			},
			getGift:function(giftid){
				this.$emit("call-parent",{type:"gift",giftid:giftid})
			},
			showVideo:function(url){
				console.log("show"+url)
				this.$emit("call-parent",{type:"showVideo",url:url})
			}
		}
	}
</script>

<style>
	.w1{
		width: 100%;
	}
	.w2-1{
		width: 160px;
		height: 100px;
	}
</style>
