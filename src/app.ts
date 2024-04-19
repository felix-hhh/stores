import express,{Application} from "express";

const app:Application = express();

app.use('/', ()=>{});

app.listen(3000, () => {
    console.log('端口启动成功');
});
