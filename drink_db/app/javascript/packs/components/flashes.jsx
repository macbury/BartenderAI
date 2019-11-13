import React from 'react'
import { observer, inject } from 'mobx-react'
import { ToastContainer, toast } from 'react-toastify'

@inject(({ flashes: { messages } }) => {
  return { messages }
})
@observer
export default class Flashes extends React.Component {

  componentDidMount() {
    const { messages } = this.props
    messages.map((message) => toast(message, {
      position: 'bottom-center',
      closeOnClick: true,
      hideProgressBar: true,
      className: 'black-background',
      bodyClassName: "grow-font-size"
    }))
  }

  render() {
    return <ToastContainer autoClose={5000} />
  }
}
