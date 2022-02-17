require('./index.css')
require('./index.scss')
let moment = require('moment'),
    md5 = require('js-md5'),
    base64 = require('js-base64').Base64
var sha1 = require('sha1')
console.log(Number(moment()));

console.log(md5('1').length); // e10adc3949ba59abbe56e057f20f883e

console.log(base64.encode('123456')); //MTIzNDU2
console.log(base64.decode('MTIzNDU2')); //123456


console.log(sha1('123566'));
//955076f05bc0aefad4d3bdf04d217647af119542
// hash value
