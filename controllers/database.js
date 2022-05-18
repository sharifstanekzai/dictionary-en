const sql = require('mysql2');

const connection = sql.createConnection({
    host: 'localhost',
    database: 'entries',
    user: 'root',
    password: 'O1933419@mysql'
});

const getMeaning = (searchString) => {
    var promise=new Promise((resolve, reject) => {
        connection.execute(`select * from entries where word like ?`, [searchString + '%'],
            function (error, results, fields) {
                if (!error) {
                    console.log(results);
                    resolve( results);
                }
                else {
                    reject( error);
                }
            });
    });
    return promise;
};

module.exports = {
    getMeaning
}