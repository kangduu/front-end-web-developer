# Selections（d3-selection@3.0.0 ）

Transform the DOM by selecting elements and joining to data.（ **通过选择元素并连接到数据来转换DOM**）

### [API Reference](https://github.com/d3/d3-selection/blob/v3.0.0/README.md#api-reference)

- [Selecting Elements (选择元素)](#Selecting-Elements)
- [Modifying Elemets (修改元素)](#Modifying-Elemets)
- [Joining Data (链接数据)](#Joining-Data)
- [Handling Event (处理事件)](#Handling-Event)
- [Control Flow (控制流)](#Control-Flow)
- [Local Variables (局部变量)](#Local-Variables)
- [Namespaces (命名空间)](#Namespaces)
- [自定义扩展](#自定义扩展)
- [关于selection链式调用](#关于selection链式调用)

## Selecting Elements

1. [d3.selection()](#selection) - 选择根文档元素
2. [d3.select( *selector* )](#d3.select(*selector*)-从文档中选择一个元素) - 从文档中选择一个元素
3. [d3.selectAll( *selector* )](#d3.selectAll(*selector*)-从文档中选择多个元素) - 从文档中选择多个元素
4. [*selection*.select( *select* )](#selection.select(*select*)-为每个选定元素选择一个子代元素) - 为每个选定元素选择一个子代元素
5. [*selection*.selectAll( *select* )](#selection.selectAll(*select*)-为每个选定元素选择多个后代元素) - 为每个选定元素选择多个后代元素
6. [*selection*.filter( *match* )](#selection.filter(*match*)-根据参数数据筛选元素) - 根据参数数据筛选元素
7. [*selection*.merge( *selection* )](#selection.merge(*context*)-将此`selection`与另一个`selection`合并) -  将此`selection`与另一个`selection`合并
8. [*selection*.selectChild( *match*)](#selection.selectChild(*match*)-为每个选定元素选择第一个子元素) - 为每个选定元素选择第一个子元素
9. [*selection*.selectChildren( *match* )](#selection.selectChildren(*match*)-为每个选定元素选择子元素) - 为每个选定元素选择子元素
10. [*selection*.selection()](#selection.selection()-返回选择(selection)) - 返回选择(selection)
11. [d3.matcher( *selector* )](#d3.matcher(*selector*)-测试元素是否与选择器匹配) - 测试元素是否与选择器匹配
12. [d3.selector( *selector* )](#d3.selector(*selector*)-选择一个元素的选择器) -选择一个元素的选择器
13. [d3.selectorAll( *selector* )](#d3.selectorAll(*selector*)-选择所有元素的选择器) - 选择所有元素的选择器
14. [d3.window( *node* )](#d3.window(*node*)-获取节点的所有者窗口) - 获取节点的所有者窗口
15. [d3.style( *node, name* )](#d3.style(*node,name*)-获取节点的当前样式值) - 获取节点的当前样式值

### d3.selection()-选择根文档元素
<a name="selection" href="selection">#</a> d3.<b>selection</b>() - 选择根文档元素

```js
function selection() {
  return new Selection([[document.documentElement]], root);
}
```

### d3.select(*selector*)-从文档中选择一个元素

```js
import { Selection, root } from "./selection/index.js";

export default function (selector) {
  return typeof selector === "string"
    ? new Selection([[document.querySelector(selector)]], [document.documentElement])
    : new Selection([[selector]], root);
} 
```

### d3.selectAll(*selector*)-从文档中选择多个元素

```js
import array from "./array.js";
import { Selection, root } from "./selection/index.js";

export default function (selector) {
  return typeof selector === "string"
    ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
    : new Selection([array(selector)], root);
}
```

### selection.select(*select*)-为每个选定元素选择一个子代元素

```js
import { Selection } from "./index.js";
import selector from "../selector.js";

export default function (select) {

  // 非函数：将select转为函数
  if (typeof select !== "function") select = selector(select);

  for (
    // groups m 
    var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0;
    j < m;
    ++j
  ) {

    for (
      var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0;
      i < n;
      ++i
    ) {

      if (
        (node = group[i]) &&
        // (node.__data__, i, group) 这三个参数就是我们传达callback参数可使用的实参
        // 返回值：subnode
        (subnode = select.call(node, node.__data__, i, group))
      ) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }

  }

  return new Selection(subgroups, this._parents);
}
```

- 这里参数可以是函数
- 返回第一个非空子元素，若无子元素，则返回空数组

### selection.selectAll(*select*)-为每个选定元素选择多个后代元素

```js
import {Selection} from "./index.js";
import array from "../array.js";
import selectorAll from "../selectorAll.js";

function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}

export default function(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
}
```

### selection.filter(*match*)-根据参数数据筛选元素

```js
import {Selection} from "./index.js";
import matcher from "../matcher.js";

export default function(match) {
    //非函数参数
    if (typeof match !== "function") match = matcher(match);

    for (
        var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0;
        j < m;
        ++j
    ) {
        for (
            var group = groups[j], n = group.length,
            	subgroup = subgroups[j] = [], node, i = 0;
            i < n; 
            ++i
        ) {
            // 自定义match函数返回true的
            if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
                subgroup.push(node);
            }
        }
    }

    return new Selection(subgroups, this._parents);
}
```

### selection.merge(*context*)-将此`selection`与另一个`selection`合并

```js
import {Selection} from "./index.js";

// context 另一选项
export default function(context) {
    var selection = context.selection ? context.selection() : context;

    for (
        var groups0 = this._groups, groups1 = selection._groups, 
        	m0 = groups0.length, m1 = groups1.length,
        	m = Math.min(m0, m1), merges = new Array(m0), j = 0; 
        j < m; 
        ++j
    ) {
        for (
            var group0 = groups0[j], group1 = groups1[j], 
           		n = group0.length, merge = merges[j] = new Array(n), node, i = 0;
            i < n;
            ++i
        ) {
            if (node = group0[i] || group1[i]) {
                merge[i] = node;
            }
        }
    }

    for (; j < m0; ++j) {
        merges[j] = groups0[j];
    }

    return new Selection(merges, this._parents);
}
```

### selection.selectChild(*match*)-为每个选定元素选择第一个子元素

```js
import {childMatcher} from "../matcher.js";

var find = Array.prototype.find;

function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

export default function(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : childMatcher(match)));
}
```

### selection.selectChildren(*match*)-为每个选定元素选择子元素

```js
import {childMatcher} from "../matcher.js";

var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

export default function(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
```

### selection.selection()-返回选择(selection)

```js
function selection_selection() {
  return this;
}

Selection.prototype = selection.prototype = {
  selection: selection_selection,
};
```

### d3.matcher(*selector*)-测试元素是否与选择器匹配

```js
export default function(selector) {
  return function() {
    return this.matches(selector);
  };
}
```

- [Element.matches()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches)

### d3.selector(*selector*)-选择一个元素的选择器

```js
function none() {}

export default function(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}
```

### d3.selectorAll(*selector*)-选择所有元素的选择器

```js
function empty() {
  return [];
}

export default function(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}
```

### d3.window(*node*)-获取节点的所有者窗口

```js
export default function(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}
```

### d3.style(*node,name*)-获取节点的当前样式值

```js
export function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}
```



## Modifying Elemets

1. [*selection*.attr( *name, value* )](#selection.attr(*name,value*)-获取或设置属性) - 获取或设置属性 
2. [*selection*.classed( *name, value* )](#selection.classed(*name,value*)-获取、添加或删除CSS类) -  获取、添加或删除CSS类
3. [*selection*.style( *name, value, priority*  )](#selection.style(*name,value,priority*)-获取或设置样式属性) -  获取或设置样式属性 
4. [*selection*.property( *name, value* )](#selection.property(*name,value*)-获取或设置(原始)属性) - 获取或设置(原始)属性 
5. [*selection*.text( *value* )](#selection.text(*value*)-获取或设置文本内容) - 获取或设置文本内容
6. [*selection*.html( *value* )](#selection.html(*value*)-获取或设置innerHTML) - 获取或设置 innerHTML
7. [*selection*.append( *name* )](#selection.append(*name*)-创建、添加和选择新元素) -  创建、添加和选择新元素
8. [*selection*.insert( *name, before* )](#selection.insert(*name,before*)-创建、插入和选择新元素) -  创建、插入和选择新元素
9. [*selection*.remove()](#selection.remove()-从文档中删除元素) - 从文档中删除元素 
10. [*selection*.clone( *deep* )](#selection.clone(*deep*)-插入选定元素的克隆) - 插入选定元素的克隆
11. [*selection*.sort( *compare* )](#selection.sort(*compare*)-根据数据对文档中的元素进行排序) - 根据数据对文档中的元素进行排序 
12. [*selection*.order()](#selection.order()-重新排序文档中的元素以匹配所选内容) - 重新排序文档中的元素以匹配所选内容
13. [*selection*.raise()](#selection.raise()-将每个元素作为其父元素的最后一个子元素重新排序) - 将每个元素作为其父元素的`最后一个子元素`重新排序 
14. [*selection*.lower()](#selection.lower()-将每个元素作为其父元素的第一个子元素重新排序) - 将每个元素作为其父元素的`第一个子元素`重新排序
15. [d3.create( *name* )](#d3.creare*name*)-创建并选择一个分离的元素) - 创建并选择一个分离的元素
16. [d3.creator( *name* )](#d3.creator(*name*)-根据名称创建元素) - 根据名称创建元素

### selection.attr(*name,value*)-获取或设置属性

```js
export default function (name, value) {
  var fullname = namespace(name);

  // 只传递了属性名：获取属性值
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
      ? node.getAttributeNS(fullname.space, fullname.local)
      : node.getAttribute(fullname);
  }

  // 1. value == null： 移除属性
  // 2. value为非函数值：设置为value
  // 3. value是一个函数：a、函数无返回值：移除属性；b、函数有返回值：设置为函数返回值
  return this.each(
    (
      value == null
        ?
        (fullname.local ? attrRemoveNS : attrRemove)
        :
        (
          typeof value === "function"
            ? (fullname.local ? attrFunctionNS : attrFunction)
            : (fullname.local ? attrConstantNS : attrConstant)
        )
    )(fullname, value)
  );
}
```

### selection.classed(*name,value*)-获取、添加或删除CSS类

```js
export default function (name, value) {
    var names = classArray(name + "");

    // 是否包括类
    if (arguments.length < 2) {
        var list = classList(this.node()), i = -1, n = names.length;
        while (++i < n) if (!list.contains(names[i])) return false;
        return true;
    }

    // 为每个元素添加类
    return this.each(
        (
            typeof value === "function"
            ? classedFunction
            : value
            ? classedTrue
            : classedFalse
        )(names, value)
    );
}
```

### selection.style(*name,value,priority*)-获取或设置样式属性 

```js
import defaultView from "../window.js";

function styleRemove(name) {
    return function () {
        this.style.removeProperty(name);
    };
}

function styleConstant(name, value, priority) {
    return function () {
        this.style.setProperty(name, value, priority);
    };
}

function styleFunction(name, value, priority) {
    return function () {
        var v = value.apply(this, arguments);
        if (v == null) this.style.removeProperty(name);
        else this.style.setProperty(name, v, priority);
    };
}

// 用于selection实例
export default function (name, value, priority) {
    return arguments.length > 1
        ? this.each((value == null
                     ? styleRemove : typeof value === "function"
                     ? styleFunction
                     : styleConstant)(name, value, priority == null ? "" : priority))
    : styleValue(this.node(), name);
}


// 获取样式属性值
export function styleValue(node, name) {
    return node.style.getPropertyValue(name)
    || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}
```

注意： *`value`* 不能包含 `"!important"` --那个应该使用 *`priority`* 参数. 

### selection.property(*name,value*)-获取或设置(原始)属性

```js
function propertyRemove(name) {
    return function () {
        delete this[name];
    };
}

function propertyConstant(name, value) {
    return function () {
        this[name] = value;
    };
}

function propertyFunction(name, value) {
    return function () {
        var v = value.apply(this, arguments);
        if (v == null) delete this[name];
        else this[name] = v;
    };
}

export default function (name, value) {
    return arguments.length > 1
        ? this.each(
        (value == null
         ? propertyRemove
         : typeof value === "function"
         ? propertyFunction
         : propertyConstant)(name, value)
    )
    : this.node()[name];
}

```

### selection.text(*value*)-获取或设置文本内容

```js
function textRemove() {
    this.textContent = "";
}

function textConstant(value) {
    return function () {
        this.textContent = value;
    };
}

function textFunction(value) {
    return function () {
        var v = value.apply(this, arguments);
        this.textContent = v == null ? "" : v;
    };
}

export default function (value) {
    return arguments.length
        ? this.each(value == null
                    ? textRemove
                    : (typeof value === "function" ? textFunction : textConstant)(value)
                   )
    : this.node().textContent;
}
```

参数情况和`selection.html()` 类似的

### selection.html(*value*)-获取或设置innerHTML

```js
function htmlRemove() {
    this.innerHTML = "";
}

function htmlConstant(value) {
    return function () {
        this.innerHTML = value;
    };
}

function htmlFunction(value) {
    return function () {
        var v = value.apply(this, arguments);
        this.innerHTML = v == null ? "" : v;
    };
}

export default function (value) {
    return arguments.length
        ? this.each(
        value == null
        ? htmlRemove
        : (typeof value === "function" ? htmlFunction : htmlConstant)(value)
    )
    : this.node().innerHTML;
}
```

参数情况：

1. 无参数：获取innerHTML值
2. null undefined ：innerHTML = ""
3. 函数：innerHTML = 函数返回值
4. 其他值：其他值

### selection.append(*name*)-创建、添加和选择新元素

```js
import creator from "../creator.js";

export default function(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function() {
        return this.appendChild(create.apply(this, arguments));
    });
}
```

### selection.insert(*name,before*)-创建、插入和选择新元素

```js
import creator from "../creator.js";
import selector from "../selector.js";

function constantNull() {
    return null;
}

export default function(name, before) {
    var create = typeof name === "function" ? name : creator(name),
        select = before == null ? constantNull 
    				: typeof before === "function" ? before : selector(before);
    return this.select(function() {
        return this.insertBefore(create.apply(this, arguments), 
                                 select.apply(this, arguments) || null);
    });
}

```

### selection.remove()-从文档中删除元素

```js
function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
}

export default function() {
    return this.each(remove);
}
```

准确来说：应该是从当前元素的父节点出发移除这个子节点。

### selection.clone(*deep*)-插入选定元素的克隆

```js
function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

// deep 深克隆？
export default function(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
```

克隆后都会将克隆元素添加到当前元素后边。

### selection.sort(*compare*)-根据数据对文档中的元素进行排序

```js
import { Selection } from "./index.js";

export default function (compare) {
    if (!compare) compare = ascending;

    function compareNode(a, b) {
        return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (
        var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0;
        j < m;
        ++j
    ) {
        for (
            var group = groups[j], n = group.length,
	            sortgroup = sortgroups[j] = new Array(n), node, i = 0; 
            i < n;
            ++i
        ) {
            if (node = group[i]) {
                sortgroup[i] = node;
            }
        }
        // 递归调用
        sortgroup.sort(compareNode);
    }

    // 调用 selection.order()
    return new Selection(sortgroups, this._parents).order();
}

// 默认升序
function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
```

### selection.order()-重新排序文档中的元素以匹配所选内容

```js
export default function () {

    for (
        var groups = this._groups, j = -1, m = groups.length;
        ++j < m;
    ) {
        for (
            var group = groups[j], i = group.length - 1, next = group[i], node;
            --i >= 0;
        ) {
            if (node = group[i]) {
                if (next && node.compareDocumentPosition(next) ^ 4) {
                    next.parentNode.insertBefore(node, next);
                }
                next = node;
            }
        }
    }

    return this;
}
```

- [Node.compareDocumentPosition( *otherNode* )](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/compareDocumentPosition)
- [Node.insertBefore()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore)

### selection.raise()-将每个元素作为其父元素的最后一个子元素重新排序

```js
function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
}

export default function() {
    return this.each(raise);
}
```

- [*selection*.each( *callback* )](#selection.each(*callback*) -  为每个元素调用一个函数) - 为每个元素调用一个函数

### selection.lower()-将每个元素作为其父元素的第一个子元素重新排序

```js
function lower() {
    if (this.previousSibling) {
        this.parentNode.insertBefore(this, this.parentNode.firstChild);
    }
}

// 将每个元素作为其父元素的第一个子元素重新排序
export default function() {
    return this.each(lower);
}
```

- [*selection*.each( *callback* )](#selection.each(*callback*) -  为每个元素调用一个函数) - 为每个元素调用一个函数

### d3.creare*name*)-创建并选择一个分离的元素

```js
import creator from "./creator.js";
import select from "./select.js";

export default function(name) {
    return select(creator(name).call(document.documentElement));
}
```

注意`creator`的用法：`creator(name).call(document.documentElement)`

### d3.creator(*name*)-根据名称创建元素

```js
import namespace from "./namespace.js";
import {xhtml} from "./namespaces.js";

// 返回一个函数
function creatorInherit(name) {
    return function() {
        var document = this.ownerDocument,
            uri = this.namespaceURI;
        return uri === xhtml && document.documentElement.namespaceURI === xhtml
            ? document.createElement(name)
        : document.createElementNS(uri, name);
    };
}

// 返回一个函数
function creatorFixed(fullname) {
    return function() {
        return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
}

/**
 * 根据名称创建元素,返回创建函数
 * @param {string} name 元素名称
 * @returns Fn 创建函数
 */
export default function(name) {
    var fullname = namespace(name);
    return (fullname.local
            ? creatorFixed
            : creatorInherit)(fullname);
}
```



## Joining Data

1. [*selection*.data([data\[, key\]])](#selection.data([data\[\,key\]])-将元素绑定到数据) - 将元素绑定到数据
2. [*selection*.join(enter[,update][,exit])](#selection.join(enter\[,update\]\[,exit\])-根据数据输入、更新或退出元素) -  根据数据输入、更新或退出元素 
3. [*selection*.enter()](#selection.enter()-获取输入选择(数据多于元素)) - 获取输入选择(数据多于元素)
4. [*selection*.exit()](#selection.exit()-获取退出选择(元素多于数据)) - 获取退出选择(元素多于数据)
5. [*selection*.datum(\[*value*])](#selection.datum(\[*value*])-获取或设置元素数据) - 获取或设置元素数据

### selection.data([data\[\,key\]])-将元素绑定到数据

- 将指定的数组数据与选定的元素绑定；
- 返回一个表示更新的selection（添加了`_enter` 和 `_exit`）；
- 

### selection.join(enter\[,update\]\[,exit\])-根据数据输入、更新或退出元素

- 根据需要添加、删除和重排元素，以此匹配之前的`selection.data()`绑定的数据
- 返回合并的输入和更新`seleciton`;
-  此方法是显式通用更新模式的一种方便的替代方法；包括`selection.enter` 、`selection.exit` 、`selection.append` 、`selection.remove` 和   `selection.order` 。

```js
export default function (onenter, onupdate, onexit) {
  var enter = this.enter(),
    update = this,
    exit = this.exit();

  // enter handle
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    // 直接添加元素
    enter = enter.append(onenter + "");
  }

  // update handle
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }

  // exit handle
  if (onexit == null) exit.remove();
  else onexit(exit);

  return enter && update ? enter.merge(update).order() : update;
}
```

- [selection.join](https://github.com/d3/d3-selection/blob/v3.0.0/README.md#selection_join)

### selection.enter()-获取输入选择(数据多于元素)

```js
import sparse from "./sparse.js";
import {Selection} from "./index.js";

export default function() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
}
```

### selection.exit()-获取退出选择(元素多于数据)

````js
import sparse from "./sparse.js";
import {Selection} from "./index.js";

export default function() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
}
````

### selection.datum(\[*value\*])-获取或设置元素数据

```js
export default function(value) {
  return arguments.length
      ? this.property("__data__", value) //设置
      : this.node().__data__; // 获取
}
```



## Handling Event

1. [*selection*.on(*typenames*[,*listener*\[,*options*\]])](#selection.on(*typenames*[,*listener*[,*options*]])-添加或删除事件监听器) - 添加或删除事件监听器
2. [*selection*.dispatch(*type*[,*parameters*])](#selection.dispatch(*type*[,*parameters*])-派发自定义事件) - 派发自定义事件
3. [d3.pointer(*event*[,*target*])](#d3.pointer(*event*[,*target*])-获取一个事件的指针位置) - 获取一个事件的指针位置
4. [d3.pointers(*events*[,*target*])](#d3.pointers(*events*[,*target*])-获取事件的指针位置) - 获取事件的指针位置

### selection.on(*typenames*[,*listener*[,*options*]])-添加或删除事件监听器

```js
// 解析事件类型
function parseTypenames(typenames) {
}

// 移除事件
function onRemove(typename) {
}

// 添加事件监听
function onAdd(typename, value, options) {
}

/**
 * @param {*} typename 事件类型
 * @param {*} value 事件回调函数
 * @param {*} options EventTarget.addEventListener()的options或useCapture参数
 * @returns 
 */
export default function(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}
```

### selection.dispatch(*type*[,*parameters*])-派发自定义事件

```js
import defaultView from "../window.js";

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
      event = window.CustomEvent; // 

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  // target.dispatchEvent(event)
  node.dispatchEvent(event); 
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

export default function(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

```

- [EventTarget.dispatchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)

### d3.pointer(*event*[,*target*])-获取一个事件的指针位置

```js
import sourceEvent from "./sourceEvent.js";

export default function(event, node) {
  event = sourceEvent(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      // 2.  
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      // 3. 
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  // 1. 
  return [event.pageX, event.pageY];
}
```

- 参数列表：event，node ； 
- 我们需要配置事件使用

### d3.pointers(*events*[,*target*])-获取事件的指针位置

```js
import pointer from "./pointer.js";
import sourceEvent from "./sourceEvent.js";

export default function(events, node) {
  if (events.target) { // i.e., instanceof Event, not TouchList or iterable
    events = sourceEvent(events);
    if (node === undefined) node = events.currentTarget;
    events = events.touches || [events];
  }
  return Array.from(events, event => pointer(event, node));
}
```

- [Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)



## Control Flow

1. [*selection*.each(*function*)](#selection.each(*function*)-为每个元素调用一个函数) - 为每个元素调用一个函数
2. [*selection*.call(*function*[,*arguments…*])](#selection.call(*function*[,*arguments…*])-使用当前选择调用函数) - 使用当前选择调用函数
3. [*selection*.empty()](#selection.empty()-判断选择是否为空，为空返回`true`) - 判断选择是否为空，为空返回`true`
4. [*selection*.nodes()](#selection.nodes()-返回所有选定元素的数组) - 返回所有选定元素的数组
5. [*selection*.node()](#selection.node()-返回第一个(非空)元素) - 返回第一个(非空)元素
6. [*selection*.size()](#selection.size()-返回元素的总数) - 返回元素的总数
7. [*selection*\[Symbol.iterator]()](#selection[Symbol.iterator]\(\)-遍历选择的节点) -  遍历选择的节点

### selection.each(*function*)-为每个元素调用一个函数

```js
export default function (callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}
```

- 函数参数列表：` callback.call(node, node.__data__, i, group)`

### selection.call(*function*[,*arguments…*])-使用当前选择调用函数

```js
export default function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
```

- 参数：回调函数

### selection.empty)- 判断选择是否为空，为空返回`true`

```js
export default function() {
  return !this.node();
}
```

### selection.nodes()-返回所有选定元素的数组

```js
export default function() {
  return Array.from(this);
}
```

### selection.node()-返回第一个(非空)元素

```js
export default function() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node; // 非空元素
    }
  }

  return null;
}
```

### selection.size()-返回元素的总数

```js
export default function() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}
```

### selection[Symbol.iterator]\(\)-遍历选择的节点

```js
export default function*() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

// 定义了默认的迭代器。该迭代器可以被 for...of 循环 使用。
Selection.prototype = selection.prototype = {
  [Symbol.iterator]: selection_iterator
};

// eg
for (const element of selection) {
  console.log(element);
}
const elements = [...selection];
```



## Local Variables

1. [d3.local()](#d3.local()-声明一个新的局部变量) - 声明一个新的局部变量
2. [*local*.set(*node*,*value*)](#local.set(*node*,*value*)-设置局部变量的值) - 设置局部变量的值
3. [*local*.get(*node*)](#local.get(*node*)-获取局部变量的值) - 获取局部变量的值
4. [*local*.remove(*node*)](#local.remove(*node*)-删除局部变量) - 删除局部变量
5. [*local*.toString()](#local.toString()-获取局部变量的属性标识符) -  获取局部变量的属性标识符

### d3.local()-声明一个新的局部变量

```js
var nextId = 0;

export default function local() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}
```

### local.set(*node*,*value*)-设置局部变量的值

```js
Local.prototype = local.prototype = {
  set: function(node, value) {
    return node[this._] = value;
  }
}
```

### local.get(*node*)-获取局部变量的值

```js
Local.prototype = local.prototype = {
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  }
};
```

### local.remove(*node*)-删除局部变量

```js
Local.prototype = local.prototype = {
  remove: function(node) {
    return this._ in node && delete node[this._];
  }
};
```

### local.toString()-获取局部变量的属性标识符

```js
Local.prototype = local.prototype = {
  toString: function() {
    return this._;
  }
};
```



## Namespaces

可以忽略哦！

1. [d3.namespace(*name*)](#d3.namespace(*name*)-限定前缀XML名称) -  限定前缀XML名称
2. [d3.namespaces](#d3.namespaces-内置的XML命名空间) - 内置的XML命名空间 

### d3.namespace(*name*)-限定前缀XML名称

形如：`d3.namespace = xlink:href `

```js
import namespaces from "./namespaces.js";

export default function(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}
```

### d3.namespaces-内置的XML命名空间

```js
export var xhtml = "http://www.w3.org/1999/xhtml";

export default {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
```



## 自定义扩展

```js
// 为什么必须挂载在`d3.selection.prototype`对象上啦？
d3.selection.prototype.checked = function (value) {
    return arguments.length < 1
        ? this.property("checked")
    	: this.property("checked", !!value);
};

d3.selectAll("input[type=checkbox]").checked(null)
```

阅读源码我们发现：

```js
// ? 注意这两都指向同一原型对象，但是只给用户提供了`selection`接口，这样遍提供了用户自定义拓展路径。
Selection.prototype = selection.prototype = {
  select: selection_select,
  selectAll: selection_selectAll,
  // ...
};

export default selection
```



## 关于selection链式调用

我们在使用`d3`的时候，第一步便需要你创建一个selection实例对象，具体的实现方式有很多种，简单举例如下：

```js
// 默认使用文档节点html
d3.selection()
// 某一元素
d3.select()
// 一类元素
d3.selectAll()
// ... 
```

这样做的目的就是实例化一个选择集对象，这个时候这个实例对象就拥有了`Selection`构造函数原型上和我们自定义扩展的所有方法和属性。

在实际开发中，链式调用中`重复调用某一接口`是再常见不过的事了，例如像下面这样：

```js
d3.selectAll('tr').selectAll('td')
```

问：示例中的两个`selectAll`接口实现一样吗？为什么？

答：不一样，`第一个selectAll` 会实例化，`第二个selectAll` 则是调用实例方法，在`d3-selection库`源码中可以发现实例化接口和原型对象上的方法接口完全不一样。

### selection对象上的`select`和`selectAll`

1. 参数可以是function声明的函数，不可以是箭头函数；
2. 函数参数：data、index、group；
3. 函数必须有返回值；
4. 
