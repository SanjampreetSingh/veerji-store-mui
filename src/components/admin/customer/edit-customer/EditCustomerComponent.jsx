import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { Link } from "react-router-dom";
import DetailCustomerComponent from "./DetailCustomerComponent";
import EditFormCustomerComponent from "./EditFormCustomerComponent";
import RecurringProductComponent from "./RecurringProductComponent";

export default function EditCustomerComponent(props) {
  const {
    user,
    editButton,
    setEditButton,
    locality,
    handleUserFormChange,
    handleSubmit,
    product,
    recurringProduct,
    handleRecurringArray,
    handleRecurringObj,
  } = props;

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
          <Typography
            align="center"
            variant="h3"
            sx={{ mb: 2, position: "relative" }}
          >
            <Button
              startIcon={<ArrowBackIosNewIcon />}
              component={Link}
              to="/admin/customer"
              sx={{
                top: 0,
                left:25,
                position: "absolute",
              }}
            >
              Go Back
            </Button>
            {!editButton ? user?.name : "Update customer details"}
            <IconButton
              label="Edit"
              variant="contained"
              color="secondary"
              aria-label="edit"
              component="span"
              size="small"
              sx={{
                right: 25,
                top: 0,
                border: "1px solid",
                position: "absolute",
              }}
              onClick={() => setEditButton(!editButton)}
            >
              <EditRoundedIcon />
            </IconButton>
          </Typography>
          <Grid container spacing={2} sx={{ px: 3 }}>
            <Grid item xs={12} sx={{ borderTop: "1px solid #dee2e6", mt: 1 }} />
            {!editButton ? (
              <DetailCustomerComponent user={user} />
            ) : (
              <EditFormCustomerComponent
                user={user}
                locality={locality}
                setEditButton={setEditButton}
                handleUserFormChange={handleUserFormChange}
                handleSubmit={handleSubmit}
              />
            )}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            align="center"
            variant="h5"
            sx={{ mb: 2, position: "relative" }}
          >
            Daily Supplies
          </Typography>
          <Grid container spacing={2} sx={{ px: 3 }}>
            <Grid item xs={12} sx={{ borderTop: "1px solid #dee2e6", mt: 1 }} />
            <RecurringProductComponent
              product={product}
              recurringProduct={recurringProduct}
              handleRecurringArray={handleRecurringArray}
              handleRecurringObj={handleRecurringObj}
              handleSubmit={handleSubmit}
            />
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
