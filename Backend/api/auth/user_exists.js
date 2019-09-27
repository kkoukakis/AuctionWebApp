module.exports =  function user_exists (userid){
var query = 'SELECT * from user WHERE UserID = \''+userid+'\'';
    //console.log(query);
    global.connection.query(query, function (error, results, fields) {
        if (error) { throw error;}
       // console.log(results.length);
        if(results.length !== 0){
            //USER EXISTS
            return true;
        }else{
            return false;
        }
    });

}