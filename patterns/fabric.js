var o = new Object();
var n = new Object(1);
var s = Object('1');
var b = Object(true);

console.log(o.constructor === Object); // true
console.log(n.constructor === Number); // true
console.log(s.constructor === String); // true
console.log(b.constructor === Boolean); // true
