当我们编写代码时，不可能保证完全不出错的。

错误处理需要我们考虑是否影响用户操作，最基本的约束就是保证程序能正常使用。

最好的方式就是使用try/catch处理。

### 基本语法



#### 异常标识符

> catch(/*异常标识符\*/) {
>
> }

 当`try`块中的抛出一个异常时， 异常标识符（`catch (e)`中的`e`）用来保存被抛出声明指定的值。你可以用这个标识符来获取关于被抛出异常的信息。 



### try...catch...finally中存在return语句

我们知道，`return`语句会终止函数的执行，并返回一个指定的值给函数调用者，默认返回undefined。

当我们再`try/catch/finally`语句中分别使用了`return`会导致什么样的结果啦？

🤔 **Questions：**只在try代码块里return？

```js
function sum(a, b) {
    try {
        return a.num + b
    } catch (error) {
        console.log(error.message);
    }
};

const result = sum();
console.log("result", result) 
// Cannot read property 'num' of undefined
// result undefined
```

上面的代码，在我们实际开发的过程中，经常会编写各种处理函数，如果不在sum函数中使用`try/ctch`语句，将会导致整个程序错误，甚至是整个应用崩溃。

回到代码中，调用sum函数时忘记了传递参数，而undefined不是一个对象，这就导致`a.num + b`表达式执行错误，



### 嵌套try...catch语句

**[嵌套的try/catch语句](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#nested_try-blocks)，需要由内到外进行分析，也就是说，错误捕获链与JavaScript的作用域链一样。内部的错误，会首先查找当前层级的catch语句，没有的话再从外层中查找catch语句。**

🤔 **Questions：**下面的代码，打印信息什么？

```javascript
try {
  try {
    throw new Error('oops');
  } finally {
    console.log('finally');
  }
} catch (ex) {
  console.error('outer', ex.message);
}
// finally
// outer oops
```

分析原因，内部使用的是try/finally，并没有进行catch操作，自然错误将不会被处理。

🤔 **Questions：**如果在内部中使用了catch啦？

```js
try {
    try {
        throw new Error('oops');
    } catch (error) {
        console.log('inner error', error.message);
    } finally {
        console.log("inner finally")
    }
} catch (ex) {
    console.error('outer error', ex.message);
} finally {
    console.log("outer finally");
}
// inner error oops
// inner finally
// outer finally
```

上面的这段代码中，首先是没有`return`语句，也就是说，外层的finally语句，总是会被执行。

在内部`try/catch/finally`中，try代码块中抛出错误，通过catch捕获处理，然后执行finally。

🤔 **Questions：**如果在内部的catch语句之后，又抛出了错误啦？

```js
try {
    try {
        throw new Error('oops');
    } catch (ex) {
        console.error('inner', ex.message);
        throw ex;
    } finally {
        console.log('finally');
    }
} catch (ex) {
    console.error('outer', ex.message);
}
// inner oops
// finally
// outer oops
```

`catch` 只能够捕获在catch之前的try模块中抛出的错误。

### 参考文档

[tay...catch...finally](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)

[异常处理语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86%E8%AF%AD%E5%8F%A5)