/**
 * resource 合并 文件内容
 */

const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);

//回调很熟方式
fs.readFile('./resources/为学.md', (err, data) => {
  if (err) throw err;
  fs.readFile('./resources/插秧诗.md', (err, data2) => {
    if (err) throw err;
    fs.readFile('./resources/观书有感.md', (err, data3) => {
      if (err) throw err;
      console.log(data + data2 + data3);
    });
  });
});

//async 与 await
async function main() {
  try {
    let data1 = await mineReadFile('./resources/为学.md');
    let data2 = await mineReadFile('./resources/插秧诗.md');
    let data3 = await mineReadFile('./resources/观书有感.md');

    console.log(data1 + data2 + data3);
  } catch (error) {
    console.log(error);
  }
}

main();
