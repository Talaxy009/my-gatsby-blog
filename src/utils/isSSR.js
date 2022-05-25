/**
 * 检查当前环境是否是 SSR
 * @returns {boolean} 是否是 SSR
 */
export default function isSSR() {
    return typeof window === 'undefined'
}