(async function () { const res = await Promise.resolve('RESOLVED!');
console.log(res);
 })().catch(e => {})
