import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Router
import HomeRouter from "../layouts/home/HomeRouter";
import LoginRouter from "../layouts/login/LoginRouter";
// Component
import HomeComponent from "../components/user/home/HomeComponent";
import UserLogin from "../containers/user/login/UserLogin";
import UserRegister from "../containers/user/register/UserRegister";

export default function UIRouter() {
  return (
    <Router>
      <Switch>
        {/* Login Routers */}
        <LoginRouter
          exact
          path="/login"
          component={UserLogin}
          heading="Sign in"
        />
        <LoginRouter
          exact
          path="/register"
          component={UserRegister}
          heading="Sign up"
        />
        {/* Home Router */}
        <HomeRouter exact path="/" component={HomeComponent} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}
