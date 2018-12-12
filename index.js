#!/usr/bin/env node
"use strict";

const program = require("commander"),
  exec = require("child_process").exec,
  chalk = require("chalk"),
  pkg = require("./package.json"),
  fs = require("fs-extra");

clear();

program
  .version(pkg.version, "-v, --version")
  .command("install <env> [path]")
  .description("Summon a ready-to-go web app structure.")
  .alias("i")
  .action(function(env, path) {
    if (!path) path = "./";

    switch (env) {
      case "react":
        createReactApp(path);
        log("Installing create-react-app...");
        return;

      default:
        log("There is no such environment!", "warning");
        return;
    }
  });

program.parse(process.argv);

function createReactApp(path) {
  let execCallback = (error, stdout, stderr) => {
    clear();

    if (error) log(error, "error");
    if (stderr) log(stderr, "error");

    if (stdout) {
      log("Environment summoned!", "success");

      fs.mkdir(path + "src/core", { recursive: true }, err => {
        if (err) log(err, "error");
        log("Created 'core' directory.", "success");
      });
    }
  };

  exec(`npx create-react-app ${path}`, execCallback);
}

function log(message, type = "info") {
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

    default:
      prefix += `[${type.toUpperCase()}]`;
      break;
  }

  console.log(`${prefix} ${message}`);
}

function clear() {
  console.clear();
  process.stdout.write("\x1Bc");
}
