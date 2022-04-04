module.exports={
	incList:[],
	mp:null,
	url:"",
	play:function(url){
		// #ifdef H5
		url=url.replace(/\.\.\/\.\.\//g,"");
		// #endif
		// #ifdef APP-PLUS
		url=url.replace(/\.\.\/\.\.\//g,"./");
		// #endif
		var mp;
		if(this.mp==null){
			
			mp = uni.createInnerAudioContext();
			this.mp=mp;
			mp.src = url;
			this.url=url;
			mp.onCanplay(() => {
			  mp.play();
			});
			mp.onPlay(() => {
			  
			});
			mp.onError((res) => {
			 
			});
		}else{
			mp=this.mp;
			if(this.url!=url){
				
				mp.src = url;
				this.url=url;
				mp.onCanplay(() => {
					console.log("canplay")
				  mp.play();
				});
			}else{
				if(mp.paused){
					 mp.play();
					 console.log("play")
				}else{
					 mp.pause();
					 console.log("stop")
				}
			}
		}
		
		

		
	}
}