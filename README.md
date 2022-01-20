# Front-End Web Developer

- [ ] [Axios](http://www.axios-js.com/zh-cn/docs/)
- [ ] [React](#React)

- [ ] [工具库（个人）](#工具库（个人）)

### 工具库（个人）

- [matchParamsOfUrl](./matchParamsOfUrl.js) —— 获取url参数，并转换为对象

### React

🤔 **Questions：** [class组件中为什么要写`super(props)` ?  与不使用`constructor`有什么区别？](https://overreacted.io/zh-hans/why-do-we-write-super-props/)

编写class组件的时候，我们定义state的方式可以有如下两种方式：

```js
class App extends React.Component {
    constructor(props){
        super(props);
        this.state={};
        //...
    }
}

// 通过 class fields proposal 来省略 
class App extends React.Component {
    state = {};
    //...
}
```

**为什么我们要调用 `super`，我们可以不这么做吗？**

**我们调用它时不传入 `props`，又会发生什么呢？会有其他的缺省参数吗？**



### 错误处理与调试

- 错误捕获与处理——[try/catch语句](./error-handler-debug/trycatch.md)
- 错误类型——Error对象
- 如何在浏览器中调试——console
- 

