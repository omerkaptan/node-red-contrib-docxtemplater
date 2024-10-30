# node-red-contrib-docxtemplater

`node-red-contrib-docxtemplater` is a [Node-RED](https://nodered.org/) node that enables you to generate Word documents (.docx) by dynamically filling templates using [Docxtemplater](https://docxtemplater.com/). With this node, you can create rich, personalized Word documents directly from Node-RED, making it ideal for report generation, invoices, and custom documents.

## Installation

To install, run the following command in your Node-RED directory:

```bash
npm install omerkaptan/node-red-contrib-docxtemplater
```

## Usage

1. **Template Creation**: Start by creating a `.docx` template with placeholders formatted as tags, like `{{name}}`, `{{date}}`, or `{{items}}`. Tags are placeholders that Docxtemplater will replace with actual values.
2. **Template Input**: Provide the `.docx` template to the node, either as a file path or binary input.
3. **Data Input**: Send data as a JSON object, mapping each tag to a value (e.g., `{ "name": "Alice", "date": "2024-10-30" }`).
4. **Output**: The node outputs a `.docx` document where each placeholder is replaced by the data you've provided.

### Examples

Here are some specific tag usage examples you can use with your `.docx` templates:

- **Simple Text Replacement**: Replace `{{name}}` with a name:
  ```json
  { "name": "Alice" }
  ```

- **Looping Over Arrays**: To add a list of items in a table format, use the `{{#items}}...{{/items}}` tag structure in your `.docx` template, and pass an array of objects as shown below:
  ```json
  {
    "items": [
      { "description": "Item 1", "price": 10 },
      { "description": "Item 2", "price": 15 }
    ]
  }
  ```

- **Conditional Tags**: Use conditional tags to show or hide content based on a value:
  ```json
  { "isApproved": true }
  ```
  In your template, use tags like `{{#isApproved}}Approved{{/isApproved}}` to display "Approved" only if `isApproved` is true.

For more advanced tag types and formatting options, see the full [Docxtemplater Tag Types documentation](https://docxtemplater.com/docs/tag-types/).

### Example Flow

1. **Template Node**: Use a file input node to load the `.docx` template.
2. **Data Node**: Add a JSON node with the structured data to fill in placeholders.
3. **Docxtemplater Node**: Connect the template and data nodes to the `docxtemplater` node.
4. **Output Node**: Use a file output node to save the generated `.docx` document.

## Dependencies

This node depends on [Docxtemplater](https://docxtemplater.com/) for template processing, so refer to their documentation for further customization options.

## License

MIT License