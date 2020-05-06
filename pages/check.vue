<template>
	<view>
		<checkbox-group>
			<label v-for="(item,index) in checkList" :key="index">
				<checkbox name="aa[]" @click="setCheck(item.value)" :disabled="item.disable" :checked="item.checked" :value="item.value"  />{{item.label}}
			</label>
			 
		</checkbox-group> 
	</view>
</template>

<script>
	export default{
		data:function(){
			return {
				checkList:[
					{
						"label":"A",
						"value":"a",
						"checked":true,
						"disable":true,
					},
					{
						"label":"B",
						"value":"b",
						"checked":false,
						"disable":true,
					},
					{
						"label":"C",
						"value":"c",
						"checked":false,
						"disable":true,
					},
					{
						"label":"D",
						"value":"d",
						"checked":false,
						"disable":true,
					},
				],
			}
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
							if(fmax){
								setTimeout(function(){
									list[i].checked=false;
									that.checkList=[];
									that.checkList=list;
									uni.showToast({
										"title":"只能选择两个"
									})
								},10)
								break;
								
							}else{
								break;
							}
						}
					}
				}
				 
			},
		}
	}
</script>

<style>
</style>
