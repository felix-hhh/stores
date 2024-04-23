import path from "path";
import {defineConfig} from "vite";


const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "~/": `${pathSrc}/`,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: "@use \"~/styles/element/index.scss\" as *;",
            },
        },
    },
    plugins: [

    ],
    server: {
        host: "0.0.0.0"
    }
});
