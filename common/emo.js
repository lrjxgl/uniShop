module.exports={
	emoHost:"http://wss.deituicms.com/",
	emoList:function(){
		var arr=new Array();
		for(var i=0;i<48;i++){
			arr.push("emo"+i);
		}
		return arr;
		//return ["微笑",'惊讶',"哭泣","蛋糕","傻笑"];
	},
	emoIndex:function(word){
		word= word.replace(/\s*/g,"");
		var emlist=this.emoList();
		for(var i=0;i<emlist.length;i++){
			if(emlist[i]==word){			
				return i; 
			}
		}
		return -1;
	},
	decodeEmo:function(str){
		var that=this;
		str+=" ";
		var res=str.match(/(\\[^\s]+)\s/g);
 
		if(res!=null){
			for(var i=0;i<res.length;i++){
				var w=res[i].replace("\\","");
				w=res[i].replace("\\","");				
				var index=this.emoIndex(w);
				 
				if(index>=0){
					str=str.replace(res[i],'<img src="'+that.emoHost+'/emo/jx2/'+(index+1)+'.gif" />');
				}
			}
		}
		return str;
	}
}