// 声明了引入的文件
/// <reference types="vite/client" />

declare module '*.vue' {
  const src: string
  export default src
}
// 单独声明，这样子vue里面就可以识别.mjs文件
declare module '*.mjs'
