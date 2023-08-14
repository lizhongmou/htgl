// 导出url链接，与等待时间
// export const BASE_URL = "http://codercba.com:8000";
// export const TIME_OUT = 10000;

// 开发环境与生产环境使用的域名与服务器将是不一样的，因此每次需要手动配置这个是比较麻烦的。一些公司是使用的是两个不一样的服务器
// 一些是使用一个服务器，一个服务器的话需要每一次手动修改服务器的地址就比较麻烦
// 因此这里会定义两个不一样的地址
// 或者使用if判断来进行确定使用的是那个地址
// vite里面会提供环境变量来确定使用的是开发环境还是生产环境
// console.log(import.meta.env); 这个可以确定是什么环境
// console.log(import.meta.env.SSR);
// console.log(import.meta.env.MODE);
// console.log(import.meta.env.PROD);
// console.log(import.meta.env.BASE_URL);
/* 这些也是里面的一些方法
import.meta.url: 当前模块的 URL 地址，可以用于获取当前模块的绝对路径。

import.meta.glob: 一个函数，用于匹配文件路径模式并返回符合条件的模块路径。

import.meta.env: 一个对象，包含了在构建时注入的环境变量，如开发环境和生产环境的配置。

import.meta.hot: 在开发模式下，提供了模块热重载（Hot Module Replacement）的相关功能。
*/
// console.log(import.meta.env.VITE_BASE, "111");
// 还有一些就是使用dev这个命名来进行操作
let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'http://152.136.185.210:4000'
} else {
  // 开发环境
  BASE_URL = 'http://152.136.185.210:5000'
}
export const TIME_OUT = 10000
export { BASE_URL }
