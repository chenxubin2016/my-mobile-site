/**
 * @file: tools.js
 * @method str2hex
 * @param {type} str - 要转换的字符串
 * @return {type} val - 16进制字符串
 * @description: 字符串转16进制
 * @author: chenxubin
 * @date: 2021/5/21
 */
export const str2hex = str => {
  let val = "";
  str.forEach((em, i) => {
    val += em.charCodeAt(i)
      .toString(16);
  });
  return val;
};

/**
 * @file: tools.js
 * @method hex2str
 * @param {type} hex - 16进制数组或16进制数字
 * @return {type} val - 字符串
 * @description:
 * @author: chenxubin
 * @date: 2021/5/21
 */
export const hex2str = hex => {
  if (Array.isArray(hex)) {
    let val = "";
    hex.forEach(em => {
      val += String.fromCharCode(em);
    });
    return val;
  } else {
    return String.fromCharCode(hex);
  }
};
