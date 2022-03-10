import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import NumbersIcon from "@mui/icons-material/Numbers";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KitchenIcon from "@mui/icons-material/Kitchen";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";

import { Link } from "react-router-dom";

export default function FormProductComponent(props) {
  const { category, formState, updateBool, handleSubmit, handleChange } = props;
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/product">Product</Link>
        <Typography color="text.primary">
          {updateBool ? "Edit Product" : "Add Product"}
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
              to="/admin/product"
              sx={{
                top: 0,
                left: 25,
                position: "absolute",
              }}
            >
              Go Back
            </Button>
            {updateBool ? "Edit Product" : "Add Product"}
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
                size="small"
                name="name"
                label="Product Name"
                autoComplete="off"
                aria-describedby="name"
                onChange={(e) => {
                  handleChange("name", e?.target?.value);
                }}
                value={formState?.name}
                placeholder="Please enter product name"
                helperText="Please enter product name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KitchenIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="small"
                name="description"
                label="Product Description"
                autoComplete="off"
                aria-describedby="description"
                onChange={(e) => {
                  handleChange("description", e?.target?.value);
                }}
                value={formState?.description}
                placeholder="Please enter product description"
                helperText="Please enter product description"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                required
                fullWidth
                size="small"
                name="category"
                label="Product Category"
                autoComplete="off"
                aria-describedby="category"
                onChange={(e) => {
                  handleChange("category", e?.target?.value);
                }}
                value={formState?.category}
                placeholder="Please select product category"
                helperText="Please select product category"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">
                  <em>Select Locality</em>
                </MenuItem>
                {category?.map((val, idx) => (
                  <MenuItem key={idx} value={val?.id}>
                    {val?.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="number"
                size="small"
                name="price"
                label="Product Price"
                autoComplete="off"
                aria-describedby="price"
                onChange={(e) => {
                  handleChange("price", e?.target?.value);
                }}
                value={formState?.price}
                placeholder="Please enter product price"
                helperText="Please enter product price"
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
              <Button variant="outlined" component={Link} to="/admin/product">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
