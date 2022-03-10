import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import MapIcon from "@mui/icons-material/Map";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { Link } from "react-router-dom";

export default function FormLocalityComponent(props) {
  const { updateBool, handleSubmit, handleChange, formState } = props;

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/locality">Locality</Link>
        <Typography color="text.primary">
          {updateBool ? "Edit Locality" : "Add Locality"}
        </Typography>
      </Breadcrumbs>

      <Grid item xs={12}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Typography
            align="center"
            variant="h3"
            sx={{ mb: 2, position: "relative" }}
          >
            <Button
              startIcon={<ArrowBackIosNewIcon />}
              component={Link}
              to="/admin/locality"
              sx={{
                top: 0,
                left: 25,
                position: "absolute",
              }}
            >
              Go Back
            </Button>
            {updateBool ? "Edit Locality" : "Add Locality"}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2} sx={{ px: 3, mt: 1 }}>
            <Grid item xs={12}>
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
            </Grid>
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
