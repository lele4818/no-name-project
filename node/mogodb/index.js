const MongoClient = require('mongodb').MongoClient;
const DbUrl='mongodb://127.0.0.1:27017';
const ObjectID = require('mongodb').ObjectID;

function  __connectDb(callback){
  MongoClient.connect(DbUrl, { useUnifiedTopology: true }, function(err,client){
    if(err){
      console.log('数据库连接失败');
      return;
    }
    
    callback(client);
  })

}

exports.ObjectID=ObjectID;

// 查询
exports.find=function(dbname,collectionname,json,callback){
  __connectDb(function(client){
    let db = client.db(dbname);
    var result = db.collection(collectionname).find(json);
    result.toArray(function(error,data){
      client.close();
      callback(error,data);
    })
  })
}

// 模糊查询
exports.search=function(dbname,collectionname,key,callback){
  __connectDb(function(client){
    let db = client.db(dbname);
    const e = RegExp(key);
    var result = db.collection(collectionname).find({'name': e});
    result.toArray(function(error,data){
      client.close();
      callback(error,data);
    })
  })
}

// 新增单条
exports.insert=function(dbname,collectionname,json,callback){
  __connectDb(function(client){
    let db = client.db(dbname);
    db.collection(collectionname).insertOne(json,function(error,data){
      client.close();
      callback(error,data);
    })
  })
}


// 修改
exports.update=function(dbname,collectionname,json1,json2,callback){
  __connectDb(function(client){
    let db = client.db(dbname);
    db.collection(collectionname).updateOne(json1,{$set:json2},function(error,data){
      client.close();
      callback(error,data);
    })
  })
}

// 删除单条
exports.deleteOne=function(dbname,collectionname,json,callback){
  __connectDb(function(client){
    let db = client.db(dbname);
    db.collection(collectionname).deleteOne(json,function(error,data){
      client.close();
      callback(error,data);
    })
  })
}