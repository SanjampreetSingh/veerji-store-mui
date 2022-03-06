import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";

export default function EditFormCustomerComponent(props) {
  const { user, locality, setEditButton, handleSubmit, handleUserFormChange } =
    props;

  return (
    <>
      <Grid item md={12}>
        <TextField
          required
          autoFocus
          autoComplete="name"
          name="name"
          placeholder="Please enter customer name"
          fullWidth
          label="Customer name"
          value={user?.name}
          onChange={handleUserFormChange}
          aria-describedby="customer-name"
          helperText="Please enter customer name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          required
          autoComplete="tel-national"
          label="Customer contact"
          fullWidth
          type="tel"
          name="phone"
          aria-describedby="customer-contact"
          placeholder="Please enter customer contact"
          value={user?.phone}
          onChange={handleUserFormChange}
          helperText="Please enter customer contact"
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
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          required
          autoComplete="email"
          label="Customer email"
          helperText="Please enter customer email"
          type="email"
          fullWidth
          name="email"
          aria-describedby="customer-email"
          placeholder="Please enter customer email"
          value={user?.email}
          onChange={handleUserFormChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          required
          fullWidth
          label="Customer house number"
          helperText="Please enter customer house number"
          placeholder="Please enter customer house number"
          name="house_number"
          value={user?.house_number}
          aria-describedby="customer-house-number"
          onChange={handleUserFormChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon />
              </InputAdornment>
            ),
            maxLength: "7",
          }}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          select
          aria-label="Select Locality"
          fullWidth
          name="locality"
          aria-labelledby="locality"
          autoComplete="off"
          value={user?.locality}
          onChange={handleUserFormChange}
          helperText="Please select customer locality"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MapIcon />
              </InputAdornment>
            ),
          }}
        >
          {locality.map((val, idx) => (
            <MenuItem key={idx} value={val?.id}>
              {val?.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>{" "}
        &nbsp;
        <Button variant="outlined" onClick={() => setEditButton(false)}>
          Cancel
        </Button>
      </Grid>
    </>
  );
}
