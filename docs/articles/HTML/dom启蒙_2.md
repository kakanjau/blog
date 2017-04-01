### 文本节点

#### textContent与innerText的区别
1. innerText知道CSS。如果你有隐藏的文本，innerText会无视它，而textContent不会
2. innerText关心CSS，所以它会触发一次重排，而textContent不会
3. innerText会使返回的文本规范化。textContent会完全按照文档所含返回，仅移除标记。
4. innerText被认为是非标准的，而且是特定浏览器的

### DocumentFragment节点
> 创建与使用DocumentFragment节点，可在实时DOM树之外提供一个轻量的文档DOM树。把DocumentFragment看作一个空的文档模板，行为与实时DOM树相仿，但仅在内存中存在，并且它的子节点可以很简单的在内存中操作，而后附加到实时DOM。

- 创建DocumentFragment：
  ```
    var docFrag = document.createDocumentFragment();
  ```
- 添加DocumentFragment到实时DOM
  ```
    document.body.appendChild(docFrag);
  ```
- 通过复制将片段所含节点保留在内存中
  ```
    document.body.appendChild(docFrag.cloneNode(true));
  ```