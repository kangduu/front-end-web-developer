import React, { Component } from 'react'
import  "src/styles/comp-field/RouteTags.less"

class RouteTags extends Component {
    static defaultProps = {}
    constructor(props) {
        super(props)
        this.state = {}
    }
    // getDerivedStateFromProps 会在调用 render 方法之前调用，并且在 初始挂载及后续更新时 都会被调用。
    // 应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
    static getDerivedStateFromProps(props, state) {
        return null
    }
    render() {
        return (
            <section className="app-route__tags">路由标签</section>
        )
    }
    // componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。
    // 1.依赖于 DOM 节点的初始化操作
    // 2.通过网络请求获取数据
    // 3.直接调用 setState()，这将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。
    componentDidMount() { }
    // 当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。
    // 返回值默认为 true，既 props 或 state 每次发生变化组件都会重新渲染。
    // 首次渲染或使用 forceUpdate() 时不会调用该方法。
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }
    // getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。
    // 使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。
    // 此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。应返回 snapshot 的值（或 null）。
    getSnapshotBeforeUpdate(prevProps, prevState) {
        return null
    }
    // componentDidUpdate() 会在更新后会被立即调用。首次渲染不会执行此方法。
    // 当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。
    // 可以在 componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语句里，否则会导致死循环。
    // 这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值。
    componentDidUpdate(prevProps, prevState, snapshot) { }
    // componentWillUnmount() 会在组件卸载及销毁之前直接调用。
    // 在此方法中执行必要的清理操作，例如：清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。
    componentWillUnmount() { }
}
export default RouteTags