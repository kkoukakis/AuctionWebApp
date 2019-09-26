 module.exports = function updatedb(token,rtoken,userid){
    var query = 'UPDATE user SET token =' +'\'' + token+'\' , rtoken = \''+rtoken+ '\'' + ' WHERE UserID = \'' + userid+ '\'';
    global.connection.query(query);
}