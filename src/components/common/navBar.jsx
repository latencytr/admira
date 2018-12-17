import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../../images/logo.png";

class NavBar extends React.Component {
  state = { navbarCss: "collapse", dropDownCss: "" };
  handleToggle = () => {
    const navbarCss = this.state.navbarCss === "collapse" ? "" : "collapse";
    this.setState({ navbarCss });
  };
  collapseMenu = () => {
    const navbarCss = "collapse";
    this.setState({ navbarCss });
  };
  toggleDropDown = () => {
    const dropDownCss = this.state.dropDownCss === "show" ? "" : "show";
    this.setState({ dropDownCss });
  };
  hideDropDown = () => {
    const dropDownCss = "";
    this.setState({ dropDownCss });
  };
  render() {
    const { navbarCss, dropDownCss } = this.state;
    const { user, links, title, profile, logout } = this.props;
    return (
      <div className="row">
        <div className="w-100">
          <nav className="navbar navbar-expand-sm navbar-light bg-light ">
            <Link className="navbar-brand ml-4" to="/">
              <img width="100px" src={logo} alt={title} />
            </Link>
            <button className="navbar-toggler" onClick={this.handleToggle}>
              <span className="navbar-toggler-icon" />
            </button>
            <div
              id="navbarNavDropdown"
              className={`${navbarCss} navbar-collapse`}
            >
              <div className="navbar-nav mr-auto">
                {links.map(link => (
                  <NavLink
                    key={link.name}
                    className="nav-item nav-link"
                    to={link.path}
                    onClick={this.collapseMenu}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
              {user && (
                <React.Fragment>
                  <ul className="navbar-nav">
                    <li className={`nav-item dropdown " + ${dropDownCss}`}>
                      <span
                        className="nav-link dropdown-toggle"
                        onClick={this.toggleDropDown}
                      >
                        {user.name}
                      </span>
                      <div className={`dropdown-menu " + ${dropDownCss}`}>
                        <NavLink
                          className="dropdown-item"
                          to={profile}
                          onClick={() => {
                            this.collapseMenu();
                            this.hideDropDown();
                          }}
                        >
                          My Profile
                        </NavLink>
                        <NavLink
                          className="dropdown-item"
                          to={logout}
                          onClick={() => {
                            this.collapseMenu();
                            this.hideDropDown();
                          }}
                        >
                          Logout
                        </NavLink>
                      </div>
                    </li>
                  </ul>
                </React.Fragment>
              )}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default NavBar;
