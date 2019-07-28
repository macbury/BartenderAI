import React from 'react'
import { observer } from 'mobx-react'
import QRCode from 'qrcode.react'
import { Spinner } from 'reactstrap'
import TutorialQuotes from './tutorial_quotes'

function PaymentView({ order }) {
  if (!order) {
    return <TutorialQuotes />
  }

  const { status, paymentRequest } = order

  if (status === 'waiting_for_invoice') {
    return <Spinner />
  } else if (status === 'waiting_for_payment') {
    return (
      <div className="qr-container">
        <QRCode value={paymentRequest}
                size={512}
                fgColor="#000"
                bgColor="#fff"
                renderAs="svg" />
      </div>
    )
  }

  return <TutorialQuotes />
}

export default observer(PaymentView)
