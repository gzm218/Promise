/**
 * util.promisify 方法
 * 
 */
const util = require('util');
const fs = require('fs');

let mineReadFile = util.promisify(fs.readFile);

mineReadFile('./resources/为学.md').then((value) => {
  console.log(value.toString());
});
