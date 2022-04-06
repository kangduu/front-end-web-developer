"use strict";
/**
 * Generics 泛型
 * 1. 可适用于多个类型，不同于any，不会丢失信息。
 * 2. 类型变量
 * 3.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// 1. 定义一个泛型函数
function getValue(value) {
    return value;
}
// 2. 调用泛型函数
var value = getValue("jake"); // 传入所有的参数，包含类型参数
console.log(value);
var count = getValue(123); //类型推论
console.log(count);
// 注意我们没必要使用尖括号（<>）来明确地传入类型；编译器可以查看myString的值，然后把T设置为它的类型。 类型推论帮助我们保持代码精简和高可读性。
// 如果编译器不能够自动地推断出类型的话，只能像上面那样明确的传入T的类型，在一些复杂的情况下，这是可能出现的。
// 3. 使用泛型变量
// function getLength<T>(arr: T): T {
//   console.log(arr.length); //类型“T”上不存在属性“length”。
//   return arr;
// }
function getLength(arr) {
    // function getLength<T>(arr: T[]): T[] {
    console.log(arr.length);
    return arr;
}
getLength([1, 1, 2, 1, 2]);
