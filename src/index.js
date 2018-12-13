#!/usr/bin/env node
"use strict";

const program = require("commander"),
    pkg = require("../package.json"),
    chalk = require("chalk"),
    utils = require("./utils.js"),
    exec = require("child_process").exec,
    fs = require("fs-extra"),
    validate = require("validate-npm-package-name"),
    creators = require("./creators/index.js");

/** CONSTANTS */

const LIST = {
    react: {
        package: "create-react-app",
        setup: creators.createReactApp
    }
};

/** ========== SETUP ========== */

program.version(pkg.version, "-v, --version");

/** ========== COMMANDS ========== */

program
    .command("install <env> [path]")
    .description("Summon a ready-to-go web app structure.")
    .alias("i")
    .action(function(env, path) {
        if (!path) path = "./";

        if (!LIST[env]) {
            utils.log("This environment is not available!", "error");
            return;
        }

        utils.clear();

        summon(LIST[env], path, err => {
            if (err) utils.log(err, "error");
            utils.break();
            utils.log("Environment summoned!", "success");
        });
    });

program
    .command("list")
    .alias("ls")
    .action(function() {
        utils.log("List of available presets:");
        utils.break();
        for (var pckg in LIST) {
            console.log(`- ${chalk.bold(pckg)} (${LIST[pckg].package})`);
        }
    });

program.parse(process.argv);

/** ========== FUNCTIONS ========== */

function summon(env, path, callback) {
    if (path[path.length - 1] === "/")
        path = path.substring(0, path.length - 1);

    if (!validate(env.package)["validForNewPackages"]) {
        callback(`Package ${env.package} is not valid.`);
        return;
    }

    fs.ensureDir(path, err => {
        if (err) {
            callback(err);
            return;
        }

        utils.log(`Installing ${env.package}...`);

        exec(`npx create-react-app ${path}`, (error, stdout, stderr) => {
            if (error) {
                callback(error);
                return;
            }
            if (stderr) {
                callback(stderr);
                return;
            }

            if (stdout) {
                env.setup(path, err => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    callback();
                });
            }
        });
    });
}
