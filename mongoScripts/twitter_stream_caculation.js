db.all_twitters_test.find({"created_at":{$gt:"Fri Oct 04 14:16:51 +0000 2013"}},{"created_at":1,"text":1}).sort({"created_at":-1})
//db.all_twitters_test.find()
//db.all_twitters_test.find({"entities.urls.expanded_url":{$ne:null}},{"text":1,"entities.urls.expanded_url":1,"_id":0})

var mapFunBigram = function() {
                       var text1=this.text;
                       var text2= text1.replace(/[\.,!\?$%\^&\*;{}=\-_`~()"-]/g,"");
                       var text3=text2.replace(/\u201C|\u270B|\u201D|\u2026|\u2605|\u2665/,"");//remove left double quote ,palm ,star,heart
                       var text4= text3.replace(/\s{2,}/g," ");
                       var text5= text4.split(" ");
                       if (text5.length<2)
                       {return}
                       for (var idx = 0; idx < text5.length-1; idx++) {
                           var key = text5[idx]+" "+text5[idx+1]
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
var reduceFunBigram = function(word, count) {
                          return Array.sum(count);
                      };
db.all_twitters_test.mapReduce(
                     mapFunBigram,
                     reduceFunBigram,
                      
                     { 
                       //query:{created_at:{$gt:"2013-09-04T14:14:34Z"}},
                       out: {replace:"test_bigram"} 
                     }
                   )
                     
var mapFunUnigram = function() {
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
var reduceFunUnigram = function(word, count) {
                          return Array.sum(count);
                      };
db.all_twitters_test.mapReduce(
                     mapFunUnigram,
                     reduceFunUnigram,
                      
                     { 
                       //query:{created_at:{$gt:"2013-09-04T14:14:34Z"}},
                       out: {replace:"test_unigram"} 
                     }
                   )
                     
var mapFunTrigram = function() {
                       var text1=this.text;
                       var text2= text1.replace(/[\.,!\?$%\^&\*;{}=\-_`~()"-]/g,"");
                       var text3=text2.replace(/\u201C|\u270B|\u201D|\u2026|\u2605|\u2665/,"");//remove left double quote ,palm ,star,heart
                       var text4= text3.replace(/\s{2,}/g," ");
                       var text5= text4.split(" ")
                       if (text5.length<3)
                       {return}
                       for (var idx = 0; idx < text5.length-2; idx++) {
                           var key = text5[idx]+" "+text5[idx+1]+" "+text5[idx+2]
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
var reduceFunTrigram = function(word, count) {
                          return Array.sum(count);
                      };
db.all_twitters_test.mapReduce(
                     mapFunTrigram,
                     reduceFunTrigram,
                      
                     { 
                       query:{created_at:{$gt:"2013-09-04T14:14:34Z"}},
                       out: {replace:"test_trigram"} 
                     }
                   )
var data1=db.all_twitters_test.findOne({},{"created_at":1,"_id":0})
var data2=data1.created_at
var data3=new Date(data2)
data3.
var t=1
print("I "+t+" goo")
print("I 1 goo")