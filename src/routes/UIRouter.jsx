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
import AdminRouter from "../layouts/admin/AdminRouter";
import UserLogout from "../containers/user/logout/UserLogout";

function AdminDashboard() {
  return <h1>Admin</h1>;
}

export default function UIRouter() {
  return (
    <Router>
      <Switch>
        {/* Login Routers */}
        <LoginRouter
          exact
          path="/login"
          component={UserLogin}
          heading="Login"
        />
        <LoginRouter
          exact
          path="/register"
          component={UserRegister}
          heading="Register"
        />
        {/* Home Router */}
        <HomeRouter exact path="/" component={HomeComponent} />
        {/* Admin Routes */}
        <AdminRouter exact path="/admin" component={AdminDashboard} />
        <Route exact path="/logout" component={UserLogout} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}
