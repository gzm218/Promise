const fs = require('fs');

// 回调函数的形式
// fs.readFile('./resources/为学.md', (err, data) => {
//   //失败
//   if (err) throw err;
//   console.log(data.toString());
// });

//Promise 形式
const p = new Promise(function (resolve, reject) {
  fs.readFile('./resources/为学.md', (err, data) => {
    //失败
    if (err) reject(err);
    //成功
    resolve(data);
  });
}).then(
  function (value) {
    console.log(value.toString());
  },
  function (err) {
    console.log(err);
  }
);
