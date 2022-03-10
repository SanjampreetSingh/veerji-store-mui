import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MapIcon from "@mui/icons-material/Map";
import SearchIcon from "@mui/icons-material/Search";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { Link } from "react-router-dom";

export default function ListCustomerComponent(props) {
  const {
    user,
    page,
    search,
    columns,
    locality,
    setSearch,
    rowsPerPage,
    filterOption,
    handleSearch,
    handleChangePage,
    handleChangeRowsPerPage,
    handleFilterOptionsChange,
  } = props;

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Typography align="center" variant="h3">
            Customer List
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
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
            placeholder="Search with name or email or phone or house number"
            inputProps={{
              "aria-label":
                "Search with name or email or phone or house number",
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

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: "6.3px", display: "flex", flexDirection: "column" }}>
          <TextField
            select
            fullWidth
            size="small"
            value={filterOption}
            label="Filter by Locality"
            aria-label="Filter by Locality"
            aria-labelledby="Filter by Locality"
            onChange={handleFilterOptionsChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MapIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">
              <em>Select Locality</em>
            </MenuItem>
            {locality.map((val, id) => (
              <MenuItem key={id} value={val?.id}>
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
                {user
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
                              {column?.id === "phone" ||
                              column?.id === "email" ? (
                                column.format(value)
                              ) : column.id === "edit" ? (
                                <IconButton
                                  label="Edit"
                                  variant="contained"
                                  color="secondary"
                                  aria-label="edit"
                                  component={Link}
                                  to={"/admin/customer/" + row?.id?.toString()}
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
            count={user.length}
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
