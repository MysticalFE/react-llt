import { SHOP_IMAGE, REAL_SHOP_IMAGE } from "constants/imgUrl";

function handleImgUrl(url) {
  if (typeof url != "string") return;
  return url.replace(SHOP_IMAGE, REAL_SHOP_IMAGE);
}

function toArray(arr) {
  return Array.prototype.slice.call(arr);
}
export { handleImgUrl, toArray };
