## 什么是高阶组件？平时用过高阶组件吗？

[🙋 高阶组件](https://react.docschina.org/docs/higher-order-components.html) 是 **参数为组件**，**返回值为新组件** 的 **函数**

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

🤔 **Questions：** 高阶组件与组件之间的差别是什么？

🙋 **Answer：** 组件是将 props 和 state 转化为 UI，而高阶组件是将组件转换为另一个组件。

> Redux 中的`connect()`
>
> Relay 中的`createFragmentContainer`

《最好是一个纯函数，尽量不要有副作用》

## 如何优雅的写一个高阶组件？

1. 普通模式
2. 装饰器
3. 多高阶组件组合

## 高阶组件能用来做什么？
