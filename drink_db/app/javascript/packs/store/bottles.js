import { observable, action, flow } from 'mobx'
import { getAllBottles, updateBottle, refillBottle } from '../api/bottles'

class Bottles {
  @observable list = []
  @observable currentBottle = null
  @observable loading = true
  @observable errors = []

  refresh = flow(function * () {
    this.loading = true
    this.errors = []
    const bottles = yield getAllBottles()
    if (!!bottles) {
      this.list = bottles
    }
    this.loading = false
  }.bind(this))

  prepareForEdit = flow(function * (bottleId) {
    this.currentBottle = null
    if (this.list.length == 0) {
      yield this.refresh()
    }

    const bottle = this.list.find(({ id }) => id == bottleId)
    if (bottle !== null) {
      this.currentBottle = {...bottle}
    }
  }.bind(this))

  @action update(key, value) {
    this.currentBottle[key] = value
  }

  save = flow(function * () {
    this.loading = true

    this.errors = yield updateBottle(this.currentBottle)
    const success = this.errors && this.errors.length === 0
    if (success) {
      this.list = []
    }

    this.loading = false
    return success
  }.bind(this))

  refill = flow(function * () {
    this.loading = true

    this.errors = yield refillBottle(this.currentBottle.id)
    const success = this.errors && this.errors.length === 0
    if (success) {
      this.list = []
    }

    this.loading = false
    return success
  }.bind(this))
}

const bottles = new Bottles()

export default bottles
