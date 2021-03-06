import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';

import Dashboard from './components/dashboard/Dashboard';
// FM Components
import RequestList from './components/dashboard/fdash/RequestList';
import EngineerView from './components/dashboard/fdash/EngineerView';
import Assignment from './components/dashboard/fdash/Assignment';
import EditAssignment from './components/dashboard/fdash/EditAssignment';

// FM Components
import ProjectRoster from './components/dashboard/pdash/ProjectRoster';
import RequestForm from './components/dashboard/pdash/RequestForm';
import DeltaRequestForm from './components/dashboard/pdash/DeltaRequestForm';
import EditRequestForm from './components/dashboard/pdash/EditRequestForm';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/request-list"
                  component={RequestList}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/engineer-view"
                  component={EngineerView}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/assignment" component={Assignment} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-assignment"
                  component={EditAssignment}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/project-roster"
                  component={ProjectRoster}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/request-form"
                  component={RequestForm}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/request-change"
                  component={DeltaRequestForm}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-request"
                  component={EditRequestForm}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
