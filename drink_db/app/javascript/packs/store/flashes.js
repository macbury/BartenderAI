import { observable, action } from 'mobx'

class Flashes {
  @observable messages = []
}

const flashes = new Flashes()
flashes.messages = [] //window.flashes

export default flashes
