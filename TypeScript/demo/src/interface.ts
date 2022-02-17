/**
 * @name interface 接口 
 */

interface User {
    readonly name: string;
    value: number;
    age?: number;
    [propName: string]: any;
}

const user: User = {
    name: "duk",
    value: 1000,
    ages: 100
}

user.age = 6
user.running = (): void => {
    console.log('running...');
}

function showUser(target: User): void {
    console.log(target);
    target.running()
}

showUser(user)



interface List {
    [index: number]: any;
    length: number;
    max?: number;
}

const count: List = [1, 2, 3, 4]

console.log(count.length);

// let a: number[] = [1, 2, 3, 4];
// let ro: ReadonlyArray<number> = a;

// (ro as number[])[0] = 12; // error!
// (ro as number[]).push(5); // error!
// ro.length = 100; // error!
// a = ro as number[]; // error!


interface Book {
    name: string;
    price?: number;
    [propName: string]: any;
    [index: number]: string
}

const book: Book = {
    name: "java",
    desc: "this is book"
}

function viewBook(book: Book): void {
    console.log('book:', book);

}
viewBook(book)

viewBook({ name: "css", opacity: 0.2 } as Book)



interface Func {
    (props?: object, state?: object): boolean
}

let fn: Func = function (p, s) {
    console.log(p, s);
    return false
}

fn()

const f = <Func>function () {
    console.log(333);
    
    // return false
}
f()


interface ClockInterface {
    currentTime: Date
}

class Clock implements ClockInterface {
    currentTime: Date
    constructor() {

    }
}