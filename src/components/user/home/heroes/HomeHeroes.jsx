import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { Link } from "react-router-dom";

import { useAuth } from "../../../../context/auth/AuthProvider";

export default function HomeHeroes() {
  const auth = useAuth();
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        width: "100%",
      }}
    >
      <Typography align="center" color="text.primary">
        <ShoppingBasketIcon
          color="primary"
          fontSize="inherit"
          sx={{ fontSize: "80px" }}
        />
      </Typography>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Veerji Departmental Store
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Welcome to our Online initiative, where you can pay your milk
        subscription online and order from Veerji Food Court too.
      </Typography>
      <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        {auth?.state?.isAuthenticated && auth?.state?.authType === 2 ? (
          <>
            <Button
              variant="contained"
              component={Link}
              to="/milk-subscription"
            >
              Milk Subscriptions
            </Button>
            <Button variant="outlined" component={Link} to="/restaurants-menu">
              Restaurants Menu
            </Button>
          </>
        ) : auth?.state?.isAuthenticated && auth?.state?.authType === 1 ? (
          <Button variant="contained" component={Link} to="/admin">
            Admin Dashboard
          </Button>
        ) : (
          <>
            <Button variant="contained" component={Link} to="/login">
              Login to enter
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}
