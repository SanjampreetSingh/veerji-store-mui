import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { Link } from "react-router-dom";

export default function LoginLayout(props) {
  const { heading, children } = props;

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://source.unsplash.com/random/?burger,chips)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => t.palette.grey[50],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            mt: 6,
            mb:2,
            ml: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Button startIcon={<ArrowBackIosNewIcon />} component={Link}  to="/">
            Back to home
          </Button>
        </Box>
        <Box
          sx={{
            mb: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <ShoppingBasketIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {heading}
          </Typography>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
