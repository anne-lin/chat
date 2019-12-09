const {AuthenticationError,MysqlError}=require("./errorClass");

module.exports=function(err,ctx) {
    console.log("error:",err.message);
    if (err instanceof AuthenticationError) {
        ctx.status = err.code || 500;
        ctx.body={
            msg:err.message
        };
    }
    if(err instanceof MysqlError){
        ctx.status = err.code || 500;
        ctx.body={
            msg:"数据库异常"
        };
    }
};
