
var gap=60*60*1000;//60 min 

var first=db.all_twitters.find().sort({"created_at":-1}).limit(1);

var first_date=first.next().created_at;

var next_date=new Date(first_date.valueOf()-gap);
var i=0;
while(i<=20)
{
    i++;
    var mapFunHashtang = function() {
                       var hashtag=this.entities.hashtags;
                       if(hashtag!=null)
                       {
                           for(var idx=0;idx<hashtag.length;idx++)
                           {
                               emit(hashtag[idx].text, 1)
                               
                           }
                        }
                          
                           
                       };
                   
                   
var reduceFun = function(word, count) {
                          return Array.sum(count);
                      };
                       
    
    db.all_twitters.mapReduce(
                     mapFunHashtag,
                     reduceFun,
                      
                     { 
                       query:{created_at:{$lte:first_date,$gt:next_date}},
                       out: {replace:"hashtag"+i}
                     }
                   )
    first_date=next_date;
    next_date=new Date(next_date.valueOf()-gap);
    
    }
    
    
