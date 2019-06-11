import { SHOP_IMAGE, REAL_SHOP_IMAGE } from "constants/imgUrl";
/**
 *替换图片地址
 * @param {*} url
 * @returns
 */
function handleImgUrl(url) {
  if (typeof url != "string") return;
  return url.replace(SHOP_IMAGE, REAL_SHOP_IMAGE);
}
/**
 * 伪数组转数组
 * @param {*} arr
 * @returns
 */
function toArray(arr) {
  return Array.prototype.slice.call(arr);
}
/**
 *函数节流
 * @param {*} fn
 * @param {*} wait
 * @param {*} [options] 禁止init调用回调fn {leading: false} or  禁止最后一次回调{trailing: false}
 * @returns
 */
function throttle(fn, wait, options) {
  let context = null,
    args = null,
    timeout = null,
    result = null;
  lastCallTime = 0;
  if (!options) options = {};
  const later = () => {
    lastCallTime = Date.now();
    timeout = null;
    result = fn.apply(context, args);
  };
  const throttled = () => {
    const now = Date.now();
    context = this;
    args = arguments;
    if (!lastCallTime && options.leading === false) lastCallTime = now;
    if (wait >= now - lastCallTime) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastCallTime = now;
      result = fn.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, wait);
    }
  };
  throttled.cancel = () => {
    clearTimeout(timeout);
    lastCallTime = 0;
    timeout = context = args = null;
  };
  return throttled;
}

/**
 *函数防抖
 * @param {*} fn
 * @param {*} wait
 * @param {*} immediate  true表示立即执行fn
 */
function debounce(fn, wait, immediate) {
  let context = null,
    args = null,
    timeout = null,
    result = null,
    lastCallTime = 0;

  const later = () => {
    const interval = Date.now() - lastCallTime;
    if (interval < wait) {
      timeout = setTimeout(later, wait - interval);
    } else {
      clearTimeout(timeout);
      timeout = null;
      result = fn.apply(context, args);
    }
  };

  const debounced = () => {
    context = this;
    args = arguments;
    lastCallTime = Date.now();
    if (!timeout) {
      immediate
        ? (result = fn.apply(context, args))
        : (timeout = setTimeout(later, wait));
    }
    return result;
  };
}
export { handleImgUrl, toArray, throttle };
