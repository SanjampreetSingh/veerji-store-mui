import { Route, Redirect } from "react-router-dom";

import LoginLayout from "./LoginLayout";
import { useAuth } from "../../context/auth/AuthProvider";

export default function LoginRouter({
  heading,
  component: Component,
  ...rest
}) {
  const auth = useAuth();

  if (auth === null) {
    return <></>;
  }

  return (
    <>
      {!auth?.state?.isAuthenticated ? (
        <Route
          {...rest}
          render={(props) => (
            <LoginLayout heading={heading}>
              <Component {...props} />
            </LoginLayout>
          )}
        />
      ) : auth?.state?.authType === 1 ? (
        <Redirect to="/admin" />
      ) : (
        <Redirect to="/user" />
      )}
    </>
  );
}
