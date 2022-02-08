import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function UIRouter() {
  return (
    <Router>
      <Switch>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}
