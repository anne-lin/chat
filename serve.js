const Koa = require('koa');
const Router=require('koa-router');
const cors=require("koa2-cors");
const {HTTP_PORT,allowOrigin}=require("./config");

let server=new Koa();
let router=new Router();
server.use(cors({
    origin:allowOrigin,
    credentials:true
}));
server.use(async (ctx, next)=>{
    try{
        await next();
    }catch(e){
        ctx.throw("500","服务器错误");
    }
});

router.use("/login",require("./routers/login"));
server.use(router.routes());
server.listen(HTTP_PORT);
console.log("listen:",HTTP_PORT);
