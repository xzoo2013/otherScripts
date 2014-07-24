
function alphanumeric(inputtxt)  
{   
var letters = /^[\w@#]+$/; 
   if (inputtxt.match(letters))
   {return true}
   else{return false}

}
//"RRR".toLowerCase()
//lphanumeric("angha()m#i")

//"#angh&&&ami".match(/[0-9a-zA-Z@#]+$/)

var gap=60*60*1000;//60 min 

var first=db.all_twitters.find().sort({"created_at":-1}).limit(1);

var first_date=first.next().created_at;

var next_date=new Date(first_date.valueOf()-gap);
var i=0;
while(i<=20)
{
    i++;
    var mapFunUnigram = function() {
                       function alphanumeric(inputtxt)  
                                    {   
                                    var letters = /^[0-9a-zA-Z@#:]+$/;  
                                    
                                    return inputtxt.match(letters)?true:false 
                                    }
                       var text1=this.text;
                       var text2= text1.replace(/[\.,!\?$%\^&\*;{}=+\-_`~()"-]/g,"");
                       var text3=text2.replace(/\u201C|\u270B|\u201D|\u2026|\u2605|\u2665|\u0027/g,"");//remove left double quote ,palm ,star,heart
                       var text4= text3.replace(/\s{2,}/g," ");
                       var text5= text4.split(" ")
                       for (var idx = 0; idx < text5.length; idx++) {
                           var key = text5[idx]
                           
                           var value={"count":1,"idd":[this._id]}
                          
                           emit(key.toLowerCase(), value);
                         }
                 
                       };
    var mapFunBigram = function() {
                       function alphanumeric(inputtxt)  
                                    {   
                                    var letters = /^[\w@#]+$/;  
                                    
                                    return inputtxt.match(letters)?true:false 
                                    }
                       var text1=this.text;
                       var text2= text1.replace(/[\.,!\?$%\^&\*;\{\}=+\-_`~()"-:\/]/g,"");
                       var text3=text2.replace(/\u201C|\u270B|\u201D|\u2026|\u2605|\u2665|\u0027/g,"");//remove left double quote ,palm ,star,heart
                       var text4= text3.replace(/\s{2,}/g," ");
                       var text5= text4.split(" ");
                       if (text5.length<2)
                       {return}
                       
                       for (var idx = 0; idx < text5.length-1; idx++) {
                           var key = text5[idx]+" "+text5[idx+1]
                           if (!(alphanumeric(text5[idx])&&alphanumeric(text5[idx+1])))
                           {
                               continue;
                               
                               }
                           var value={"count":1,"idd":[this._id]}
                          
                           emit(key.toLowerCase(), value);

                         }
                 
                       };
    var mapFunTrigram = function() {
                       function alphanumeric(inputtxt)  
                                    {   
                                    var letters = /^[0-9a-zA-Z@#:]+$/;  
                                    if(inputtxt.match(letters))  
                                    {  
                                       return true;  
                                    }  
                                    else  
                                    {    
                                       return false;  
                                    }  
                                    }
                       var text1=this.text;
                       var text2= text1.replace(/[\.,!\?$%\^&\*;{}=+\-_`~()"-]/g,"");
                       var text3=text2.replace(/\u201C|\u270B|\u201D|\u2026|\u2605|\u2665|\u0027/g,"");//remove left double quote ,palm ,star,heart
                       var text4= text3.replace(/\s{2,}/g," ");
                       var text5= text4.split(" ")
                       if (text5.length<3)
                       {return}
                       for (var idx = 0; idx < text5.length-2; idx++) {
                           
                           var key = text5[idx]+" "+text5[idx+1]+" "+text5[idx+2];
                           
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
    db.all_twitters.mapReduce(
                     mapFunBigram,
                     reduceFunUni,
                      
                     { 
                       query:{created_at:{$lte:first_date,$gt:next_date}},
                       out: {replace:"bigram"+i}
                     }
                   )
    first_date=next_date;
    next_date=new Date(next_date.valueOf()-gap);
    
    }
    
