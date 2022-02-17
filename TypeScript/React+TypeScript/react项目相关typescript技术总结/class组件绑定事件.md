### 点击事件

- parent.tsx

  ```tsx
  class App extends Component {
    onClick(e: React.MouseEvent) { // 事件对象指定类型
      console.log(e)
      console.log(e.target) // 元素节点
      console.log(e.target.style) // 报错：error 因为e.target有可能为undefined，
    }
    render() {
      return (
        <div className="App">
          <Button onClick={this.onClick}>哈哈哈小改改</Button>
        </div>
      )
    }
  }
  ```

- button.tsx

  ```tsx
  interface Iprops {
      onClick: React.MouseEventHandler  // 必须指定点击事件的类型
  }
  class Button extends React.Component<Iprops> { //添加泛型
    render(
      <div className="button" onClick={this.props.onClick}></div>
     )
  }
  ```

- 获取元素节点

  上面的`e: React.MouseEvent`，我们直接打印出e.target是当前的div标签。那么获取和设置div 元素的属性啦？

- 获取/设置节点属性

  我们尝试打印出`e.target.style`，但是我们发现会报错，因为它认为`e.target`有可能是`undefined`。

  解决办法：

  1. 指定`e.target`类型为`HTMLDIVElement`

     ```tsx
     (e.target as HTMLDivElement).style
     ```

  2. 直接为e指定`React.MouseEvent<HTMLDivElement>`

     ```tsx
     onClick(e: React.MouseEvent<HTMLDivElement>) {
         const div = e.currentTarget // 这里只能使用currentTarget属性
         console.log(div.style.width)
     }
     ```

### 键盘事件



### 自定义事件?



[React事件类型]()

[https://www.jianshu.com/p/ed9509025699/](https://www.jianshu.com/p/ed9509025699/)

