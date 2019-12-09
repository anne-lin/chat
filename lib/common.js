const MysqlError=require("./errorClass").MysqlError;

async function checkMysqlHandle(next,msg){
    try {
       return await next(msg);
    }catch (e) {
        throw new MysqlError(500,e.message);
    }
}

module.exports={
    checkMysqlHandle:checkMysqlHandle
};
