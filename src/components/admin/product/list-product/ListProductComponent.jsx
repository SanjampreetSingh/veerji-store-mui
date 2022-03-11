import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CategoryIcon from "@mui/icons-material/Category";

import { Link } from "react-router-dom";

export default function ListProductComponent(props) {
  const {
    page,
    search,
    columns,
    product,
    category,
    setSearch,
    rowsPerPage,
    handleSearch,
    filterCategory,
    handleChangePage,
    setFilterCategory,
    handleChangeRowsPerPage,
  } = props;

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Typography align="center" variant="h3">
            Product List
          </Typography>
        </Paper>
      </Grid>

      <Grid item md={3}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Button variant="contained" to="/admin/product/add" component={Link}>
            Add new product
          </Button>
        </Paper>
      </Grid>
      <Grid item md={6}>
        <Paper
          component="form"
          sx={{
            p: "4px",
            display: "flex",
            alignItems: "center",
          }}
          variant="outlined"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onBlur={(e) => {
              e.preventDefault();
            }}
            placeholder="Search with product name"
            inputProps={{
              "aria-label": "Search with product name",
            }}
            type="search"
          />
          <IconButton
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Grid item md={3}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <TextField
            select
            fullWidth
            size="small"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            label="Filter by Category"
            aria-label="Filter by Category"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">
              <em>Select Category</em>
            </MenuItem>
            {category.map((val, idx) => (
              <MenuItem key={idx} value={val?.id}>
                {val?.name}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: 600 }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {product
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "edit" ? (
                                <IconButton
                                  label="Edit"
                                  variant="contained"
                                  color="secondary"
                                  aria-label="edit"
                                  component={Link}
                                  to={"/admin/product/" + row?.id?.toString()}
                                  size="small"
                                  sx={{
                                    border: "1px solid",
                                  }}
                                >
                                  <EditRoundedIcon />
                                </IconButton>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={product.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </>
  );
}
