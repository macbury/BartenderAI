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

const WithAuth = (Component) => {
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

const AppRouter = () => (
  <Provider store={AppStore} {...{ recipes, bottles, flashes, orders, bartender }}>
    <React.Fragment>
      <Flashes />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/recipes" />}/>
          <Route exact path="/payments" component={WithAuth(PaymentsPage)} />
          <Route exact path="/ar" component={ArUIPage} />
          <Route exact path="/orders" render={WithAuth(OrdersPage)}/>
          <Route exact path="/recipes/new" render={WithAuth(NewRecipePage)}/>
          <Route exact path="/recipes/:recipeId" render={WithAuth(EditRecipePage)}/>
          <Route exact path="/recipes" render={WithAuth(RecipesPage)}/>
          <Route exact path="/bottles/:bottleId" render={WithAuth(EditBottlePage)}/>
          <Route exact path="/bottles" render={WithAuth(BottlesPage)}/>
          <Route exact path="/settings" render={WithAuth(SettingsPage)}/>
          <Route exact path="/api/explorer" render={WithAuth(ApiExplorerPage)}/>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  </Provider>
)

export default AppRouter
