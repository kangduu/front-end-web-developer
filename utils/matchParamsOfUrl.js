/**
 * 匹配url中的参数
 * @param {string} url 
 * @returns {object} {key:value}
 */
export default function (url) {
    try {
        if (typeof url === 'string' && url) {

            if (url.indexOf('?') != -1) {
                const reg = new RegExp('\\?', 'g')
                url = url.replace(reg, '&');
            }

            const params = url.split("&").reduce((a, b) => {
                if (b) {
                    const [key, value] = b.split("=");
                    Object.assign(a, { [key]: value });
                }
                return a
            }, {})

            return params
        }
        return {}
    } catch (error) {
        return {}
    }
}