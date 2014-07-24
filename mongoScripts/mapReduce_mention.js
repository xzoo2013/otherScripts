db.twitter_mapReduce_mention.find()
db.twitter_mapReduce_mention.find().sort({"value":-1})
db.twitter_mapReduce_mention.ensureIndex({"value":1})
db.twitter_mapReduce_mention.find().count()