import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomeRouter from "../layouts/home/HomeRouter";

function home(params) {
  return <h1>h1</h1>;
}

export default function UIRouter() {
  return (
    <Router>
      <Switch>
        <HomeRouter exact path="/" component={home} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}
