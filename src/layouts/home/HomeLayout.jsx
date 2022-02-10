import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import UserHeader from "../../components/user/common/header/UserHeader";
import UserFooter from "../../components/user/common/footer/UserFooter";

export default function HomeLayout(props) {
  const { isAuthenticated, children } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
      component="main"
    >
      <CssBaseline />
      <UserHeader isAuthenticated={isAuthenticated} />
      {children}
      <UserFooter />
    </Box>
  );
}
