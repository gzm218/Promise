# 笔记

## 异步编程

- fs 文件操作
  ```js
  require('fs').readFile('./resources/为学.md', (err, data) =>{})4
  ```
- 数据库操作
- AJAX
  ```js
  $.get('/server', (data) => {});
  ```
- 定时器
  ```js
  setTiomeout(() => {}, 2000);
  ```

## Promise 的状态

实例对象中的一种属性 【PromiseState】

- pending
- resolved /fullfilled 成功
- rejected 失败

## Promise 对象的值

实例对象中的另一个属性 【PromiseResult】
保存着对象的 成功/失败的 结果

- resolve
- reject

## 几个关键问题

- 状态修改，原本是 pending 修改成 fulfilled 或 rejected 通过 reslove reject
- 执行多个回调
- 改变状态与指定回调顺序问题 只有 pending 转变成 fulfilled 或 rejected .then 才会开始执行
- then 方法 串联多个
- 异常穿透 一个 catch 可以捕捉到前面的错误

## 盲点

try catch
