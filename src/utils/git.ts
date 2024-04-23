import { exec } from "child_process"

const now = new Date();

const getGitBranch = async () => {
    exec("git status", () => {

    });
};

export default getGitBranch;