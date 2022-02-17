# interface

```ts
interface Name {
    //statement
}
```

# 可选属性

```ts
interface User {
    age?: number;
}
```

# 只读属性

```ts
interface User {
    readonly name: string;
}
```

# 可索引的类型

> 描述那些能够“通过索引得到”的类型

JavaScript中我们获取对象属性常用`.`语法糖，实际是通过索引获取：`obj['property']`。在Typescript中同样实现了`可索引的类型 `。

可索引类型具有一个`索引签名`，它描述了`对象索引的类型`，还有`相应的索引返回值类型`。

```ts 
    interface Persion {
        [propName:string]:string;
        [index:number]:any;
    }

    // eg
    interface StringArray {
    [index: number]: string;
    }

    let myArray: StringArray;
    myArray = ["Bob", "Fred"];

    let myStr: string = myArray[0];
```

> 注意：TypeScript支持两种索引签名：`字符串`和`数字`。 可以同时使用两种类型的索引，但是`数字索引的返回值必须是字符串索引返回值类型的子类型`。

> 解析：因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。 
> 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。

### 字符串索引签名

- 前提：我明确知道这个对象可能具有某些作为特殊用途使用的额外属性
- 语法
    ```ts
    interface Book {
        name: string;
        price: number;
        desc?: any;
        [propName: string]: any //字符串索引
    }

    const book:Book = {
        name: "javascript",
        price: 99,
        effect: ()=>{},//特殊用途的属性
    }
    ```

# 函数类型

一个只有参数列表和返回值类型的函数定义

```ts
interface Func {
    (props?: object, state?: object): boolean
}

let fn: Func = function (p, s) {
    console.log(p, s);
    return false
}

fn()
```
- 只能用于函数表示式(函数声明？)
- 函数的参数名不需要与接口里定义的名字相匹配
- 函数的参数会逐个进行检查，要求**对应位置**上的参数类型是兼容的    


# class类型


- 接口只描述类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。