import $ from 'jquery';
export function loaditems(url){
    $.ajax({
        url: url,
        dataType: 'json',                       
        type: 'GET'  ,
        crossDomain: true,
        success : function(data) {
            if(data['response'] !== null && data['response'] !== "" && data['response']!=="0"){
               localStorage.setItem('items',JSON.stringify(data['response']))
               return data['items'];
            }
       },
       error : function(req,error) {
           alert('ERROR OCCURED:'+error);
           return null;
       }
   });
}

