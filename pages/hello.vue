<template>
	<view >
		<checkbox-group>
			<label v-for="(item,index) in checkList" :key="index">
				<checkbox name="aa[]" @click="setCheck(item.value)" :checked="item.checked" :value="item.value"  />{{item.label}}
			</label>
			 
		</checkbox-group> 
		 
	</view>
</template>

<script>
	var num=0;
	export default{
		data:function(){
			return {
				title:"我是标题",
				content:"我是内容",
				nickname:"这是昵称",
				list:[],
				cls:"cl-red",
				style:"font-size:36px;color:f30;",
				num:2,
				baseList:[],
				checkList:[
					{
						"label":"A",
						"value":"a",
						"checked":true
					},
					{
						"label":"B",
						"value":"b",
						"checked":false
					},
					{
						"label":"C",
						"value":"c",
						"checked":false
					},
					{
						"label":"D",
						"value":"d",
						"checked":false
					},
				],
			}
		},
		onLoad:function(ops){
			//this.baseList=this.checkList;
			this.getPage();
		},
		onReachBottom:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.getPage();
			uni.stopPullDownRefresh();
		},
		 
		methods:{
			setCheck:function(val){
				var list=this.checkList;
				var that=this;
				//判断长度
				var maxlen=2;
				var num=0;
				var fmax=false;
				for(var i=0;i<list.length;i++){
					if(list[i].checked){
						num++;
						if(num==maxlen){
							fmax=true;
							break;
						}
					}
				}
				for(var i=0;i<list.length;i++){
					if(list[i].value==val){
						if(list[i].checked){						
							list[i].checked=false;
							this.checkList=list;
							break;
						}else{
							list[i].checked=true;
							this.checkList=list;
							console.log(list)
							if(fmax){
								
								console.log("false")
								setTimeout(function(){
									list[i].checked=false;
									that.checkList=[];
									that.checkList=list;
								},10)
								break;
								
							}
						}
					}
				}
				 
			},
			clickMe:function(msg){
				 
				if(typeof(msg)=="string"){
					alert(msg)
				}else{
					
					alert("我被击中了");
				}
				
			},
			getPage:function(){
				console.log("加载了");
				var list=[];
				for(var i=0;i<50;i++){
					num++;
					list.push('这是第'+num+'条新闻');
				}
				this.list=list;
				uni.setNavigationBarTitle({
					title:"这是老雷uniApp的hello world"
				})
			},
			getList:function(){
				var list=this.list;
				for(var i=0;i<50;i++){
					num++;
					list.push('这是第'+num+'条新闻');
				}
				this.list=list;
			}
		}
	}
</script>

<style>
</style>
