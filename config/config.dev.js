const path=require("path");
module.exports={
    HTTP_PORT:8089,
    HTTP_UPLOAD: path.resolve(__dirname, '../upload/'),
    allowOrigin:['http://localhost:8083'],
    DB_HOST: '10.130.29.10',
    DB_PORT: 3306,
    DB_USER: 'root',
    DB_PASS: '123456',
    DB_NAME: 'chat'
};
