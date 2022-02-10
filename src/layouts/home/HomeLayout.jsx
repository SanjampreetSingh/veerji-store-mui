import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
    >
      <CssBaseline />
      <UserHeader isAuthenticated={isAuthenticated} />
      <Container component="main" maxWidth="lg">
        {children}
      </Container>
      <UserFooter />
    </Box>
  );
}
