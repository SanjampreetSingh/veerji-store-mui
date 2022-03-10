import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";

import { Link } from "react-router-dom";

export default function FormCategoryComponent(props) {
  const { formState, updateBool, handleSubmit, handleChange } = props;
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/category">Category</Link>
        <Typography color="text.primary">
          {updateBool ? "Edit Category" : "Add Category"}
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
              to="/admin/category"
              sx={{
                top: 0,
                left: 25,
                position: "absolute",
              }}
            >
              Go Back
            </Button>
            {updateBool ? "Edit Category" : "Add Category"}
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
                label="Category Name"
                autoComplete="off"
                aria-describedby="name"
                onChange={(e) => {
                  handleChange("name", e?.target?.value);
                }}
                value={formState?.name}
                placeholder="Please enter category name"
                helperText="Please enter category name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon />
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
                label="Category Description"
                autoComplete="off"
                aria-describedby="description"
                onChange={(e) => {
                  handleChange("description", e?.target?.value);
                }}
                value={formState?.description}
                placeholder="Please enter category description"
                helperText="Please enter category description"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
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
              <Button variant="outlined" component={Link} to="/admin/category">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
