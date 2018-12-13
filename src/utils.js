#!/usr/bin/env node

const chalk = require("chalk"),
    fs = require("fs-extra");

module.exports = {
    log(message, type = "info") {
        let prefix = chalk.white.inverse(" #SUMMONER ") + " ";

        switch (type) {
            case "info":
                prefix += "[INFO]";
                break;

            case "error":
                prefix += chalk.red.bold("[ERROR]");
                break;

            case "warning":
                prefix += chalk.yellow.bold("[WARN]");
                break;

            case "success":
                prefix += chalk.green.bold("[DONE]");
                break;

            case "progress":
                prefix += chalk.magenta.bold("[PROGRESS]");
                break;

            default:
                prefix += `[${type.toUpperCase()}]`;
                break;
        }

        console.log(`${prefix} ${message}`);
    },

    clear() {
        console.clear();
        process.stdout.write("\x1Bc");
    },

    break() {
        console.log("");
    },

    directoryExists(path) {
        return fs.existsSync(path);
    }
};
