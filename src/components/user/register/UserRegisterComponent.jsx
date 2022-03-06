import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import PasswordIcon from "@mui/icons-material/Password";

import { Link } from "react-router-dom";

import UserAlert from "../common/alert/UserAlert";

export default function UserRegisterComponent(props) {
  const {
    error,
    locality,
    formState,
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
        type="text"
        margin="normal"
        required
        fullWidth
        label="Name"
        name="name"
        autoFocus
        placeholder="Please enter name"
        autoComplete="name"
        onChange={handleChange}
        error={error?.error === true && error?.name !== "" ? true : false}
        helperText={
          error?.error === true ? error?.name : "Please enter your name"
        }
        value={formState?.name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
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
        onChange={handleChange}
        error={error?.error === true && error?.email !== "" ? true : false}
        helperText={
          error?.error === true ? error?.email : "Please enter your email"
        }
        value={formState?.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type="tel"
        margin="normal"
        required
        fullWidth
        label="Contact"
        name="phone"
        placeholder="9999999999"
        autoComplete="tel-national"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CallIcon />
            </InputAdornment>
          ),
          pattern: "[0-9]{10}",
          maxLength: "10",
          inputMode: "numeric",
        }}
        onChange={handleChange}
        error={error?.error === true && error?.phone !== "" ? true : false}
        helperText={
          error?.error === true ? error?.phone : "Please enter your contact"
        }
        value={formState?.phone}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        autoComplete="new-password"
        type="password"
        onChange={handleChange}
        placeholder="Please enter your password"
        error={error?.error === true && error?.password !== "" ? true : false}
        helperText={
          error?.error === true ? error?.password : "Please enter your password"
        }
        value={formState?.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type="text"
        margin="normal"
        required
        fullWidth
        label="House Number"
        name="house_number"
        placeholder="792"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HomeIcon />
            </InputAdornment>
          ),
          maxLength: "7",
        }}
        onChange={handleChange}
        error={
          error?.error === true && error?.house_number !== "" ? true : false
        }
        helperText={
          error?.error === true
            ? error?.house_number
            : "Please enter your house number"
        }
        value={formState?.house_number}
      />
      <TextField
        select
        fullWidth
        sx={{ mt: 2 }}
        error={error?.error === true && error?.locality !== "" ? true : false}
        labelId="locality"
        name="locality"
        label="Locality"
        onChange={handleChange}
        autoComplete="off"
        required
        value={formState?.locality}
        helperText={
          error?.error === true
            ? error?.locality
            : "Please select your locality"
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MapIcon />
            </InputAdornment>
          ),
        }}
      >
        <MenuItem value="">
          <em>Select Locality</em>
        </MenuItem>
        {locality?.map((val, idx) => (
          <MenuItem key={idx} value={val?.id}>
            {val?.name}
          </MenuItem>
        ))}
      </TextField>
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
        loading={submitButtonLoading}
        disabled={error?.error === true ? true : false}
      >
        Sign Up
      </LoadingButton>
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
