import { Parser } from './parser';
import { tokenizer } from './tokenizer';

function jsonParser(input: string) {
    const tokens = tokenizer(input);
    console.log(tokens);
    const parser = new Parser(tokens);
    return parser.parse();
}

const jsonString = `{
  "id": "647ceaf3657eade56f8224eb",
  "index": 0,
  "something": [],
  "boolean": true,
  "nullValue": null,
  "nestedObject": {
    "key1": 1,
    "key2": false,
    "key3": [1, {"flag": false}, "hello" ]
  }
}`;

const parsedObject = jsonParser(jsonString);
console.log(parsedObject);