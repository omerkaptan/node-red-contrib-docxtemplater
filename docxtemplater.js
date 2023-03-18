const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs/promises");
const path = require("path");

const convert = async (args) => {
  const { templateDocx, parameters, outDocx } = args;
  const content = fs.readFileSync(
    path.resolve(__dirname, templateDocx),
    "binary"
  );
  // Load the docx file as binary content
  const zip = new PizZip(content);
  // Option
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
  doc.render(parameters);
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });
  // buf is a nodejs Buffer, you can either write it to a
  // file or res.send it with express for example.
  fs.writeFileSync(path.resolve(__dirname, outDocx), buf);
};

module.exports = function (RED) {
  function docxtemplater(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    let payload = {
      templateDocx: config.templateDocx || msg.templateDocx,
      parameters: config.parameters || msg.parameters,
      outDocx: config.outDocx || msg.outDocx,
    };
    node.on("input", async function (msg) {
      await convert(payload)
        .then((result) => {
          msg.payload = "Başarılı";
          node.send(msg);
        })
        .catch((err) => {
          msg.payload = err
          node.send(msg)
        });
    });
  }
  RED.nodes.registerType("docxtemplater", docxtemplater);
};
