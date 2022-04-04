import dbClass from "./stroagedb.js";
var DB=new dbClass();
DB.init("chatdb","chat");
module.exports={
	table:"chatdb",
	indexKey:"pmIndexList",
	pmKey:"pmList",
	chatKey:"chatList",
	indexList:function(){
		return uni.getStorageSync(this.indexKey);
	},
	add:function(msg){
		DB.setTable("chat").insert(msg);
		DB.setTable("chatIndex").replaceInsert(msg,{
			gid:msg.gid,
			uid:msg.uid,
			touid:msg.touid
		});
	},
	addGroup:function(msg){
		DB.setTable("chat").insert(msg);
		DB.setTable("chatIndex").replaceInsert(msg,{
			gid:msg.gid
		});
	},
	msgList:function(ops){
		return DB.setTable("chat").getAll(ops);
	},
	indexList:function(ops){
		return DB.setTable("chatIndex").getAll(ops);
	}
	
}