//db.all_twitters_test.find({"text":{$ne:null}},{"text":1,"_id":0,"created_at":1}).sort({"created_at":-1})
//db.all_twitters_test.find().count()


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
db.all_twitters_test.mapReduce(
                     mapFunction,
                     reduceFunction,
                     { out: "map_reduce_word" }
                   )

// mapReduce for the hashtags


var mapFunction2 = function() {
                       var text1=this.text;
                       var text2= text1.replace(/[\.,!\?$%\^&\*;{}=\-_`~()"-]/g,"");
                       var text3=text2.replace(/\u201C|\u270B|\u201D|\u2026|\u2605/,"");//remove left double quote ,palm ,star
                       var text4= text3.replace(/\s{2,}/g," ");
                       var text5= text4.split(" ")
                       for (var idx = 0; idx < text5.length; idx++) {
                           var key = text5[idx]
                          
                           
                           if(key.startsWith("#"))
                           {
                               emit(key, 1);
                           }
                          
                           
                       }
                   };
                   
var reduceFunction2 = function(word, count) {
                          return Array.sum(count);
                      };
db.all_twitters_test.mapReduce(
                     mapFunction2,
                     reduceFunction2,
                     { out: "map_reduce_hashtag" }
                   )

// map reduce for link sources

var mapFunction3 = function() {
                       var text1=this.text;
                       var text2= text1.replace(/[\.,!\?$%\^&\*;{}=\-_`~()"-]/g,"");
                       var text3=text2.replace(/\u201C|\u270B|\u201D|\u2026|\u2605/,"");//remove left double quote ,palm ,star
                       var text4= text3.replace(/\s{2,}/g," ");
                       var text5= text4.split(" ")
                       for (var idx = 0; idx < text5.length; idx++) {
                           var key = text5[idx]
                          
                           
                           if(key.startsWith("http"))
                           {
                               emit(key, 1);
                           }
                          
                           
                       }
                   };
                   
var reduceFunction3 = function(word, count) {
                          return Array.sum(count);
                      };
db.all_twitters_test.mapReduce(
                     mapFunction3,
                     reduceFunction3,
                     { out: "map_reduce_link" }
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
                               emit(key, 1);
                           }
                          
                           
                       }
                   };
                   
var reduceFunction4 = function(word, count) {
                          return Array.sum(count);
                      };
db.all_twitters_test.mapReduce(
                     mapFunction4,
                     reduceFunction4,
                     { out: "map_reduce_mention" }
                   )               