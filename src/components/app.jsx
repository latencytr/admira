import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./common/navBar";
import About from "./about";
import SitePlan from "./sitePlan";
import Projects from "./projects";
import Dues from "./dues";
import Management from "./management";
import NotFound from "./notFound";
import LoginForm from "./loginForm";
import Logout from "./logout";
import auth from "../services/authService";
import ProtectedRoute from "./common/protectedRoute";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    links: []
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    let links = [...this.state.links];
    if (!user) {
      //links.push({ name: "Login", path: "/login" });
    } else {
      links.push(
        { name: "Hakkında", path: "/about" },
        { name: "Site Planı", path: "/siteplan" },
        { name: "Projeler", path: "/projects" },
        { name: "Aidat", path: "/dues" },
        { name: "Yönetim", path: "/management" }
      );
    }
    return (
      <main>
        <ToastContainer />
        <NavBar
          title="Admira Göksu"
          links={links}
          user={user}
          profile="/profile"
          logout="/logout"
        />
        <div className="app">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/about" component={About} />
            <ProtectedRoute path="/siteplan" component={SitePlan} />
            <ProtectedRoute path="/projects" component={Projects} />
            <ProtectedRoute path="/dues" component={Dues} />
            <ProtectedRoute path="/management" component={Management} />
            <Route path="/" exact component={LoginForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/login" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
