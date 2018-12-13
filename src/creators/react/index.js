const exec = require("child_process").exec,
  fs = require("fs-extra"),
#!/usr/bin/env node

  utils = require("../../utils.js");

module.exports = function(path, callback) {
  const dirsStructure = [
    path + "src/core",
    path + "src/components/header",
    path + "src/pages/home",
    path + "src/utils"
  ];

  let execCallback = (error, stdout, stderr) => {
    utils.clear();

    if (error) callback(error);
    if (stderr) callback(stderr);

    if (stdout) {
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
    }
  };

  exec(`npx create-react-app ${path}`, execCallback);
};
