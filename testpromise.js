    

function promise1() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(1);
      //reject(1);
    }, 1000);
  });
}

function promise2() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(2);
      //reject(2);
    }, 1000);
  });
}

function promise3() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(3);
    }, 1000);
  });
}

function promise4() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      //resolve(4);
      reject(4);
    }, 1000);
  });
}



// 1
// 2 -- resolve
// 3,4 async

function test() {
  return new Promise((resolve, reject) => {
    promise1()
      .then((ret1) => {
        console.log(ret1);
        promise2()
          .then((ret2) => {
            console.log(ret2)
            promise3()
              .then((ret3) => {
                console.log(ret3);
              })
              .catch((err) => {
                console.error(`Error in promise3`);
                reject(err);
              });
            promise4()
              .then((ret4) => {
                console.log(ret4);
              })
              .catch((err) => {
                console.error(`Error in promise4`);
                reject(err);
              });
            resolve('success!');
          })
          .catch((err) => {
            console.error(`Error in promise2`);
            reject(err);
          });
      })
      .catch((err) => {
        console.error(`Error in promise1`);
        reject(err);
      });
  });
}

function test2() {
  return new Promise((resolve, reject) => {
    promise1()
      .then((ret1) => {
        console.log(ret1);
        return promise2();
      })
      .then((ret2) => {
        console.log(ret2);
        promise3()
          .then((ret3) => {
            console.log(ret3);
          })
          .catch((err) => {
            console.error(`Error in promise3`);
            //reject(err); // these do nothing, since resolve already called!
          });
        promise4()
          .then((ret4) => {
            console.log(ret4);
          })
          .catch((err) => {
            console.error(`Error in promise4`);
            //reject(err);
          });
        resolve('success!');
      })
      .catch((err) => {
        console.error(`catch all: ${err}`);
        reject(err);
      });
  });
}



test2()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(`ERROR: ${err}`);
  });
