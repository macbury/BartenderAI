import { observable, computed, flow, runInAction, action } from 'mobx'
import { getBartender, saveBartender, onBartenderUpdate } from '../api/bartender'

class Bartender {
  @observable currentBartender = null
  @observable loading = true
  @observable errors = []

  constructor() {
    this.setup()
  }

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

  @action async setup() {
    this.refresh()

    onBartenderUpdate().subscribe({
      next: ({ data: { onBartenderUpdate: bartender } }) => {
        runInAction('Update bartender through websocket', () => {
          this.currentBartender.status = bartender.status
        })
      }
    })
  }
}

const bartender = new Bartender()

export default bartender
