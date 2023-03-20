# docxtemplater for node-red

based by docxtemplater libary generate docx/pptx documents from a docx/pptx template. It can replace {placeholders} with data and also supports loops and conditions.

## how to usage

create your template according to the instructions in the link and put the generated template in your local directory.

give file path to "msg.templateDocx" or fill in Template(Docx) setting in node

For file output, the Outfile field in the node or msg.outFile must be filled.

If you leave this field blank, the buffer object is output by default.
