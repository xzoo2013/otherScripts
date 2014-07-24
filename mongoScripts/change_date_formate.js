db.all_twitters_test.find().forEach(function(e) {
        if (typeof(e.created_at)=="string")
        {
            e.created_at = new Date(e.created_at);
            db.all_twitters_test.save(e);
            }
        }
      )  
        
db.tweet.find({$where:"typeof(this.created_at)=='string'"}).forEach(function(e) {
        {
            e.created_at = new Date(e.created_at);
            db.tweet.save(e);
            }
        }
      )
  
        
db.all_twitters.find().sort({created_at:1}).limit(500000).forEach(function(e) {
        if (typeof(e.created_at)=="string")
        {
            e.created_at = new Date(e.created_at);
            db.all_twitters.save(e);
            }
        })