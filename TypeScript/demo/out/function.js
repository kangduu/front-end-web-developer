/**
 * 函数篇
 */
var ChapterFunction;
(function (ChapterFunction) {
    /函数定义/;
    // 1. 声明式
    function fn(name) {
        return name;
    }
    // 2. 表达式
    var fn1 = function () { };
    // 3. 箭头函数
    var fn2 = function () { };
    /函数类型/;
    // 函数类型包含两部分：参数类型 和 返回值类型
    // TypeScript能够根据返回语句自动推断出返回值类型【类型推断？】
    function fn3(value) { }
    // 完整的函数类型
    var f4 = function (x, y) {
        return x + y;
    };
    // 只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。
    var f5 = function (m, n) {
        return m + n;
    };
    // ! 重点：函数类型（参数类型和返回值类型）必须是初始化或赋值时对应类型的子类型。
    //   const f6: (age: number) => number = function (value: number): void {}; //会报警告
    // ! 重点：只要你在任意一边声明了类型，都是正确的，因为TS编译器会自动识别出类型
    // ! 这叫做【“按上下文归类”】，是类型推论的一种。 它帮助我们更好地为程序指定类型。
    var f7 = function (props) {
        return props;
    };
    /必须参数、可选参数和默认参数/;
    // ? 传递给一个函数的参数（实参）个数，必须与函数期望的参数（形参）个数保持一致 ?
    f5(1, 2);
    // 1. 必选参数 > 可选参数
    // const f8 = (a?: number, b: number): void => { } // 必选参数不能位于可选参数后。
    // 2. 默认初始化的参数 默认参数
    var f9 = function (x, y) {
        if (y === void 0) { y = 10; }
    };
    // ! 重点：默认参数的类型，由默认初始化表达式的类型决定。
    var f10 = function (phone) {
        if (phone === void 0) { phone = 10 + "009"; }
        return typeof phone;
    }; // phone 为 string 类型
    // console.log(f10(10)); // 错误：类型“number”的参数不能赋给类型“string”的参数。
    // ! 重点：默认参数不受限于参数位置，唯一的情况是 如果带默认值的参数出现在必须参数前面，【必须明确的传入 undefined值来获得默认值】
    var f11 = function (first, last) {
        if (first === void 0) { first = "one"; }
        return first;
    };
    console.log(f11("10", "12")); // string类型的10
    console.log(f11(undefined, "11")); // one
    /剩余参数/;
    // arguments ：JavaScript中我们可以使用arguments获取剩余的参数（多余的实参）
    // !  ( ...paramName:type[] ) 来表示剩余参数
    var f12;
    f12 = function (name, last) {
        var list = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            list[_i - 2] = arguments[_i];
        }
        return name + " " + list.join(" ");
    };
    console.log(f12("a", 1, "b", "c")); // a b c
    // ! 重点：剩余参数必须是参数列表中的最后一个参数
    /this和箭头函数/;
    var temp = {
        key: "temp",
        tags: {
            temp: 10,
            value: 12,
        },
        showName: function () {
            return function () {
                var k = this.key;
                return this.tags[k];
            };
        },
    };
    // const showName = temp.showName()
    // console.log(showName());// 报错
    // 方法一：改为箭头函数
    var temp1 = {
        key: "temp",
        tags: {
            temp: 10,
            value: 12,
        },
        showName: function () {
            var _this = this;
            return function () {
                var k = _this.key;
                return { name: _this.tags[k] };
            };
        },
    };
    var temp2 = {
        key: "temp",
        tags: {
            temp: "111",
            value: 100,
        },
        showName: function () {
            return function () {
                var k = this.key;
                return { name: this.tags[k] };
            };
        },
    };
    /重载/;
    function func(params) {
        if (typeof params === "number") {
            return params;
        }
        else if (typeof params === "object") {
            return params.x + params.y;
        }
    }
    console.log(func(111));
    console.log(func({ x: 10, y: 20 }));
})(ChapterFunction || (ChapterFunction = {}));
