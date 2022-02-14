import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LoadingButton from "@mui/lab/LoadingButton";
import FormHelperText from "@mui/material/FormHelperText";

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
        placeholder="Happy Singh"
        autoComplete="name"
        onChange={handleChange}
        error={error?.error === true && error?.name !== "" ? true : false}
        helperText={error?.error === true ? error?.name : ""}
        value={formState?.name}
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
        helperText={error?.error === true ? error?.email : ""}
        value={formState?.email}
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
        onChange={handleChange}
        error={error?.error === true && error?.phone !== "" ? true : false}
        helperText={error?.error === true ? error?.phone : ""}
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
        error={error?.error === true && error?.password !== "" ? true : false}
        helperText={error?.error === true ? error?.password : ""}
        value={formState?.password}
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
        onChange={handleChange}
        error={
          error?.error === true && error?.house_number !== "" ? true : false
        }
        helperText={error?.error === true ? error?.house_number : ""}
        value={formState?.house_number}
      />
      <FormControl
        fullWidth
        sx={{ mt: 2 }}
        error={error?.error === true && error?.locality !== "" ? true : false}
      >
        <InputLabel>Select Locality</InputLabel>
        <Select
          labelId="locality"
          name="locality"
          label="Select Locality"
          onChange={handleChange}
          autoComplete="off"
          required
          value={formState?.locality}
        >
          <MenuItem value="">
            <em>Select Locality</em>
          </MenuItem>
          {locality?.map((val, idx) => (
            <MenuItem key={idx} value={val?.id}>
              {val?.name}
            </MenuItem>
          ))}
        </Select>
        {error?.error === true ? (
          <FormHelperText>{error?.locality}</FormHelperText>
        ) : null}
      </FormControl>
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
