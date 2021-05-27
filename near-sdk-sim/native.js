const os = require("os");
const osName = os.platform().toLowerCase();

function isx64() {
  return os.arch() === "x64";
}

const getOsName = () => `${osName}_${isx64() ? "x64" : "x32"}`;

const sim = require(`./bin/${getOsName()}.node`);

module.exports = sim;
