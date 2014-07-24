
var gap=60*60*1000*1;//60 min 

var first=db.all_twitters.find().sort({"created_at":-1}).limit(1);

var first_date=first.next().created_at;
var next_date=new Date(first_date.valueOf()-gap);
var i=0;
while(i<=4)
{
    i++;
    var mapFunUnigram = function() {
                       
                       var tweet=this.text2;
                       if (tweet.length<2)
                       {return}
                       var tweet2= tweet.split(" ")
                       for (var idx = 0; idx < tweet2.length; idx++) {
                           var key = tweet2[idx]
                           
                           var value={"count":1,"idd":[this._id]}
                          
                           emit(key.toLowerCase(), value);
                         }
                 
                       };
    var mapFunBigram = function() {
                       
                       if (this.entities.hashtags.length>5)
                       {return}
                       var tweet=this.text2;
                       if (tweet.length<2)
                       {return}
                       var tweet2= tweet.split(" ")
                       if (tweet2.length<2)
                       {return}
                       
                       for (var idx = 0; idx < tweet2.length-1; idx++) {
                           var key = tweet2[idx]+" "+tweet2[idx+1]
                          
                           var value={"count":1,"idd":[this._id]}
                          
                           emit(key.toLowerCase(), value);

                         }
                 
                       };
    var mapFunTrigram = function() {
                       
                       var tweet=this.text2;
                       if (tweet.length<2)
                       {return}
                       var tweet2= tweet.split(" ")
                       if (tweet2.length<3)
                       {return}
                       for (var idx = 0; idx < tweet2.length-2; idx++) {
                           
                           var key = tweet2[idx]+" "+tweet2[idx+1]+" "+tweet2[idx+2];
                           
                           var value={"count":1,"idd":[this._id]}
                          
                           emit(key.toLowerCase(), value);
                         }
                 
                       }; 
                       
    var reduceFun = function(word, count) {
                          return Array.sum(count);
                      };
    var reduceFunUni = function(word, value) {
                           var tar={"idd":[],"count":0};  
                           for (var idx = 0; idx < value.length; idx++) {
                                     tar.count += value[idx].count;
                                     tar.idd=tar.idd.concat(value[idx].idd);
                                 }             
        
                           return tar;
                      };
                      
    var mapFunRetweet = function(){
                           
                           var re_text=this.retweeted_status;
                           print(2);
                           var text=this.text;
                           print(1);
                           if (re_text!=null)
                           {
                               emit(re_text,this.retweeted_status["retweet_count"]);
                               print(2);
                               }
                           else
                           {
                               emit(text,0);
                               print(1);
                               }
        
        
        };
        
     var reduceFunRetweet = function(text,count){
           return Math.max(count)   
         };
    db.all_twitters.mapReduce(
                     mapFunBigram,
                     reduceFunUni,
                      
                     { 
                       query:{created_at:{$lte:first_date,$gt:next_date}},
                       out: {replace:"bigramTRomv"+i}
                     }
                   )
    first_date=next_date;
    next_date=new Date(next_date.valueOf()-gap);
    
    }