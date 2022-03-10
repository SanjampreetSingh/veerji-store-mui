import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import KitchenIcon from "@mui/icons-material/Kitchen";
import PersonIcon from "@mui/icons-material/Person";
import NumbersIcon from "@mui/icons-material/Numbers";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { Link } from "react-router-dom";

export default function FormOrderComponent(props) {
  const { user, product, formState, updateBool, handleSubmit, handleChange } =
    props;
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/order">Order</Link>
        <Typography color="text.primary">
          {updateBool ? "Edit Order" : "Add Order"}
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
              to="/admin/order"
              sx={{
                top: 0,
                left: 25,
                position: "absolute",
              }}
            >
              Go Back
            </Button>
            {updateBool ? "Edit Order" : "Add Order"}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2} sx={{ px: 3, mt: 1 }}>
            <Grid item xs={12}>
              <Autocomplete
                freeSolo
                fullWidth
                disableClearable
                size="small"
                options={user}
                // TODO: need to check undefined
                getOptionLabel={(option) =>
                  option?.name?.length > 1
                    ? `${option?.name} - ${option?.house_number} ${option?.locality_name}`
                    : ""
                }
                onChange={(event, newValue) => {
                  handleChange("user", newValue?.id);
                }}
                value={
                  user?.find((val) => {
                    return val?.id === formState?.user;
                  }) || ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="User"
                    placeholder="Please select user"
                    helperText="Please select user"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                freeSolo
                fullWidth
                disableClearable
                size="small"
                options={product}
                getOptionLabel={(option) => option?.name || ""}
                onChange={(event, newValue) => {
                  handleChange("product", newValue?.id);
                }}
                value={
                  product?.find((val) => {
                    return val?.id === formState?.product;
                  }) || ""
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Product"
                    placeholder="Please select product"
                    helperText="Please select product"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      startAdornment: (
                        <InputAdornment position="start">
                          <KitchenIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                fullWidth
                type="number"
                size="small"
                name="quantity"
                label="Quantity"
                autoComplete="off"
                aria-describedby="quantity"
                onChange={(e) => {
                  handleChange("quantity", e?.target?.value);
                }}
                value={formState?.quantity}
                placeholder="Please enter quantity"
                helperText="Please enter quantity"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersIcon />
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
              <Button variant="outlined" component={Link} to="/admin/order">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
