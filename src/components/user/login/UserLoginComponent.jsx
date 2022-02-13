import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

import { Link } from "react-router-dom";

import UserAlert from "../common/alert/UserAlert";

export default function UserLoginComponent(props) {
  const {
    error,
    submitError,
    handleSubmit,
    handleChange,
    setSubmitError,
    submitButtonLoading,
  } = props;
  return (
    <Box component="form" sx={{ mt: 1 }}>
      {submitError?.isError ? (
        <UserAlert
          alertColor="error"
          alertText={submitError?.errorMessage}
          open={submitError?.isError}
          setOpen={setSubmitError}
        />
      ) : null}
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={handleChange}
        error={error?.error === true && error?.email !== "" ? true : false}
        helperText={error?.error === true ? error?.email : ""}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={handleChange}
        error={error?.error === true && error?.password !== "" ? true : false}
        helperText={error?.error === true ? error?.password : ""}
      />
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
        loading={submitButtonLoading}
        disabled={error?.error === true ? true : false}
      >
        Sign In
      </LoadingButton>
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
