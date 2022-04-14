/**
 * 首字母大写
 */
function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default capitalize;
