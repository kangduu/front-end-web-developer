以前我们在`jsx`类组件编写代码如下：

```jsx
//jsx类组件
class SwitchSideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        }
    }
    render() {
        const { collapsed } = this.state
        const { trigger } = this.props
        ....
    }
}
```

如果我们改为`tsx`来编写类组件时，必须为组件声明泛型，否则将会报错：Property 'collapsed' does not exist on type 'Readonly<{}>'

```jsx
// tsx类组件正确使用props和state属性
interface IProps {
    trigger?: boolean
}
interface IState {
    collapsed: boolean
}

class SwitchSideBar extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)
        this.state = {
            collapsed: false,
        }
    }
    render() {
        const { collapsed } = this.state
        const { trigger } = this.props
        ...
    }
}
```

[https://www.jianshu.com/p/ed9509025699/](https://www.jianshu.com/p/ed9509025699/)

