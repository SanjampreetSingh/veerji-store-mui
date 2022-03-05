import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { Link } from "react-router-dom";

export default function EditCustomerComponent(props) {
  const { user } = props;
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/customer">Customer</Link>
        <Typography color="text.primary">Edit Customer</Typography>
      </Breadcrumbs>

      <Grid item xs={12}>
        <Paper
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography align="center" variant="h5" sx={{ mb: 2 }}>
            {user?.name}
          </Typography>
          <Grid container spacing={2} sx={{ px: 3 }}>
            <Grid item xs={12} sx={{ borderTop: "1px solid #dee2e6", mt: 1 }} />
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                Contact:{" "}
                <a
                  href={"tel:+91-" + user?.phone}
                  target="_blank"
                  rel="noreferrer"
                >
                  +91-{user?.phone}
                </a>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                Email:{" "}
                <a
                  href={"mailto:" + user?.email}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user?.email}
                </a>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                Address:{" "}
                <a
                  href={
                    "http://maps.google.com/?q=:" +
                    user?.house_number +
                    " " +
                    user?.locality_name
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {user?.house_number + " " + user?.locality_name}
                </a>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">
                Pending Payment: ₹{" " + user?.payment}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
