import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import AdminHeader from "../../components/admin/common/header/AdminHeader";
import AdminDrawer from "../../components/admin/common/drawer/AdminDrawer";
import AdminFooter from "../../components/admin/common/footer/AdminFooter";

export default function AdminLayout(props) {
  const { children } = props;

  const [open, setOpen] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AdminHeader
        open={open}
        anchorElUser={anchorElUser}
        toggleDrawer={toggleDrawer}
        handleOpenUserMenu={handleOpenUserMenu}
        handleCloseUserMenu={handleCloseUserMenu}
      />

      <AdminDrawer open={open} toggleDrawer={toggleDrawer} />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          flexGrow: 1,
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>

          <AdminFooter />
        </Container>
      </Box>
    </Box>
  );
}
