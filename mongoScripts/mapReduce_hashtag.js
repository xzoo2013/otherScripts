db.twitter_mapReduce_hashtag.find()
db.twitter_mapReduce_hashtag.find().sort({"value":-1})
db.twitter_mapReduce_hashtag.ensureIndex({"value":1})
db.twitter_mapReduce_hashtag.find().count()