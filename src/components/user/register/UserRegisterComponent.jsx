import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

export default function UserRegisterComponent() {
  return (
    <Box component="form" sx={{ mt: 1 }}>
      <TextField
        type="text"
        margin="normal"
        required
        fullWidth
        label="Name"
        name="name"
        autoFocus
        placeholder="Happy Singh"
        autoComplete="name"
      />
      <TextField
        type="email"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        placeholder="name@example.com"
        autoComplete="email"
      />
      <TextField
        type="tel"
        margin="normal"
        required
        fullWidth
        label="Phone Number"
        name="phone"
        placeholder="9999999999"
        autoComplete="tel-national"
        inputProps={{
          pattern: "[0-9]{10}",
          maxLength: "10",
          inputMode: "numeric",
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        autoComplete="new-password"
        type="password"
      />
      <TextField
        type="text"
        margin="normal"
        required
        fullWidth
        label="House Number"
        name="house_number"
        placeholder="792"
        inputProps={{
          maxLength: "7",
        }}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Grid container>
        <Grid item>
          <Typography component={Link} to="/login" variant="body2">
            {"Already have an account? Sign In"}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
