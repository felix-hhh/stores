import { exec } from "child_process";

const now = new Date();

const getGitBranch = async () => {
    exec("git status", (error, stdout, stderr) => {
        if (error) {
            console.error(`执行的错误: ${error}`);
            return;
        }
    });
};

export default getGitBranch;
