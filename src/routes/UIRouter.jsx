import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Router
import HomeRouter from "../layouts/home/HomeRouter";
import LoginRouter from "../layouts/login/LoginRouter";
import AdminRouter from "../layouts/admin/AdminRouter";
import UserRouter from "../layouts/user/UserRouter";

// Home Component
import HomeComponent from "../components/user/home/HomeComponent";
// User Component
import UserLogin from "../containers/user/login/UserLogin";
import UserRegister from "../containers/user/register/UserRegister";
import UserLogout from "../containers/user/logout/UserLogout";
import MilkSubscription from "../containers/user/milk-subscription/MilkSubscription";
// Admin Component
import ListCustomer from "../containers/admin/customer/list-customer/ListCustomer";
import EditCustomer from "../containers/admin/customer/edit-customer/EditCustomer";
import ListLocality from "../containers/admin/locality/list-locality/ListLocality";
import AddLocality from "../containers/admin/locality/add-locality/AddLocality";
import EditLocality from "../containers/admin/locality/edit-locality/EditLocality";
import ListOrder from "../containers/admin/order/list-order/ListOrder";
import AddOrder from "../containers/admin/order/add-order/AddOrder";
import EditOrder from "../containers/admin/order/edit-order/EditOrder";
import ListProduct from "../containers/admin/product/list-product/ListProduct";
import AddProduct from "../containers/admin/product/add-product/AddProduct";
import EditProduct from "../containers/admin/product/edit-product/EditProduct";

function AdminDashboard() {
  return <h1>Admin</h1>;
}

function UserDashboard() {
  return <h1>User</h1>;
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
        <Route exact path="/logout" component={UserLogout} />
        {/* Home Router */}
        <HomeRouter exact path="/" component={HomeComponent} />
        {/* Admin Routes */}
        <AdminRouter exact path="/admin" component={AdminDashboard} />
        <AdminRouter exact path="/admin/customer" component={ListCustomer} />
        <AdminRouter
          exact
          path="/admin/customer/:userId"
          component={EditCustomer}
        />
        <AdminRouter exact path="/admin/locality" component={ListLocality} />
        <AdminRouter exact path="/admin/locality/add" component={AddLocality} />
        <AdminRouter
          exact
          path="/admin/locality/:id"
          component={EditLocality}
        />
        <AdminRouter exact path="/admin/order" component={ListOrder} />
        <AdminRouter exact path="/admin/order/add" component={AddOrder} />
        <AdminRouter exact path="/admin/order/:id" component={EditOrder} />
        <AdminRouter exact path="/admin/product" component={ListProduct} />
        <AdminRouter exact path="/admin/product/add" component={AddProduct} />
        <AdminRouter exact path="/admin/product/:id" component={EditProduct} />
        {/* User Routes */}
        <UserRouter
          exact
          path="/milk-subscription"
          component={MilkSubscription}
        />
        <UserRouter exact path="/restaurants-menu" component={UserDashboard} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}
