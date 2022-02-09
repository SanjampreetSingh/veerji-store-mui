import UserHeader from "../../components/user/common/header/UserHeader";

export default function HomeLayout(props) {
  const { isAuthenticated, children } = props
  return (
    <>
      <UserHeader isAuthenticated={isAuthenticated} />
      <div className="px-4 py-5 mb-5 ">{children}</div>
    </>
  );
}
