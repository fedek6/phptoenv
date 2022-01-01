const fs = require("fs");
const readline = require("readline");

const defineRegex =
  /define\( ?['"](?<name>\w+)['"], +(?<full_value>false|true|['"](?<value>.*)['"]) ?\);/mu;

module.exports.parseLine = (line) => {
  return line.match(defineRegex);
};

module.exports.parseFile = (path, onParse, onClose) => {
  if (!fs.existsSync(path)) {
    throw new Error(`There's no ${path} file`);
  }

  const readInterface = readline.createInterface({
    input: fs.createReadStream(path),
    output: null,
    console: false,
  });

  readInterface.on("line", (line) => {
    const output = this.parseLine(line);

    if (output) {
      onParse(output);
    }
  }).on("close", () => {
    onClose();
  });
};
