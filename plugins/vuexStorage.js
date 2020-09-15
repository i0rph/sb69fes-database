import createPersistedState from 'vuex-persistedstate'
 
export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
      paths: ['bromideFilter', 'musicFilter', 'eventFilter', 'gachaFilter', 'comicFilter', 'grid', 'showJP']
    })(store)
  })
}