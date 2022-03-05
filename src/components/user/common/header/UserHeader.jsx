import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { Link } from "react-router-dom";

import { useAuth } from "../../../../context/auth/AuthProvider";

const settings = {
  0: { title: "Profile", url: "/" },
  1: { title: "Logout", url: "/logout" },
};
const pages = ["Menu", "Milk Subscriptions"];

export default function UserHeader() {
  const auth = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, color: "white" }}
          >
            <ShoppingBasketIcon /> &nbsp; Veerji Departmental Store
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  onClick={handleCloseNavMenu}
                  component="a"
                  textAlign="center"
                  href="https://www.google.com/maps/dir//Veerji+Departmental+Store/data=!4m8!4m7!1m0!1m5!1m1!1s0x391a8146052e6131:0xfd2081c026ecda8b!2m2!1d75.80588449999999!2d30.8778632"
                  target="_blank"
                  itemProp="hasMap"
                >
                  Get Directions
                </Typography>
                <Typography
                  onClick={handleCloseNavMenu}
                  component="a"
                  textAlign="center"
                  href="tel:+91-161-462-5040"
                  target="_blank"
                  itemProp="telephone"
                >
                  Call now
                </Typography>
              </MenuItem>
              {auth?.state?.isAuthenticated
                ? pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Link to={"/" + page.toLowerCase().replace(/\s/g, "")}>
                        <Typography textAlign="center">{page}</Typography>
                      </Link>
                    </MenuItem>
                  ))
                : null}
            </Menu>
          </Box>
          <Typography
            variant="h3"
            noWrap
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "white",
            }}
          >
            <ShoppingBasketIcon />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              component="a"
              href="https://www.google.com/maps/dir//Veerji+Departmental+Store/data=!4m8!4m7!1m0!1m5!1m1!1s0x391a8146052e6131:0xfd2081c026ecda8b!2m2!1d75.80588449999999!2d30.8778632"
              target="_blank"
              itemProp="hasMap"
            >
              Get Directions
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              component="a"
              href="tel:+91-161-462-5040"
              target="_blank"
              itemProp="telephone"
            >
              Call now
            </Button>
            {auth?.state?.isAuthenticated
              ? pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                    component={Link}
                    to={"/" + page.toLowerCase().replace(/\s/g, "")}
                  >
                    {page}
                  </Button>
                ))
              : null}
          </Box>
          {auth?.state?.isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {Object.keys(settings).map((key, id) => (
                  <MenuItem
                    key={settings[id]?.title}
                    component={Link}
                    onClick={handleCloseUserMenu}
                    to={
                      id === 0
                        ? auth?.state?.authType === 1
                          ? "/admin"
                          : "/user"
                        : settings[id]?.url
                    }
                  >
                    <Typography textAlign="center">
                      {settings[id]?.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              {" "}
              <Button
                sx={{ backgroundColor: "#bdbdbd", borderColor: "#bdbdbd" }}
                variant="contained"
                size="small"
                component={Link}
                to="/register"
              >
                Sign Up
              </Button>
              <Button
                sx={{ ml: 1, color: "white", borderColor: "white" }}
                variant="outlined"
                size="small"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
