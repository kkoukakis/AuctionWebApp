module.exports =  function bid_exists (itemid,bidderid){
    var query = 'SELECT * from bid WHERE Bidder_ID = \''+bidderid+'\' AND ItemID = \''+ itemid +'\'';
        //console.log(query);
        global.connection.query(query, function (error, results, fields) {
            if (error) { throw error;}
           // console.log(results.length);
            if(results.length !== 0){
                //USER EXISTS
                return results.length;;
            }else{
                return false;
            }
        });
    
    }