const Koa = require('koa');
//const bodyParser = require('koa-bodyparser');
const Router=require('koa-router');
const cors=require("koa2-cors");
const config=require("./config");
const fs=require("fs");
const session=require("koa-session");
const koaBody=require("koa-body");

let server=new Koa();

server.context.db=require("./lib/database");
server.context.config=config;


//设置cookie随机数
server.keys=fs.readFileSync('.keys').toString().split('\n');

server.use(session({
    maxAge:20*60*1000,
    renew:true
},server));

//server.use(bodyParser());
server.use(koaBody());

let router=new Router();

//设置跨域访问网址
server.use(cors({
    origin:config.allowOrigin,
    credentials:true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

server.use(async (ctx, next)=>{
    try{
        console.log(ctx);
        await next();
    }catch(e){
        ctx.throw("500","服务器错误");
    }
});

router.use("/loginInfo",require("./routers/login"));
server.use(router.routes());
server.listen(config.HTTP_PORT);
console.log("listen:",config.HTTP_PORT);
