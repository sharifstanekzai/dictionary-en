const sql = require('mysql2');

const connection = sql.createConnection({
    host: 'localhost',
    database: 'entries',
    user: 'root',
    password: 'O1933419@mysql'
});
var getSuggestions=(data)=>{
    console.log(data);
        var promise=new Promise((resolve, reject) => {
            connection.execute(`select distinct word from entries where word like ? limit ${data.start},${data.end}`, [data.searchString + '%'],
                function (error, results, fields) {
                    if (!error) {
                        resolve( results);
                    }
                    else {
                        reject( error);
                    }
                });
        });
        return  promise;
};
var lookupString=(data)=>{
    var promise=new Promise((resolve, reject) => {
        connection.execute(`select * from entries where word like ? limit ${data.start},${data.end}`, [data.searchString+'%'],
            function (error, results, fields) {
                if (!error) {
                    resolve( results);
                }
                else {
                    reject( error);
                }
            });
    });
    return promise;
};
module.exports={
    lookupString,
    getSuggestions
};