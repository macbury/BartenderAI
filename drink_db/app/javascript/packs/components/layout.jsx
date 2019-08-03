import React from 'react'
import GithubCorner from 'react-github-corner'

import Header from './header'
import OrderNavBar from './order_navbar'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />

      <div className="container">
        {children}
      </div>

      <OrderNavBar />
      <div className="d-none d-lg-block d-xl-none d-xl-block">
        <GithubCorner href="https://github.com/macbury/BartenderAI" bannerColor="#802961" />
      </div>
      
    </div>
  )
}
