import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import MapIcon from "@mui/icons-material/Map";

import { Link } from "react-router-dom";

export default function FormLocalityComponent(props) {
  const {
    updateBool,
    response,
    error,
    handleSubmit,
    handleChange,
    submitError,
    formState,
  } = props;

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Typography align="center" variant="h5">
            {updateBool ? "Update locality" : "Add locality"}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2} sx={{ px: 3, mt: 1 }}>
            <TextField
              required
              autoFocus
              fullWidth
              name="name"
              size="small"
              label="Locality"
              autoComplete="off"
              aria-describedby="locality"
              onChange={handleChange}
              value={formState?.name}
              placeholder="Please enter locality"
              helperText="Please enter locality"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Grid item>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>{" "}
              &nbsp;
              <Button variant="outlined" component={Link} to="/admin/locality">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
