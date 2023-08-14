import { defineStore } from 'pinia'

const useCounterStore = defineStore('counte', {
  state: () => ({
    counter: 100
  }),
  getters: {
    doubleco(state) {
      return state.counter * 2
    }
  },
  actions: {
    changecounter(newcounter: number) {
      this.counter = newcounter
    }
  }
})

export default useCounterStore
