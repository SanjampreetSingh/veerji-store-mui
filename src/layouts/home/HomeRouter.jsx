import { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import jwt_decode from "jwt-decode"

import HomeLayout from "./HomeLayout"

export default function HomeRouter({ component: Component, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  let token = localStorage?.getItem("refresh_token")
  if (token === undefined || token === null || token === "undefined") {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  }

  useEffect(() => {
    if (token) {
      let tokenExpiration = jwt_decode(token)?.exp
      let dateNow = new Date()

      if (tokenExpiration < dateNow.getTime() / 1000) {
        setIsAuthenticated(false)
        return
      } else {
        setIsAuthenticated(true)
      }
    } else {
      setIsAuthenticated(false)
    }
  }, [token])

  return (
    <Route
      {...rest}
      render={props => (
        <HomeLayout isAuthenticated={isAuthenticated}>
          <Component {...props} isAuthenticated={isAuthenticated} />
        </HomeLayout>
      )}
    />
  )
}
