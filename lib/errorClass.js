class AuthenticationError extends Error{
    constructor(code,message){
        super(message);
        this.code = code;
        this.name = "AuthenticationError";
    }
}
class MysqlError extends Error{
    constructor(code,message){
        super(message);
        this.code = code;
        this.name = "MysqlError";
    }
}

module.exports={
    AuthenticationError,
    MysqlError
};
