import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout'
import { Route, Switch , withRouter, Redirect} from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login/Login'
import SignUp from './pages/Auth/Signup/SignUp'
import Dashboard from './pages/Account/Dashboard/Dashboard'
import Bookings from './pages/Account/Bookings/Bookings'
import FindTrips from './pages/Account/Trips/FindTrips'
import Trips from './pages/Account/Trips/Trips'
import Profile from './pages/Account/Profile/Profile'
import BookingSummary from './pages/Account/Bookings/BookingSummary'
import {Loading, RouteGuard} from './router'
import {connect} from 'react-redux';
import * as actions from "./store/actions";
import VerifyOTP from './pages/Auth/VerifyOTP/VerifyOTP'
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword'

const routes = [
  {
    path: "/",
    exact: true,
    component: Landing,
    guarded: false,
  },
  {
    path: "/login",
    component: Login,
    guarded: false,
  },
  {
    path: "/sign-up",
    component: SignUp,
    guarded: false,
  },
  {
    path: "/verify-otp",
    component: VerifyOTP,
    guarded: false,
  },
  {
    path: "/reset-password",
    component: ForgotPassword,
    guarded: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    guarded: true,
  },

  {
    path: "/find-trips",
    component: FindTrips,
    guarded: true,
  },

  {
    path: "/book-trip/:id",
    component: BookingSummary,
    guarded: true,
  },

  {
    path: "/my-trips",
    component: Trips,
    guarded: true,
  },

  {
    path: "/profile-settings",
    component: Profile,
    guarded: true,
  },
];

class App extends Component {
  state = {
    loading: true,
    userData: null,
  };
  componentDidMount() {
    this.props.checkAuth();
    this.setState({ 
      loading: this.props.loading, 
      userData: this.props.userData 
    });
  }

  render() {
    if (this.state.loading || this.props.loading) {
      console.log("loading");
      return <Loading />;
    } else {
      
      return (
        <Layout>
          <Switch>
            {routes.map((route, i) =>
              route.guarded ? (
                <RouteGuard key={i} {...route} {...this.props} />
              ) : (
                <Route key={i} {...route} />
              )
            )}
            <Redirect
              to={{
                pathname: "/dashboard",
                state: {
                  from: "/",
                },
              }}
            ></Redirect>
          </Switch>
        </Layout>
      );
    }
  }
}

const mapStateToProps = (state) => {
  
  return {
    loading: state.auth.initialising,
    userData: state.auth.userData,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(actions.checkAuthState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
