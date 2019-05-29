function getEle(el) {
  return document.querySelector(el);
}
function getAllEle(el) {
  return document.querySelector(el);
}
function getEleRect(el) {
  return getEle(el).getBoundingClientRect();
}
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
export { getEleRect, getEle, getAllEle, getViewportSize };
