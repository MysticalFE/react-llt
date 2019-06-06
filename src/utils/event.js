//事件绑定
export function on(el, eventName, callback, opts) {
  opts = opts || false;
  if (el.addEventListener) el.addEventListener(eventName, callback, opts);
}

//事件移除
export function off(el, eventName, callback, opts) {
  opts = opts || false;
  if (el.removeEventListener) el.removeEventListener(eventName, callback, opts);
}
