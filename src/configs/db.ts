import mysql from 'mysql';

const connection = mysql.createConnection({
    host: '192.168.0.2',
    user: 'root',
    password: '123456',
    database: 'local_project'
});

export default connection;