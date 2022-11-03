<template>
	<view class="row-box">

		<editor id="editor" @input="change" class="sky-editor" :placeholder="placeholder" @ready="onEditorReady">
		</editor>
		<div class="sky-editor">
			<div class="sky-editor-colors" v-if="showColor">
				<div class="sky-editor-excute" @click="setColor(color)" v-for="(color,index) in colors" :key="index"
					:style="'background-color:'+color+';'"></div>

			</div>
			<div class="sky-head-box" v-if="showHead">
				<div class="sky-head-item" @click="setHeader('')">无</div>
				<div class="sky-head-item" @click="setHeader(align)" v-for="(align,index) in heads" :key="index">
					{{align}}
				</div>
			</div>
			<div class="sky-align-box" v-if="showAlign">
				<div class="sky-align-item skyeditor-iconfont" :class="'skyeditor-icon-align-'+align"
					@click="setAlign(align)" v-for="(align,index) in aligns" :key="index">

				</div>
			</div>
			<div v-if="showEmo" class="flex">
				<scroll-view scroll-x="true">
					<div @click="setEmo(index)" class="sky-editor-emoji"
					 v-for="(pos,index) in emojis" :key="index"
					 :style="'background-position:left -' + pos + 'px;'"></div>
				</scroll-view>
				
			</div>
			<div class="sky-editor-tools">
				<div class="sky-editor-tools-item"  @click="showHead=showHead==true?false:true">h3</div>
				<div class="sky-editor-tools-item" @click="uploadImg()"><i
						class="skyeditor-iconfont skyeditor-icon-pic"></i>
				</div>
				<div class="sky-editor-tools-item" @click="showColor=showColor==true?false:true">&nbsp; <span
						class="sky-editor-color"></span>
				</div>
				<div class="sky-editor-tools-item" @click="setBlod">B</div>
				 
				<div class="sky-editor-tools-item" @click="showEmo=showEmo==true?false:true"><i class="skyeditor-iconfont skyeditor-icon-emoji"></i></div>
				<div class="sky-editor-tools-item" @click="showAlign=showAlign==true?false:true"><i
						class="skyeditor-iconfont skyeditor-icon-align-center"></i></div>
			</div>
		</div>

	</view>
</template>

<script>
	var editorCtx;
	export default {
		props: {
			html: "",
			editorCtx:false
		},
		data: function() {
			return {
				content: "",
				placeholder: "请输入内容",
				showHead:false,
				heads:["h1","h2","h3","h4","h5","h6"],
				showAlign: false,
				aligns: ['left', 'center', 'right'],
				showColor: false,
				colors: ['#1ebdc0', '#f8375b', '#fd8f43', '#a4ce3b', '#35dab6', '#199de1', '#9581f3', '#333',
					'#8f8f94'],
				showEmo:false,
				emojis:[]
			}
		},
		created: function() {
			if(this.html!=null){
				this.content = this.html;
			}
			
			var emojis=[];
			for(var i=0;i<84;i++){
				emojis.push(i * 36 - i);
			}
			this.emojis=emojis;
		},

		watch: {
			html: function(n, o) {
				this.content = n;
			}
		},
		methods: {
			onEditorReady() {
				var that = this;
				// #ifdef MP-BAIDU
				editorCtx = requireDynamicLib('editorLib').createEditorContext('editorId');
				// #endif
				
				// #ifdef MP-WEIXIN
				console.log("weixin")
				that.createSelectorQuery().select('#editor').context((res) => {
					console.log(res)
					editorCtx = res.context
					editorCtx.setContents({
						html: that.content
					});
				}).exec()
				// #endif
				// #ifdef APP-PLUS || H5 
				console.log("App")
				uni.createSelectorQuery().select('#editor').context((res) => {
					console.log(res)
					editorCtx = res.context
					editorCtx.setContents({
						html: that.content
					}); 
				}).exec()
				// #endif
			},
			change(e) {

				this.$emit("call-parent", e.detail.html);
			},
			setBlod(e) {
				editorCtx.format("bold");
			},
			setColor: function(color) {
				console.log(color);
				editorCtx.format("color", color);
				this.showColor = false;
			},
			setAlign: function(align) {
				editorCtx.format("align", align);
				this.showAlign = false;
			},
			setHeader: function(h) {
				editorCtx.format("header", h);
			},
			uploadImg: function() {
				var that = this;
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: that.app.apiHost + "/upload/img?loginToken=" + that.app.getToken(),
							filePath: tempFilePaths[0],
							name: 'upimg',

							success: function(res) {
								var data = JSON.parse(res.data);
								console.log(data);
								that.dimgurl = data.data.imgurl;
								that.dtrueimgurl = data.data.trueimgurl;
								that.$emit("call-parent", data.data.imgurl);
								editorCtx.insertImage({
									src: data.data.trueimgurl,
									width: '100%',
									height: '100%',
								})
							}
						});
					}
				});
			},
			setEmo:function(i){
				var img="";
				if(i<10){
					img="j_000"+(i+1)+".gif"
				}else{
					img="j_00"+(i+1)+".gif"
				}
				editorCtx.insertImage({
					src: "http://www.fd175.com/plugin/skyeditor/images/jx2/"+img,
					width: '30',
					height: '30',
				})
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: "skyeditor-iconfont";
		/* Project id 739936 */
		src: url('https://at.alicdn.com/t/font_739936_e9cotjubjp8.woff2?t=1645502024343') format('woff2'),
			url('https://at.alicdn.com/t/font_739936_e9cotjubjp8.woff?t=1645502024343') format('woff'),
			url('https://at.alicdn.com/t/font_739936_e9cotjubjp8.ttf?t=1645502024343') format('truetype');
	}

	.skyeditor-iconfont {
		font-family: "skyeditor-iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.skyeditor-icon-align-left:before {
		content: "\e609";
	}

	.skyeditor-icon-align-right:before {
		content: "\e81a";
	}

	.skyeditor-icon-el-before:before {
		content: "\e652";
	}

	.skyeditor-icon-el-after:before {
		content: "\e653";
	}

	.skyeditor-icon-code:before {
		content: "\e81b";
	}

	.skyeditor-icon-emoji:before {
		content: "\e604";
	}

	.skyeditor-icon-h:before {
		content: "\e607";
	}

	.skyeditor-icon-align-center:before {
		content: "\e65b";
	}

	.skyeditor-icon-video:before {
		content: "\e608";
	}

	.skyeditor-icon-pic:before {
		content: "\e7b0";
	}




	/****editor****/
	.sky-editor {
		position: relative;
		bottom: 0px;
		left: 0;
		right: 0;
		background-color: #fff;

	}

	* {
		box-sizing: border-box;
	}

	.sky-editor-loading {
		position: fixed;
		right: 1px;
		padding: 10px;
		top: 150px;
		background-color: #0055AA;
		color: #fff;
		display: none;
	}

	.sky-editor-content {
		display: block;
		resize: vertical;
		overflow: auto;
		border: 1px solid #eee;
		border-radius: 5px;
		min-height: 100px;
		-webkit-user-select: text;
		height: 260px;
		line-height: 2;
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		padding: 5px;

	}

	.sky-editor-content h3 {
		font-size: 16px;
		color: #333;
	}

	.sky-editor-content img {
		max-width: 100%;
	}

	.sky-editor-content>div {
		display: block;
		margin-bottom: 3px;
		border-bottom: 1px solid #eae4da;
		-webkit-user-select: text;
	}

	.sky-editor-content div {
		-webkit-user-select: text;
	}

	.sky-editor-tools {
		display: flex;
		flex-direction: row;
		height: 36px;
		line-height: 36px;
		text-align: center;
	}

	.sky-editor-tools-item {
		display: block;
		cursor: pointer;
		flex: 1;
		color: #555;
	}

	.sky-editor-tools-item.active {
		color: #0000FF;
	}

	.sky-editor-colors {
		padding: 10px;
		display: flex;
		text-align: center;
		flex-direction: row;
		position: absolute;
		bottom: 30px;
		left: 0;
		right: 0;
	}

	.sky-editor-colors div {
		width: 20px;
		height: 20px;
		display: inline-block;
		margin-right: 6px;
		border-radius: 50%;
		cursor: pointer;
	}

	.sky-editor-color {
		width: 14px;
		height: 14px;
		display: inline-block;
		border-radius: 50%;
		cursor: pointer;
		background-color: #8f8f94;
		position: relative;
		top: 2px;
	}

	.sky-editor-color-a {
		background-color: #1ebdc0;
	}

	.sky-editor-color-b {
		background-color: #f8375b;
	}

	.sky-editor-color-c {
		background-color: #fd8f43;
	}

	.sky-editor-color-d {
		background-color: #a4ce3b;
	}

	.sky-editor-color-e {
		background-color: #35dab6;
	}

	.sky-editor-color-f {
		background-color: #199de1;
	}

	.sky-editor-color-g {
		background-color: #9581f3;
	}

	.sky-editor-color-h {
		background-color: #333;
	}

	.sky-editor-color-i {
		background-color: #8f8f94;
	}

	.sky-editor-emojis {
		padding: 5px;
		max-height: 300px;
		overflow: auto;
		display: none;
		flex-direction: row;
	}

	.sky-editor-emoji {
		background: transparent url(http://www.fd175.com/plugin/skyeditor/images/jxface2.gif) no-repeat scroll left top;
		cursor: pointer;
		width: 35px;
		height: 35px;
		display: inline-block;
		margin: 3px;
		border: 1px solid #eee;
	}

	.sky-align-box {
		position: absolute;
		bottom: 40px;
		right: 0px;
		width: 40px;
	}

	.sky-align-item {
		border-bottom: 1px solid #eee;
		padding: 5px;
	}
	
	.sky-head-box {
		position: absolute;
		bottom: 45px;
		left: 0px;
		right: 0;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		border-bottom: 5px solid #eee;
		padding: 5px;
	}
	
	.sky-head-item {
		border-right: 1px solid #eee;
		padding: 5px 10px;
	}
</style>
