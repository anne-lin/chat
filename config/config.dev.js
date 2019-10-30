const path=require("path");
module.exports={
    HTTP_PORT:8089,
    HTTP_UPLOAD: path.resolve(__dirname, '../upload/'),
    allowOrigin:['http://localhost:8083']
};
