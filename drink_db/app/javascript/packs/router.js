import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import AppStore from './store'
import flashes from './store/flashes'
import bottles from './store/bottles'
import orders from './store/orders'
import recipes from './store/recipes'
import bartender from './store/bartender'

import UserRequired from './components/user_required'
import Layout from './components/layout'
import Flashes from './components/flashes'

import RecipesPage from './pages/recipes'
import NewRecipePage from './pages/new_recipe'
import EditRecipePage from './pages/edit_recipe'
import BottlesPage from './pages/bottles'
import EditBottlePage from './pages/edit_bottle'
import ApiExplorerPage from './pages/api_explorer'
import PaymentsPage from './pages/payments'
import OrdersPage from './pages/orders'
import SettingsPage from './pages/settings'
import ArUIPage from './pages/ar_ui'
import InteractPage from './pages/interact'

const WithAuthAndLayout = (Component) => {
  return function(props) {
    return (
      <UserRequired>
        <Layout>
          <Component {...props} />
        </Layout>
      </UserRequired>
    )
  }
}

const WithAuth = (Component) => {
  return function(props) {
    return (
      <UserRequired>
        <Component {...props} />
      </UserRequired>
    )
  }
}

const AppRouter = () => (
  <Provider store={AppStore} {...{ recipes, bottles, flashes, orders, bartender }}>
    <React.Fragment>
      <Flashes />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/recipes" />}/>
          <Route path="/payments/:mode" component={WithAuth(PaymentsPage)} />
          <Route path="/payments" component={WithAuth(PaymentsPage)} />
          <Route exact path="/interact" component={WithAuth(InteractPage)} />
          <Route exact path="/ar" component={ArUIPage} />
          <Route exact path="/orders" render={WithAuthAndLayout(OrdersPage)}/>
          <Route exact path="/recipes/new" render={WithAuthAndLayout(NewRecipePage)}/>
          <Route exact path="/recipes/:recipeId" render={WithAuthAndLayout(EditRecipePage)}/>
          <Route exact path="/recipes" render={WithAuthAndLayout(RecipesPage)}/>
          <Route exact path="/bottles/:bottleId" render={WithAuthAndLayout(EditBottlePage)}/>
          <Route exact path="/bottles" render={WithAuthAndLayout(BottlesPage)}/>
          <Route exact path="/settings" render={WithAuthAndLayout(SettingsPage)}/>
          <Route exact path="/api/explorer" render={WithAuthAndLayout(ApiExplorerPage)}/>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  </Provider>
)

export default AppRouter
