db.fx_news_all.find({},{"title":1,"_id":0,"dtime":1,"content":1,"tag":1}).sort({"dtime":-1})
db.fx_news_all.find({"tag":'日元'},{"title":1,"_id":0,"dtime":1,"content":1,"tag":1}).sort({"dtime":-1})
db.fx_news_all.find({"tag":""})
//var date = ISODate("2013-10-08T03:50:34Z")
//db.fx_news_all.find({"dtime":{$gt:date}},{"title":1,"_id":0,"dtime":1}).sort({"dtime":-1})
//db.fx_news_all.remove({"dtime":{$gt:date}})
db.fx_news_all.find({},{"title":1,"_id":0,"dtime":1}).count()
db.fx_news_all.find({},{"title":1,"_id":0,"dtime":1})

#db.eval(function() { 
#    db.fx_news_all.find().forEach(function(e) {
#        e.tag = e.tag[0];
#        db.fx_news_all.save(e);
#    });
#});

#db.fx_news_all.ensureIndex({"dtime":1})