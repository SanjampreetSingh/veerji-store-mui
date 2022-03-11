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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";

export default function ListOrderComponent(props) {
  const {
    page,
    order,
    search,
    columns,
    setSearch,
    rowsPerPage,
    handleSearch,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Typography align="center" variant="h3">
            Order List
          </Typography>
        </Paper>
      </Grid>

      <Grid item md={3}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Button variant="contained" to="/admin/order/add" component={Link}>
            Add new order
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
            placeholder="Search with customer name and phone number"
            inputProps={{
              "aria-label": "Search with customer name and phone number",
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
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}></Paper>
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
                {order
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
                              {column?.id === "created" ||
                              column?.id === "user_phone" ? (
                                column.format(value)
                              ) : column.id === "edit" ? (
                                <>
                                  <IconButton
                                    label="Edit"
                                    variant="contained"
                                    color="secondary"
                                    aria-label="edit"
                                    component={Link}
                                    to={"/admin/order/" + row?.id?.toString()}
                                    size="small"
                                    sx={{
                                      border: "1px solid",
                                    }}
                                  >
                                    <EditRoundedIcon />
                                  </IconButton>
                                  &nbsp;
                                  <IconButton
                                    label="Delete"
                                    variant="contained"
                                    color="error"
                                    aria-label="delete"
                                    size="small"
                                    sx={{
                                      border: "1px solid",
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </>
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
            count={order.length}
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
