/**
 * @name interface 接口
 */
var user = {
    name: "duk",
    value: 1000,
    ages: 100
};
user.age = 6;
user.running = function () {
    console.log('running...');
};
function showUser(target) {
    console.log(target);
    target.running();
}
showUser(user);
var count = [1, 2, 3, 4];
console.log(count.length);
var book = {
    name: "java",
    desc: "this is book"
};
function viewBook(book) {
    console.log('book:', book);
}
viewBook(book);
viewBook({ name: "css", opacity: 0.2 });
var fn = function (p, s) {
    console.log(p, s);
    return false;
};
fn();
var f = function () {
    console.log(333);
    // return false
};
f();
var Clock = /** @class */ (function () {
    function Clock() {
    }
    return Clock;
}());
