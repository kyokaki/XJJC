
const state = {
  username: undefined,
  password: undefined,
  keystore: undefined,
  lightWallet: undefined
}

const mutations = {
  GET_FIL: (state, { key }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      return JSON.parse(state[key])
    }
    return {}
  },
  SET_FIL: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }

}

const actions = {
  setFil({ commit }, data) {
    commit('SET_FIL', data)
  },
  getFil({ commit }, data) {
    return commit('GET_FIL', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

