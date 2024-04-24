import express, {Application} from "express";
import MarkdownIt from "markdown-it";
import Stores from "./Stores";

const initServer = async () => {
    const app: Application = express();
    const port: number = 3000;

    //use
    app.use(express.static(__dirname + "/public"));

    const stores: Stores = new Stores();
    stores.init();

    //set
    app.set("view engine", "pug");
    app.set("views", __dirname + "/views");
    app.get("/:filename", (req, res) => {
        const filename = req.params["filename"];
        console.log(stores.pagePropsMap);
        console.log(stores.pagePropsMap.get(filename)?.title);
        res.render("index", {
            title: Stores.defaultConfig.title,
            content: stores.pagePropsMap.get(filename)?.content,
        });
    });

    // console.log(stores.pagePaths);

    app.listen(port, () => {
        console.log(`😎 Server is running on http://localhost:${Stores.defaultConfig.port}`);
    });
};

initServer();
