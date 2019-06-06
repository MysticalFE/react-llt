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
  let parent = node,
    isFinded = false;
  const overflowRegex = /auto|scroll/;
  while (parent) {
    if (!parent.parentNode)
      return node.ownerDocument || document.documentElement;
    const styles = window.getComputedStyle(parent);
    if (
      overflowRegex.test(styles.overflow) ||
      overflowRegex.test(styles["overflow-x"]) ||
      overflowRegex.test(styles["overflow-y"])
    ) {
      isFinded = true;
      break;
    }
  }
  parent = parent.parentNode;
}

export { getEleRect, getEle, getAllEle, getViewportSize, getScrollParent };
