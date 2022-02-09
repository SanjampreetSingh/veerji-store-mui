import { useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"
import jwt_decode from "jwt-decode"

import LoginLayout from "./LoginLayout"

export default function LoginRouter({
  heading,
  component: Component,
  ...rest
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  let token = localStorage?.getItem("refresh_token")
  if (token === undefined || token === null || token === "undefined") {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  }

  useEffect(() => {
    if (token) {
      let decoded = jwt_decode(token)
      let tokenExpiration = decoded?.exp
      let dateNow = new Date()

      if (tokenExpiration < dateNow.getTime() / 1000) {
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true)
      }
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  let type = 0
  if (token) {
    type = jwt_decode(token).type
  }

  if (isAuthenticated === null) {
    return <></>
  }

  return (
    <>
      {!isAuthenticated ? (
        <Route
          {...rest}
          render={props => (
            <LoginLayout heading={heading} isAuthenticated={isAuthenticated}>
              <Component {...props} />
            </LoginLayout>
          )}
        />
      ) : type === 1 ? (
        <Redirect to="/admin" />
      ) : (
        <Redirect to="/user" />
      )}
    </>
  )
}
