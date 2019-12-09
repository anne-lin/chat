const Router=require('koa-router');
const {AuthenticationError}=require("../lib/errorClass");
const {checkMysqlHandle}=require("../lib/common");

let router=new Router();

function checkInfo(name,password){
    if(!name){
        throw new AuthenticationError(500,"用户名不存在");
    }
    if(!password){
        throw new AuthenticationError(500,"密码为空");
    }
    return true;
}

router.post("/login",async (ctx)=>{
    let body=ctx.request.body;
    if(!checkInfo(body.username,body.password)){
        return ;
    }
    let data=await checkMysqlHandle(ctx.db.query,`SELECT user_pass FROM user_table WHERE user_name='${body.username}'`);
    if(data.length && data[0]["user_pass"]==body.password){
        if(ctx.session['admin'] && ctx.session['admin'] == body.username){
            throw new AuthenticationError(500,"用户已登录");
        }else{
            ctx.session['admin']=body.username;
            ctx.body={
                code:"0",
                desc:"登录成功"
            };
        }
    }else {
        throw new AuthenticationError(500,"登录失败,密码错误");
    }
});
router.post("/reg",async (ctx)=>{
    let body=ctx.request.body;
    if(!checkInfo(body.username,body.password)){
        return ;
    }
    data=await checkMysqlHandle(ctx.db.query,`SELECT id FROM user_table WHERE user_name='${body.username}'`);
    if(data.length){
        throw new AuthenticationError(500,"此用户名已被占用");
    }else {
        data=await checkMysqlHandle(ctx.db.query,`INSERT INTO user_table (user_name, user_pass) VALUES('${body.username}', '${body.password}')`);
        ctx.body={
            code:"0",
            desc:"注册成功"
        };
    }
});
module.exports=router.routes();
