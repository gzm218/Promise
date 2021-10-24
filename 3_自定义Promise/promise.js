class Promise {
  //构造方法
  constructor(executor) {
    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    //声明属性
    this.callbacks = [];
    //保存实例对象的 this 值
    const that = this;
    // 声明 res 和rej两个函数 才能在Promise中调用
    function resolve(data) {
      //判断状态
      if (that.PromiseState !== 'pending') return;
      //修改对象状态 promiseState
      that.PromiseState = 'fulfilled';
      //设置对象结果值 promiseResult
      that.PromiseResult = data;
      //调用成功的回调函数
      // setTimeout(() => {
      that.callbacks.forEach((item) => {
        item.onResolved(data);
      });
      // });
    }
    function reject(data) {
      //判断状态
      if (that.PromiseState !== 'pending') return;
      //修改对象状态 promiseState
      that.PromiseState = 'rejected';
      //设置对象结果值 promiseResult
      that.PromiseResult = data;
      //调用失败的回调函数
      setTimeout(() => {
        that.callbacks.forEach((item) => {
          item.onReject(data);
        });
      });
    }
    try {
      //同步提调用 执行器函数
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then 方法
  then(onResolved, onReject) {
    const that = this;
    if (typeof onReject !== 'function') {
      onReject = (reason) => {
        throw reason;
      };
    }
    if (typeof onResolved !== 'function') {
      onResolved = (value) => value;
    }
    return new Promise((reslove, reject) => {
      //回调函数
      //封装函数
      function callback(type) {
        let result = type(that.PromiseResult);
        if (result instanceof Promise) {
          result.then(
            (v) => {
              reslove(v);
            },
            (r) => {
              reject(r);
            }
          );
        } else {
          reslove(result);
        }
      }
      if (this.PromiseState === 'fulfilled') {
        // onResolved(this.PromiseResult);
        // 获取或掉函数的执行结果
        setTimeout(() => {
          callback(onResolved);
        });
      }
      if (this.PromiseState === 'rejected') {
        setTimeout(() => {
          callback(onReject);
        });
      }
      //判断pending 状态
      if (this.PromiseState === 'pending') {
        //保存回调函数
        this.callbacks.push({
          onResolved: function () {
            try {
              callback(onResolved);
            } catch (error) {
              reject(error);
            }
          },
          //执行程的回调函数
          onReject: function () {
            try {
              callback(onReject);
            } catch (error) {
              reject(error);
            }
          },
        });
      }
    });
  }

  // catch 方法
  catch(onReject) {
    return this.then(undefined, onReject);
  }

  // resolve 方法
  static reslove(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(
          (v) => {
            resolve(v);
          },
          (r) => {
            reject(r);
          }
        );
      } else {
        resolve(value);
      }
    });
  }

  // reject
  static reject(reason) {
    return new Promise((reslove, reject) => {
      reject(reason);
    });
  }

  // all
  static all(promise) {
    // 返回结果是个Promise对象
    return new Promise((reslove, reject) => {
      //声明变量
      let count = 0;
      // 存放结果
      let arr = [];
      // 遍历数组
      for (let i = 0; i < promise.length; i++) {
        promise[i].then(
          (v) => {
            //得知对象的状态是成功
            //每个promise对象 都成功
            count++;
            // 将当前promise对象成功的结果 存入到数组中
            arr[i] = v;
            //判断
            if (count === promise.length) {
              //修改对象状态
              reslove(arr);
            }
          },
          (r) => {
            reject(r);
          }
        );
      }
    });
  }

  // race
  static race(promise) {
    return new Promise((reslove, reject) => {
      for (let i = 0; i < promise.length; i++) {
        promise[i].then(
          (v) => {
            reslove(v);
          },
          (r) => {
            reject(r);
          }
        );
      }
    });
  }
}

//声明构造函数
// function Promise(executor) {
//   // 添加属性
//   this.PromiseState = 'pending';
//   this.PromiseResult = null;
//   //声明属性
//   this.callbacks = [];
//   //保存实例对象的 this 值
//   const that = this;
//   // 声明 res 和rej两个函数 才能在Promise中调用
//   function resolve(data) {
//     //判断状态
//     if (that.PromiseState !== 'pending') return;
//     //修改对象状态 promiseState
//     that.PromiseState = 'fulfilled';
//     //设置对象结果值 promiseResult
//     that.PromiseResult = data;
//     //调用成功的回调函数
//     // setTimeout(() => {
//     that.callbacks.forEach((item) => {
//       item.onResolved(data);
//     });
//     // });
//   }
//   function reject(data) {
//     //判断状态
//     if (that.PromiseState !== 'pending') return;
//     //修改对象状态 promiseState
//     that.PromiseState = 'rejected';
//     //设置对象结果值 promiseResult
//     that.PromiseResult = data;
//     //调用失败的回调函数
//     setTimeout(() => {
//       that.callbacks.forEach((item) => {
//         item.onReject(data);
//       });
//     });
//   }
//   try {
//     //同步提调用 执行器函数
//     executor(resolve, reject);
//   } catch (error) {
//     reject(error);
//   }
// }

// //添加 then 方法
// Promise.prototype.then = function (onResolved, onReject) {
//   const that = this;
//   if (typeof onReject !== 'function') {
//     onReject = (reason) => {
//       throw reason;
//     };
//   }
//   if (typeof onResolved !== 'function') {
//     onResolved = (value) => value;
//   }
//   return new Promise((reslove, reject) => {
//     //回调函数
//     //封装函数
//     function callback(type) {
//       let result = type(that.PromiseResult);
//       if (result instanceof Promise) {
//         result.then(
//           (v) => {
//             reslove(v);
//           },
//           (r) => {
//             reject(r);
//           }
//         );
//       } else {
//         reslove(result);
//       }
//     }
//     if (this.PromiseState === 'fulfilled') {
//       // onResolved(this.PromiseResult);
//       // 获取或掉函数的执行结果
//       setTimeout(() => {
//         callback(onResolved);
//       });
//     }
//     if (this.PromiseState === 'rejected') {
//       setTimeout(() => {
//         callback(onReject);
//       });
//     }
//     //判断pending 状态
//     if (this.PromiseState === 'pending') {
//       //保存回调函数
//       this.callbacks.push({
//         onResolved: function () {
//           try {
//             callback(onResolved);
//           } catch (error) {
//             reject(error);
//           }
//         },
//         //执行程的回调函数
//         onReject: function () {
//           try {
//             callback(onReject);
//           } catch (error) {
//             reject(error);
//           }
//         },
//       });
//     }
//   });
// };

//添加 catch 方法
// Promise.prototype.catch = function (onReject) {
//   return this.then(undefined, onReject);
// };

//添加 resolve 方法
// Promise.resolve = function (value) {
//   return new Promise((resolve, reject) => {
//     if (value instanceof Promise) {
//       value.then(
//         (v) => {
//           resolve(v);
//         },
//         (r) => {
//           reject(r);
//         }
//       );
//     } else {
//       resolve(value);
//     }
//   });
// };

//添加 reject 方法
// Promise.reject = function (reason) {
//   return new Promise((reslove, reject) => {
//     reject(reason);
//   });
// };

//添加 all 方法
// Promise.all = function (promise) {
//   // 返回结果是个Promise对象
//   return new Promise((reslove, reject) => {
//     //声明变量
//     let count = 0;
//     // 存放结果
//     let arr = [];
//     // 遍历数组
//     for (let i = 0; i < promise.length; i++) {
//       promise[i].then(
//         (v) => {
//           //得知对象的状态是成功
//           //每个promise对象 都成功
//           count++;
//           // 将当前promise对象成功的结果 存入到数组中
//           arr[i] = v;
//           //判断
//           if (count === promise.length) {
//             //修改对象状态
//             reslove(arr);
//           }
//         },
//         (r) => {
//           reject(r);
//         }
//       );
//     }
//   });
// };

//添加 race 方法 谁先改变状态就调用谁的结果
// Promise.race = function (promise) {
//   return new Promise((reslove, reject) => {
//     for (let i = 0; i < promise.length; i++) {
//       promise[i].then(
//         (v) => {
//           reslove(v);
//         },
//         (r) => {
//           reject(r);
//         }
//       );
//     }
//   });
// };
