#!/usr/bin/env node
const { program } = require("commander");
const { parseFile } = require("./lib");
const path = require("path");
const fs = require("fs");

const successColor = "\x1b[32m";
const package = fs.readFileSync(path.resolve(__dirname, "..", "package.json"));
const { version } = JSON.parse(package);

program
  .version(version)
  .argument("<source>", "source file to read")
  .argument("<output>", "output file to save")
  .action((source, output) => {
    const filePath = path.join("./", source);
    const outputPath = path.join("./", output);

    try {
      const ws = fs.createWriteStream(outputPath);

      parseFile(
        filePath,
        (v) => {
          const { value, full_value: fullValue, name } = v.groups;

          ws.write(`${name}="${value ?? fullValue}"\n`);
        },
        () => {
          ws.close();
          console.log(
            successColor,
            `👌 successfully generated ${output}!`,
            successColor
          );
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  });

program.parse();
