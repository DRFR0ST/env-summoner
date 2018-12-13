#!/usr/bin/env node

const fs = require("fs-extra"),
  utils = require("../../utils.js");

module.exports = function(path, callback) {
  const dirsStructure = [
    path + "src/core",
    path + "src/components/header",
    path + "src/pages/home",
    path + "src/utils"
  ];

  utils.clear();

   utils.log(`Installed create-react-app.`, "success");
    utils.break();

    for (var i = 0; i < dirsStructure.length; i++) {
      fs.mkdirsSync(dirsStructure[i]);
      utils.log(
        `Created ${dirsStructure[i].split(path)[1]} directory.`,
        "progress"
      );
    }

    fs.moveSync(`${path}/src/App.js`, `${path}/src/core/App.js`);
    fs.moveSync(`${path}/src/App.test.js`, `${path}/src/core/App.test.js`);
    fs.moveSync(`${path}/src/App.css`, `${path}/src/core/App.css`);
    fs.moveSync(`${path}/src/logo.svg`, `${path}/src/core/logo.svg`);

    callback();
};
