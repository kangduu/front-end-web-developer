## 你对 react-fiber 有了解吗？

1. 对于 react 原理的了解。
2. 对于新技术的敏感程度，求知欲。

### 目的

- 为了使 react 渲染的过程可以被**中断**，可以将控制权交还给浏览器，可以让位给**高优先级的任务**，浏览器空闲后再恢复渲染。
- 对于计算量比较大的就是计算或者 dom 计算，就不会闲的特别的卡顿，而是一帧一帧的有规律的执行任务。

🌰 中断

```js
const tasks = []; // 多个任务 同步

function run() {
  let task;
  while ((task = tasks.shift())) {
    execute(task); // 这里执行execute需要5秒左右时间
  }
}
```

这种就会存在一个问题，每一个任务都需要大约 5 秒时间，那就会导致阻塞。
如果在某个任务处停止啦？

### [使用 generator 模拟中断](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

```js
const tasks = []; // 多个任务 同步

function* run() {
  let task;
  while ((task = tasks.shift())) {
    if (hasHighPriorityTask()) {
      yield;
    }
    execute(task); // 这里执行execute需要5秒左右时间
  }
}

const iterator = run();

// 恢复
iterator.next();
```

上边的代码简单的实现了中断任务并可恢复。

**🤔Question：** 既然 generator 有类似的功能，为什么 react 不用 啦？

1. 需要用 generator 将涉及到的所有的代码都包装成 generator \* 形式，非常麻烦，工作量比较大。

2. generator 内部是有状态的

```js
function* doWork(a, b) {
  const x = doExpensiveWorkA(a); // x的值依赖a
  yield;
  const y = doExpensiveWorkA(x, b); // 依赖x的值
  return y;
}
// 假设doExpensiveWorkA作用是将传入的参数相加后并返回结果。
let m = 1,
  n = 2;
const working = doWork(m, n);
working.next(); // x = m = 1

m = 4; //如果这里改变了m，但是x已经done了，所以我们只能沿用旧的x值。
working.next(); // y = x + b = a + b = m + n;
```

### 如何判断当前是否有高优先级任务？

> 首先我们需要明白的是，当前 js 的环境其实并没有办法去判断是否有高优任务。

**🤔Question：** 那你会怎么实现或者模拟一个啦？

- 只能约定一个合理的执行时间，当超过这个执行时间，如果任务任然没有执行完成，那就中断当前任务，将控制权交还给浏览器。（普遍的显示器都是每秒 60 帧，**1000ms / 60fps = 16ms**。大概就是一帧的时间大约是 16 毫秒。）
- [requestIdleCallback(callback\[, options\])](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback) : callback 函数将在**浏览器空闲时期**被调用。并且 callback 函数会接收到一个名为 IdleDeadline 的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。

<!-- TODO 00：20：50 -->

## 遗留问题

**🤔Question：** 说说 react 是如何实现任务的中断与恢复的？
