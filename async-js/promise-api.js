const p1 = new Promise((resolve, reject) => {
 setTimeout(() => {
  console.log('promise 1');
  // resolve(1)
  reject(new Error('bad request'))
 }, 2000);
})

const p2 = new Promise((resolve, reject) => {
 setTimeout(() => {
  console.log('promise 2');
  resolve(2)
 }, 2000);
})

Promise.allSettled([p1,p2]).then(result => console.log(result))
