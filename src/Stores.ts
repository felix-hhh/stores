import fs from "fs";
import MarkdownIt from "markdown-it";
import {PageProps} from "./module/PageProps";
import Prism from "prismjs";
import loadLanguages from "prismjs/components/";
import {htmlToText} from "html-to-text";
import {MenuItem} from "./module/MenuItem";
import {substring} from "./utils/substring";


export interface StoresConfig {
    srcDir: string;
    outDir: string;
    title?: string;
    subtitle?: string;
    description?: string;
    port: number;
    githubUrl?: string;
}

export default class Stores {
    /**
     * 页面路径
     */
    public pagePaths: string[] = [];
    public menuMap: MenuItem[] = [];


    public pagePropsMap: Map<string, PageProps> = new Map<string, PageProps>();
    /**
     * 模版文件名检测
     */
    public static REGEXP_PAGE = /[\\/\\][^_][^\\/\\]*\.(md)$/;

    public static defaultConfig: StoresConfig = {
        srcDir: "src/public/docs",
        outDir: "",
        port: 3000,
        title: "Stores",
        subtitle: "收集一切的美好"
    };

    public asideMenu: MenuItem[] = [
        {label: "最新文章", url: "/", key: "index"},
        {label: "存档", url: "/store", key: "store"},
        {label: "关于", url: "/about", key: "about"}
    ];

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
        this.pagePaths.forEach((filename) => {
            const content: string = fs.readFileSync(Stores.defaultConfig.srcDir + "/" + filename).toString();

            const markdownIt: MarkdownIt = new MarkdownIt({
                highlight: (str: string, lang: string = "autoit") => {
                    if (lang.length == 0) {
                        lang = "autoit";
                    }
                    loadLanguages([lang]);
                    let grammar = Prism.languages[lang];
                    Prism.hooks.run("before-highlight", {grammar: grammar});
                    return `<pre><code class="language-${lang}">${Prism.highlight(
                        str,
                        grammar,
                        lang,
                    )}</code></pre>`;
                }
            });
            const mdStr: string = markdownIt.render(content);

            filename = filename.replace(".md", "");
            const contentTitleHTML: string = mdStr.match(/^<h1[ >](.*?)<\/h1>/)?.[0] || "";
            const contentBodyHTML:string = mdStr.replace(/^<h1[ >].*?<\/h1>/,"")
            const title = htmlToText(contentTitleHTML, {
                    tags: {
                        h1: {options: {uppercase: false}}
                    }
                }
            );
            const intro: string = substring(
                htmlToText(contentBodyHTML,{
                    tags: {
                        a: { options: { ignoreHref: true } },
                        img: { format: 'skip' },
                        blockquote: { format: 'skip' },
                        ul: { options: { itemPrefix: ' - ' } },
                        h1: { options: { uppercase: false } },
                        h2: { options: { uppercase: false } },
                        h3: { options: { uppercase: false } },
                        h4: { options: { uppercase: false } },
                        h5: { options: { uppercase: false } },
                        h6: { options: { uppercase: false } },
                        table: { options: { uppercaseHeaderCells: false } },
                    }
            }), 200, "...");
            const pageProps: PageProps = {
                title: title,
                content: mdStr,
                intro: intro
            };

            this.pagePropsMap.set(filename, pageProps);
            this.menuMap.push({label: title, url: filename});
        });
    }
}
