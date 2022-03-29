/类型断言/;

let value: any = "123";

// 使用 as
console.log((value as string).length);

// 使用 <type>
console.log(<string>value.length);
