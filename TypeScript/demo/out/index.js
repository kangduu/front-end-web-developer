// // boolean
// let isDone: boolean = false;
// isDone = null; // "strictNullChecks": false
// console.log(isDone);
// // number
// let count: number = 3;
// let decCount: number = 0xf00d;
// let banaryCount: number = 0b1010; // TODO: 编译后被转换了？
// let octalCount: number = 0o744; // TODO: 编译后被转换了？
// console.log(count, decCount, banaryCount, octalCount);
// // string
// let text: string = 'hello word!'
// console.log(text);
// // array
// let list: number[] = [1, 2]
// let list1: Array<number> = [3, 4]
// list = [1, 2, 3, 4, 5]
// console.log(list, list1);
// //tuple
// let tup: [string, number]
// tup = ['hello', 1]
// // tup[3] = 'word'
// // tup[2].toString()
// console.log(tup);
// // enum
// enum Color { Green = 3, Yellow = '8', White = 2 } // 默认 从 0 开始 ，并且递增
// const c: string = Color[3]
// const y: Color = Color.White
// console.log(c, y);
// console.log("----------any-------------");
// // any 
// // let sml: Symbol = Symbol('1')
// let ev: any = 10;
// // ev = false;
// // ev = 'hello'
// ev.length
// ev.toFixed()
// console.log(ev);
// let data: any[] = [1, '2', false, [], {}, function () { }]
// console.log(data);
// // void
// console.log("----------void-------------");
// function demo(a: number): void {
//     console.log(a);
// }
// demo(1)
// const demo1 = (a: string): void => {
//     console.log(a);
// }
// demo1('2')
// let unusable: void = undefined;
// // null | undefined   "strictNullChecks": false
// // 类型断言 （当我们明确知道一个实体的类型时）
// console.log('---------类型断言---------');
// let anything: number = 100
// anything.length
// // <type>variable
// let toStr: string = 'string:' + anything.toFixed(2)
// // variable as type 
// let toAs: string = (anything as number).toExponential(3)
// console.log('assert: ', toAs, toStr);
// console.log("----------TEST END-------------");
