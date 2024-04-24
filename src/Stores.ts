import fs from "fs";
import MarkdownIt from "markdown-it";
import {defineConfig} from "vite";
import {PageProps} from "./module/PageProps";

export interface StoresConfig {
    srcDir: string;
    outDir: string;
    title?: string;
    description?: string;
    port: number;
    githubUrl?: string;
}

export default class Stores {
    /**
     * 页面路径
     */
    public pagePaths: string[] = [];

    public pagePropsMap: Map<String, PageProps> = new Map<String, PageProps>();
    /**
     * 模版文件名检测
     */
    public static REGEXP_PAGE = /[\\/\\][^_][^\\/\\]*\.(md)$/;

    public static defaultConfig: StoresConfig = {
        srcDir: "src/public/docs",
        outDir: "",
        port: 3000,
        title: "STORES1",
    };

    public init() {
        this.initConfig();
        this.initPaths();
        this.rendFiles();
    }

    /**
     * 初始化
     */
    public initConfig() {
    }

    /**
     * 初始化路径
     */
    public initPaths() {
        const filenames: string[] = fs.readdirSync(Stores.defaultConfig.srcDir);

        this.pagePaths.push(...filenames);
    }

    public rendFiles() {
        console.log(this.pagePaths.length);
        this.pagePaths.forEach((filename) => {
            console.log("filename:" + filename);
            const content: string = fs.readFileSync(Stores.defaultConfig.srcDir + "/" + filename).toString();

            const markdownIt: MarkdownIt = new MarkdownIt();
            const mdStr: string = markdownIt.render(content);

            filename = filename.replace(".md", "");
            const pageProps: PageProps = {
                title: filename,
                content: mdStr,
            };

            this.pagePropsMap.set(filename, pageProps);
        });
    }
}
