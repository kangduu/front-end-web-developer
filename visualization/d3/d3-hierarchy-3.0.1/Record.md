# d3-hierarchy@3.0.1

​		很多数据从本质上来讲都是具有分层结构特性的。比如：地理位置关系、公司人员组成关系、文件目录结构关系和网络传销人员关系等，

`d3-hierarchy`模块便实现了用于可视化分层技术的几种常见的解决方案。

1. 节点链接图（Node-link diagrams）显示使用节点和链接的离散标记的拓扑，例如每个节点的圆圈和连接每个父子节点的线。
2. 邻接图（Adjacency diagrams）通过节点的相对位置显示拓扑。
3. 外壳图（Enclosure diagrams）也使用区域编码，但通过包含显示拓扑。 [treemap](#treemap) 递归地将区域细分为矩形。 [Circle-packing](#pack) 紧密嵌套圆圈； 这不像树状图那样节省空间，但可能更容易显示拓扑。

### [API Reference](https://github.com/d3/d3-hierarchy#api-reference)

- [Hierarchy](#hierarchy) ([Stratify](#stratify))

## Hierarchy

- [d3.<b>hierarchy</b>(data[,children])](#d3hierarchy) - 从分层数据构造根节点
- [node.<b>ancestors</b>()](#ancestors) - 生成`祖先节点`数组
- [node.<b>descendants</b>()](#descendants) - 生成`后代节点`数组
- [node.<b>leaves</b>()](#leaves) - 生成一个`叶子节点`数组
- [node.<b>find</b>(callback[,that])](#find) - 查找满足条件的第一个节点

### <a id="d3hierarchy" name="d3hierarchy" href="#d3hierarchy">d3.hierarchy(data[,children]) - 从分层数据构造根节点</a> 

从指定的分层 *data* 构造一个根节点。 指定的 *data* 必须是代表根节点的对象。

> 语法

```js
d3.hierarchy(data [, children])
// data: object | Map
// chilren: fn
```

> 示例

```js
var dataset = {
    name: 'a',
    children: [
        {
            name: "a1"
        },
        {
            name: 'a2'
        }
    ]
}; 

// 参数（dataset）也可以是一个 Map
d3.hierarchy(dedaset);

// 返回值？
// { data, depth, height, children, value, parent}
```

返回的节点和每个子代具有以下属性:

1. *node.data* ：指定给构造函数的关联数据。
2. *node.depth* ：根节点为0，后代每代增加1，*节点到根节点的距离*。
3. *node.height* ：叶节点为0，内部*节点为到任何子叶节点的最大距离*。
4. *node.children* ：子节点数组(如果有)；未定义叶节点。
5. *node.value* ：节点及其后代的累加值； *可选值*；参考[*node.sum()*]()和[*node.count()*]()
6. *node.parent* ：父节点，根节点为空。

> 源码

```js
export default function hierarchy(data, children) {
  // data 可以是 Map结构 数据
  if (data instanceof Map) {
    data = [undefined, data];
    if (children === undefined) children = mapChildren;
  } else if (children === undefined) {
    children = objectChildren;
  }

  var root = new Node(data),
    node,
    nodes = [root],
    child,
    childs,
    i,
    n;

  // 使用队列代替了递归
  while (node = nodes.pop()) {
    if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {
      node.children = childs;
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = childs[i] = new Node(childs[i]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }

  return root.eachBefore(computeHeight);
}
```

### <a id="ancestors" name="ancestors" href="#ancestors">node.ancestors() - 生成祖先节点数组</a> 

返回祖先节点数组，从这个节点开始，然后是每个父节点，直到根节点。

```js
export default function() {
    var node = this, nodes = [node];
  while (node = node.parent) {
      nodes.push(node);
  }
  return nodes;
}
```

### <a id="descendants" name="descendants" href="#descendants">node.descendants() - 生成后代节点数组</a> 

返回后代节点的数组，从这个节点开始，然后按拓扑顺序跟随每个子节点。

```js
export default function() {
    return Array.from(this);
}
```

### <a id="leaves" name="leaves" href="#leaves">node.leaves() - 生成一个叶子节点数组</a> 

按遍历顺序返回叶节点数组;叶子节点是`没有子节点的节点`。

```js
export default function() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
}
```

### <a id="find" name="find" href="#find">node.find(callback[,that]) - 查找满足条件的第一个节点</a> 

返回指定筛选器（callback）返回值为真的第一个节点，通过第二个参数`that`来指定`this`上下文。

```js
export default function(callback, that) {
  let index = -1;
  for (const node of this) {
    // 调用筛选器回调函数，接收（node,++index,this）三个参数，
    // 当筛选器函数返回值为真时，便返回这个节点
    if (callback.call(that, node, ++index, this)) {
      return node;
    }
  }
}
```
