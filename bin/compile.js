var YAML = require('yamljs');
var path = require('path');
var fs = require('fs');

var compilePath = path.resolve(__dirname, '../items');

// Concat Files in the compilePath

var arrayFileNames = fs.readdirSync(compilePath);

arrayFileContent = arrayFileNames.map((filename) => {
    filePath = path.resolve(compilePath, filename);
    return fs.readFileSync(filePath);
});

var newFileContent = arrayFileContent.reduce((accumulator, currentValue) => {
    return accumulator  + '\n' + currentValue;
}, '---\n');

// console.log(newFileContent);

// Validate and compile YAML to JSON
var nativeObject = YAML.parse(newFileContent);

for (const key in nativeObject) {
    nativeObject[key]['id'] = key;
    nativeObject[key]['title'] = key;
}

console.log(JSON.stringify(nativeObject));