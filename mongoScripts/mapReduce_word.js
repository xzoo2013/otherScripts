db.twitter_mapReduce_word.find().sort({"value":-1})
db.twitter_mapReduce_word.ensureIndex({"value":1})
db.twitter_mapReduce_word.find().count()