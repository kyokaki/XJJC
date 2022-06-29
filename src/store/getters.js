const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  lightWallet: state => state.fil.lightWallet,
  keystore: state => state.fil.keystore
}
export default getters
