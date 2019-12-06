const Router=require('koa-router');

let router=new Router();

function checkInfo(name,password){
    if(!name){
        return "用户名不存在";
    }
    if(!password){
        return "密码为空";
    }
    return false;
}

router.post("/login",async (ctx)=>{
    let body=ctx.request.body;
    let checkInfoResult=checkInfo(body.username,body.password);
    if(checkInfoResult){
        ctx.throw (500,checkInfoResult);
    }
    console.log("执行");
    let data=await ctx.db.query(`SELECT user_pass FROM user_table WHERE user_name='${body.username}'`);
    if(data.length && data[0]["user_pass"]==body.password){
        if(ctx.session['admin'] && ctx.session['admin'] == body.username){
            ctx.body={
                code:"-1",
                desc:"用户已登录"
            };
        }else{
            ctx.session['admin']=body.username;
            ctx.body={
                code:"0",
                desc:"登录成功"
            };
        }
    }else {
        ctx.body={
            code:"0",
            desc:"登录失败,密码错误"
        };
    }
});
router.post("/reg",async (ctx)=>{
    console.log("reg:",ctx.request.body);
    ctx.body={
        code:"-1",
        desc:"此用户名已被占用"
    };
    let checkInfoResult=checkInfo(ctx.request.username,ctx.request.password),data;
    if(checkInfoResult){
        ctx.body={
            code:"-1",
            desc:checkInfoResult
        };
    }
    data=await ctx.db.query(`SELECT id FROM user_table WHERE user_name='${ctx.request.username}'`);
    if(data.length){
        ctx.body={
            code:"-1",
            desc:"此用户名已被占用"
        };
    }else {
        data=await ctx.db.query(`INSERT INTO user_table (user_name, user_pass) VALUES('${ctx.request.username}', '${ctx.request.password}')`);
        ctx.body={
            code:"0",
            desc:"注册成功"
        };
    }
});
module.exports=router.routes();
