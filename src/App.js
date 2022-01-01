import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Install from terminal.
//import jwtdecode from "jwt-decode"; // npm i jwt-decode@2.2.0
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends React.Component {
  state = {};

  componentDidMount() {
    // // if the token is not available it will give error so to handle it add try catch block.
    // try {
    //   const jwt = localStorage.getItem("token");
    //   const user = jwtdecode(jwt);
    //   //console.log(user);
    //   this.setState({ user });
    // } catch (ex) {}
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          {/* Route[path][component]*4 */}
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            {/* <Route
              path="/movies/:id"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                return <MovieForm {...props} />;
              }}
            /> */}
            {/* <Route path="/movies/new" component={MovieForm} /> */}
            {/* <Route path="/movies" component={Movies} /> */}
            {/* if you want to pass props use render instead of component */}
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="movies" />
            <Redirect to="not-found" />
          </Switch>
          {/* <Movies></Movies> */}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
