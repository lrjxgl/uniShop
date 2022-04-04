module.exports=function(){
	return {
		db:"chat",
		table:"msg",
		init:function(db,table){
			this.db=db;
			this.table=table;
		},
		setTable:function(table){
			this.table=table;
			return this;
		},
		find:function($where){
			
		},
		getAll:function(ops){
			var table=this.db+"."+this.table;
			var res=uni.getStorageSync(table);
			 
			if(ops==undefined){
				return res;
			}
			var $where=ops;
			var arr=new Array();
			if(res){
				var rs;
				
				for(var i=0;i<res.length;i++){
					rs=res[i];
					var e=true;
					for(var key in $where){
						
						if(!rs.hasOwnProperty(key)){
							e=false;
							 continue;
						}else{
							if(rs[key]!=$where[key]){
								e=false; 
								continue
							}
						}
						
					}
					if(e){
						arr.push(rs);
					}
					
				}
			}
			 
			return arr;
		},
		insert:function(msg){
			var table=this.db+"."+this.table;
			var res=uni.getStorageSync(table);
			if(!res){
				var mlist=new Array();
				mlist.push(msg);
				uni.setStorageSync(table,mlist);
			}else{
				res.push(msg);
				uni.setStorageSync(table,res);
			}
		},
		delete:function($where){
			
		},
		replaceInsert:function(msg,$where){
			var table=this.db+"."+this.table;
			var res=uni.getStorageSync(table);
			if(!res){
				var mlist=new Array();
				mlist.push(msg);
				uni.setStorageSync(table,mlist);
			}else{
				
				var arr=new Array();
				
				
				for(var i=0;i<res.length;i++){
					var rs=res[i];
					var eb=true;
					for(var key in $where){
						
						if(rs.hasOwnProperty(key)){
							if(rs[key]!=$where[key]){
								eb=false; 
								break;
							}
						}
						
					}

					if(!eb){

						arr.unshift(rs);

						
					}
					
				}

				if(arr.length==0){
					var mlist=new Array();
					mlist.push(msg);
					uni.setStorageSync(table,mlist);
				}else{
					arr.unshift(msg);
					uni.setStorageSync(table,arr);
				}
				
			}
		}
	}
	
}