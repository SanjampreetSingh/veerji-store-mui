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
import IconButton from "@mui/material/IconButton";

import { Link } from "react-router-dom";

export default function ListOrderComponent(props) {
  const {
    page,
    order,
    columns,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Typography align="center" variant="h5">
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
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}></Paper>
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
