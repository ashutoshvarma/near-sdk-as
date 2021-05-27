const os = require("os");
const osName = os.platform().toLowerCase();

function isx64() {
  return os.arch() === "x64";
}

const getOsName = () => `${osName}_${isx64() ? "x64" : "x32"}`;

const targets = {
  win32_x64: "i686-pc-windows-gnu",
  win32_x32: "86_64-pc-windows-gnu",
  linux_x32: "i686-unknown-linux-gnu",
  linux_x64: "x86_64-unknown-linux-gnu",
  darwin_x64: "x86_64-apple-darwin",
};


