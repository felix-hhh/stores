import express, {Application} from "express";
import Stores from "./Stores";
import {ContentItem} from "./module/ContentItem";

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

    /**
     * 首页
     */
    app.get("/", (req, res) => {
        const pageProps = stores.pagePropsMap;
        const currentPageData: ContentItem[] = [];
        pageProps.forEach((value, key) => {
            currentPageData.push({
                title: value.title,
                intro: value.intro,
                key: key
            });
        });

        res.render("index", {
            siteTitle: Stores.defaultConfig.title,
            siteSubtitle: Stores.defaultConfig.subtitle,
            pageTitle: "最新文章",
            asideMenu: stores.asideMenu,
            blogData: currentPageData,
            pageKey: "index"
        });
    });

    /**
     * 文章列表
     */
    app.get("/blog/:page", (req, res) => {
        const page = req.params["page"];
        res.render("blog", {
            serverName: Stores.defaultConfig.title,
            asideMenu: stores.asideMenu,
            pageKey: "blog"
        });
    });

    /**
     * 关于
     */
    app.get("/about", (req, res) => {
        res.render("about", {
            siteTitle: Stores.defaultConfig.title,
            siteSubtitle: Stores.defaultConfig.subtitle,
            pageTitle: "关于",
            asideMenu: stores.asideMenu,
            pageKey: "about"
        });
    });

    app.get("/article/:filename.html", (req, res) => {
        const filename = req.params["filename"];
        const pageProps = stores.pagePropsMap.get(filename);
        res.render("index", {
            title: pageProps?.title,
            serverName: Stores.defaultConfig.title,
            content: pageProps?.content,
            listData: stores.menuMap
        });
    });

    // console.log(stores.pagePaths);

    app.listen(port, () => {
        console.log(`😎 Server is running on http://localhost:${Stores.defaultConfig.port}`);
    });
};

initServer();
