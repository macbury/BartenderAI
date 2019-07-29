import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import beerLogo from '../images/beer.svg'
import BartenderConnection from './bartender_connection'

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  hideSidebar() {
    this.setState({
      collapsed: true
    })
  }

  render() {
    return (
      <Navbar color="faded" light expand="md" fixed="top">
        <div className="container d-flex justify-content-between">
          <Link className="mr-auto navbar-brand" to="/recipes">
            <img className="mr-3" src={beerLogo} />
            <strong>Bartender AI </strong>
            <BartenderConnection />
          </Link>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link" exact to="/recipes" onClick={this.hideSidebar.bind(this)}>Recipes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/bottles" onClick={this.hideSidebar.bind(this)}>Bottles</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/orders" onClick={this.hideSidebar.bind(this)}>Orders</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink className="nav-link" to="/payments" onClick={this.hideSidebar.bind(this)}>Payments</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink className="nav-link" to="/api/explorer" onClick={this.hideSidebar.bind(this)}>Api Explorer</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink className="nav-link" to="/settings" onClick={this.hideSidebar.bind(this)}>Settings</NavLink>
              </NavItem> */}

              <NavItem>
                <a className="nav-link" href="/signout">Logout</a>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}
