# docxtemplater for node-red

based by docxtemplater libary generate docx/pptx documents from a docx/pptx template. It can replace {placeholders} with data and also supports loops and conditions.

## how to usage

create your template according to the instructions in the link and put the generated template in your local directory.

give file path to "msg.templateDocx" or fill in Template(Docx) setting in node

For file output, the Outfile field in the node or msg.outFile must be filled.

If you leave this field blank, the buffer object is output by default.

## example flow.json

```JSON
[
    {
        "id": "d3e62523051182d9",
        "type": "docxtemplater",
        "z": "5c2c0a4858445b3b",
        "name": "",
        "x": 480,
        "y": 500,
        "wires": [
            [
                "9b2a180f7897e90c"
            ]
        ]
    },
    {
        "id": "90a10276a9879f0b",
        "type": "function",
        "z": "5c2c0a4858445b3b",
        "name": "prepare",
        "func": "msg.templateDocx = \"/Users/omerkaptan/Downloads/example.docx\"\nmsg.payload = {\n    first_name: \"John\",\n    last_name: \"Doe\",\n    phone: \"0652455478\",\n    description: \"New Website\",\n}\nmsg.outFile = \"/Users/omerkaptan/Downloads/convert.docx\"\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 320,
        "y": 500,
        "wires": [
            [
                "d3e62523051182d9"
            ]
        ]
    },
    {
        "id": "9b2a180f7897e90c",
        "type": "debug",
        "z": "5c2c0a4858445b3b",
        "name": "debug 2",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 640,
        "y": 500,
        "wires": []
    },
    {
        "id": "73f0b69b3c9173aa",
        "type": "inject",
        "z": "5c2c0a4858445b3b",
        "name": "",
        "props": [],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 190,
        "y": 500,
        "wires": [
            [
                "90a10276a9879f0b"
            ]
        ]
    }
]
```