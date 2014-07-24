db.twitter_mapReduce_link.find()
db.twitter_mapReduce_link.find().sort({"value":-1})
db.twitter_mapReduce_link.ensureIndex({"value":1})
db.twitter_mapReduce_link.find().count()