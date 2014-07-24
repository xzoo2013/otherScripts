//db.all_twitters_test.find()

var gap=1*60*100;


var last=db.all_twitters_test.find().sort({"created_at":1}).limit(1);
var last_date=last.next().created_at;

var first=db.all_twitters_test.find().sort({"created_at":-1}).limit(1);

var first_date=first.next().created_at;
var next_date=new Date(first_date.valueOf()-gap);
var i=0;
while(next_date>=last_date)
{
    i++;
    var mapFunUnigram = function() {
                       var text1=this.text;
                       var text2= text1.replace(/[\.,!\?$%\^&\*;{}=\-_`~()"-:\/]/g,"");
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
                       query:{created_at:{$lt:first_date,$gt:next_date}},
                       out: {replace:"test"+i} 
                     }
                   )
    first_date=next_date;
    next_date=new Date(next_date.valueOf()-gap)
    
    }

