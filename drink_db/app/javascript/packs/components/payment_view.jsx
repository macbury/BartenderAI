import React from 'react'
import { observer } from 'mobx-react'
import QRCode from 'qrcode.react'
import { Spinner } from 'reactstrap'
import TutorialQuotes from './tutorial_quotes'


function PaymentView({ order, mode }) {
  if (!order) {
    return <TutorialQuotes />
  }

  const { status } = order

  if (status === 'waiting_for_invoice') {
    return <Spinner />
  } else if (status === 'waiting_for_payment') {
    const { price: { value }, paymentAddress } = order
    const paymentUri = `bitcoin:${paymentAddress}?amount=${value}`
    if (mode === 'native') {
      window.location.replace(paymentUri)
      return null
    } else {
      return (
        <div className="qr-container">
          <QRCode value={paymentUri}
                  size={512}
                  fgColor="#000"
                  bgColor="#fff"
                  renderAs="svg" />
        </div>
      )
    }
  }

  return <TutorialQuotes />
}

export default observer(PaymentView)
