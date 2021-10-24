function mineReadFile(path) {
  return new Promise((res, rej) => {
    require('fs').readFile(path, (err, data) => {
      if (err) rej(err);
      res(data);
    }); 
  });
}

mineReadFile('./resources/插秧诗.md').then(
  (value) => {
    console.log(value.toString());
  },
  (reason) => {
    console.log(reason);
  }
);
