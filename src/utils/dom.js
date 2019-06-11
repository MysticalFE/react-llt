//获取dom
function getEle(el) {
  return document.querySelector(el);
}
//获取所有dom
function getAllEle(el) {
  return document.querySelectorAll(el);
}
//getBoundingClientRect
function getEleRect(el) {
  return getEle(el).getBoundingClientRect();
}
//视窗宽高
function getViewportSize() {
  return {
    width:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    height:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
  };
}
//根据overflow scroll auto 返回距离当前节点最近的滚动父容器
function getScrollParent(node) {
  if (!node) return document.documentElement;
  const excludeStaticParent = node.style.position === "absolute"; //判断当前节点是否是相对定位
  let parent = node,
    isFinded = false;
  const overflowRegex = /auto|scroll/;
  while (parent) {
    if (!parent.parentNode)
      return node.ownerDocument || document.documentElement;
    const styles = window.getComputedStyle(parent);
    //如果parent节点是static，子节点是absolute, 继续向上查找父节点，结束本次循环，执行下一次循环
    if (styles.position === "static" && excludeStaticParent) {
      parent = parent.parentNode;
      continue;
    }
    //如果向上查找到的节点overflow为 scroll 或  auto,查找结束
    if (
      overflowRegex.test(styles.overflow) ||
      overflowRegex.test(styles["overflow-x"]) ||
      overflowRegex.test(styles["overflow-y"])
    ) {
      isFinded = true;
      break;
    }
    parent = parent.parentNode;
  }
  //查找结束，返回自node节点查找到的scrollContainer容器
  if (isFinded) return parent;
  //如果未找到，依次返回下面的节点
  return node.ownerDocument || node.documentElement || document.documentElement;
}

export { getEleRect, getEle, getAllEle, getViewportSize, getScrollParent };
