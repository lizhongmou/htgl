class Cache {
  constructor(type = true) {
    this.storage = type ? localStorage : sessionStorage
  }
  // 保存
  setCache(key, value) {
    if (!value) {
      throw new Error("value is undefound")
    }
    // 判断里面是否有值
    if (value) {
      // 对value的值进行格式化，因为会传递一些对象类型
      // 在这里使用会变成 Object Object
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  // 根据key获取
  getCache(key) {
    const resault = this.storage.getItem(key)
    if (resault) {
      return JSON.parse(resault)
    }
  }
  // 清空
  clearCache() {
    this.storage.clear()
  }
  // 删除某一个
  removeCache(key) {
    this.storage.removeItem(key)
  }
}

const localCache = new Cache()
const sessionCache = new Cache(false)

export { localCache, sessionCache }
