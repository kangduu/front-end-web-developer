/**
 *  @name 内容复制
 *  @description 传递需要复制的内容参数，实现复制到剪切板功能
 *  @link https://www.npmjs.com/package/react-copy-to-clipboard
 * */

// 依赖lodash库
import { isElement } from "lodash";

// 创建input元素并赋值
const createElement = (value) => {
  const input = document.createElement("input");
  input.id = "copy-input__visibility";
  input.disabled = true;
  input.style.position = "fixed";
  input.style.right = "99999px";
  input.style.bottom = "99999px";
  input.value = value;
  document.body.appendChild(input);
  return {
    el: input,
    remove: () => {
      document.body.removeChild(input);
    },
  };
};

/**
 * @param {any} value 如果是DOM元素，则复制元素中的值，否则调用createElement
 */
export default (value) => {
  return new Promise((resolve, reject) => {
    try {
      let remove = null;
      // 需要复制文字的input节点
      const copyDOM = isElement(value)
        ? value
        : (() => {
            const res = createElement(value);
            remove = res.remove;
            return res.el;
          })();

      //创建一个range
      const range = document.createRange();
      //清楚页面中已有的selection
      window.getSelection().removeAllRanges();
      // 选中需要复制的节点
      range.selectNode(copyDOM);
      // 执行选中元素
      window.getSelection().addRange(range);
      // 执行 copy 操作
      const successful = document.execCommand("copy");
      // 移除选中的元素
      window.getSelection().removeAllRanges();
      // 结果
      if (successful) {
        resolve({
          state: true,
          msg: "已经成功复制到剪切板",
        });
      } else {
        reject({
          state: false,
          msg: "复制失败，请手动复制",
        });
      }

      // 移除生成的input节点
      if (remove instanceof Function) remove();
    } catch (error) {
      console.log(error.message);
    }
  });
};
