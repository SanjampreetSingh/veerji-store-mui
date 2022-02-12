import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

export default function UserLoginComponent() {
  return (
    <Box component="form" sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Typography component={Link} to="/forgot-password" variant="body2">
            Forgot password?
          </Typography>
        </Grid>
        <Grid item>
          <Typography component={Link} to="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
