import CartIcon from "../../assets/icons/CartIcon"
import Header from "../../components/common/header/Header"
import Footer from "../../components/common/footer/Footer"

export default function LoginLayout(props) {
  const { isAuthenticated, heading, children } = props

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <div className="px-4 py-5 mb-5 ">
        <div className="text-center">
          <main className="form-signin">
            <form>
              <div className="mb-4">
                <CartIcon width="72" height="57" />
              </div>
              <h1 className="h3 mb-3 fw-normal">{heading}</h1>
              {children}
              <p className="mt-5 mb-3 text-muted">
                &copy; 2019–{new Date().getFullYear()}
              </p>
            </form>
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
