db.all_twitters.find({"text":{$ne:null}},{"text":1,"_id":0,"created_at":1}).sort({"created_at":-1})
db.all_twitters.find({"text":{$ne:null}})
db.all_twitters.find().count()
db.all_twitters.find({},{"text":1,"_id":0})
//db.all_twitters.remove()
//db.all_twitters.ensureIndex({"created_at":1})
db.all_twitters.stats()


//mapreduce for the word
var mapFunction = function() {
                       var text1=this.text;
                       var text2= text1.replace(/[\.,!\?$%\^&\*;{}=\-_`~()"-]/g,"");
                       var text3=text2.replace(/\u201C|\u270B|\u201D|\u2026|\u2605|\u2665/,"");//remove left double quote ,palm ,star,heart
                       var text4= text3.replace(/\s{2,}/g," ");
                       var text5= text4.split(" ")
                       for (var idx = 0; idx < text5.length; idx++) {
                           var key = text5[idx]
                           if (key.startsWith("@"))
                           {
                               continue;
                           }
                           
                           if(key.startsWith("#"))
                           {
                               continue;
                           }
                           
                           if (key.startsWith("http"))
                           {
                               continue;
                           }
                          
                           emit(key.toLowerCase(), 1);
                       }
                   };
                   
var reduceFunction = function(word, count) {
                          return Array.sum(count);
                      };
db.all_twitters.mapReduce(
                     mapFunction,
                     reduceFunction,
                     { out: "twitter_mapReduce_word" }
                   )
// mapReduce for the hashtags


var mapFunction2 = function() {
                       var hashtag=this.entities.hashtags;
                       if(hashtag!=null)
                       {
                           for(var idx=0;idx<hashtag.length;idx++)
                           {
                               emit(hashtag[idx].text, 1)
                               
                           }
                        }
                          
                           
                       };
                   
                   
var reduceFunction2 = function(word, count) {
                          return Array.sum(count);
                      };
db.all_twitters.mapReduce(
                     mapFunction2,
                     reduceFunction2,
                     { out: "twitter_mapReduce_hashtag2" }
                   )

// map reduce for link sources

var mapFunction3 = function() {
                       var link=this.entities.urls[0];
                       if(link!=null)
                       {
                         var link2=link["expanded_url"]
                           }
                       //;
                       //var link2=link.expanded_url
                       
                       if(link!=null)
                       {
                         emit(link2, 1);
                       }  
                   };
                   
var reduceFunction3 = function(link, count) {
                          return Array.sum(count);
                      };
db.all_twitters.mapReduce(
                     mapFunction3,
                     reduceFunction3,
                     { out: "twitter_mapReduce_link" }
                   )
// user mention                    
var mapFunction4 = function() {
                       var text1=this.text;
                       var text2= text1.replace(/[\.,!\?$%\^&\*;{}=\-_`~()"-]/g,"");
                       var text3=text2.replace(/\u201C|\u270B|\u201D|\u2026|\u2605/,"");//remove left double quote ,palm ,star
                       var text4= text3.replace(/\s{2,}/g," ");
                       var text5= text4.split(" ")
                       for (var idx = 0; idx < text5.length; idx++) {
                           var key = text5[idx]
                          
                           
                           if(key.startsWith("@"))
                           {
                               key=key.replace(/[:]/,"")
                               emit(key, 1);
                           }
                          
                           
                       }
                   };
                   
var reduceFunction4 = function(word, count) {
                          return Array.sum(count);
                      };
db.all_twitters.mapReduce(
                     mapFunction4,
                     reduceFunction4,
                     { out: "twitter_mapReduce_mention" }
                   )  
                     
var kk= db.all_twitters.find({"entities.urls.expanded_url":{$ne:null}},{"text":1,"entities.urls.expanded_url":1,"_id":0})
t=kk.next()
print(t.entities.urls[0].expanded_url)
printjson(t)
var k1=[1,3,4]
k1.forEach(function kk(val){print(val)})