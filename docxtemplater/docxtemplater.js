const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const convertTemplate = async ({ templateDocx, parameters, outFile }) => {
  const content = await promisify(fs.readFile)(
    path.resolve(__dirname, templateDocx),
    "binary"
  );
  const zip = new PizZip(content);
  const expressionParser = require('docxtemplater/expressions.js');
  const doc = new Docxtemplater(zip, {
    parser: expressionParser,
    paragraphLoop: true,
    linebreaks: true,
  });
  doc.render(parameters);
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
  if (!outFile) return buf;
  await promisify(fs.writeFile)(path.resolve(__dirname, outFile), buf);
  return outFile;
};

module.exports = function (RED) {
  function docxtemplater(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on("input", async function (msg) {
      const templateDocx = config.templateDocx || msg.templateDocx;
      const outFile = config.outFile || msg.outFile;
      const parameters = msg.payload || {};
      try {
        const convertedTemplate = await convertTemplate({
          templateDocx,
          parameters,
          outFile,
        });
        msg.payload = convertedTemplate;
        node.send(msg);
      } catch (error) {
        node.error(error);
      }
    });
  }
  RED.nodes.registerType("docxtemplater", docxtemplater);
};
