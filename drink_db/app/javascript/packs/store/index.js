import getCurrentUser from '../api/get_current_user'
import { observable, flow, action } from 'mobx'

class AppStore {
  @observable recipes = []
  @observable loading = true
  @observable onLine = true
  @observable loggedIn = false
  @observable accessToken = null

  setup = flow(function * () {
    this.onLine = navigator.onLine
    if (!this.onLine) {
      return
    }
    this.loading = true
    const currentUser = yield getCurrentUser()

    this.loggedIn = !!currentUser
    this.accessToken = currentUser && currentUser.accessToken
    this.loading = false
  }.bind(this))

  @action logout() {
    this.loggedIn = false
    this.accessToken = null
  }

  @action handleNetworkChange() {
    if (!this.onLine && navigator.onLine) {
      this.logout()
      this.setup()
    }
    this.onLine = navigator.onLine
  }
}

const store = new AppStore()

window.addEventListener('load', () => {
  window.addEventListener('online', store.handleNetworkChange.bind(store))
  window.addEventListener('offline', store.handleNetworkChange.bind(store))
})

export default store
