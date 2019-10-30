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

router.post("/",async (ctx)=>{
    let checkInfoResult=checkInfo(ctx.request.name,ctx.request.password);
    if(checkInfoResult){
        ctx.body={
          code:"-1",
          desc:checkInfoResult
        };
    }

});
router.post("/register",async (ctx)=>{

});
module.exports=router.routes();
