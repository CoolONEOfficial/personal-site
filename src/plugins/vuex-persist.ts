import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  ;(window as any).onNuxtReady(() => {
    new VuexPersistence({
      reducer: (state: any) => ({ theme: state.theme })
    }).plugin(store)
  })
}
