module.exports = function updatedb_approval(userid,approve){
    var query = 'UPDATE user SET Approved =\''+ approve + '\' WHERE UserID = \'' + userid+ '\'';
    global.connection.query(query);
}