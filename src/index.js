#!/usr/bin/env node
"use strict";

const program = require("commander"),
  pkg = require("../package.json"),
  utils = require("./utils.js"),
  fs = require("fs-extra"),
  creators = require("./creators/index.js");

/** ========== COMMANDS ========== */

program
  .version(pkg.version, "-v, --version")
  .command("install <env> [path]")
  .description("Summon a ready-to-go web app structure.")
  .alias("i")
  .action(function(env, path) {
    if (!path) path = "./";


      
          utils.clear();
        
      
          summon(env, path, err => {
            if (err) utils.log(err, "error");
            utils.break();
            utils.log("Environment summoned!", "success");
          });
  });

program
  .version(pkg.version, "-v, --version")
  .command("list")
  .alias("ls")
  .action(function() {
    utils.log("For now it's just 'react' that you can summon!");
  });

program.parse(process.argv);

/** ========== FUNCTIONS ========== */

function summon(env, path, callback) {
  if(path[path.length-1] === "/") path = path.substring(0, path.length - 1);

  if (utils.directoryExists(path)) {
    utils.log(`The directory under "${path}" already exists!`, "error");
    return;
  }

  switch (env) {
    case "react":
      utils.log("Installing create-react-app...");
      creators.createReactApp(path, err => {
        callback(err);
      });
      return;

    default:
      utils.log("There is no such environment!", "warning");
      return;
  }
}
