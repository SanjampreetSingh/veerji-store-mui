import { Route } from "react-router-dom";

import HomeLayout from "./HomeLayout";

export default function HomeRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <HomeLayout>
          <Component {...props} />
        </HomeLayout>
      )}
    />
  );
}
