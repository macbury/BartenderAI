import { observable, computed, flow } from 'mobx'
import { getBartender, saveBartender } from '../api/bartender'

class Bartender {
  @observable currentBartender = null
  @observable loading = true
  @observable errors = []

  refresh = flow(function * () {
    this.loading = true
    this.errors = []
    this.currentBartender = yield getBartender()
    this.loading = false
  }.bind(this))

  update = flow(function * (key, value) {
    this.currentBartender[key] = value
    const errors = yield saveBartender(this.currentBartender)
    return errors
  }.bind(this))

  @computed
  get isOnline() {
    return this.currentBartender && this.currentBartender.status !== 'offline'
  }
}

const bartender = new Bartender()

export default bartender
