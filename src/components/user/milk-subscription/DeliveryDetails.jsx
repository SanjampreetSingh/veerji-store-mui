import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function DeliveryDetails(props) {
  const {
    monthYear,
    setMonthYear,
    columns,
    sale,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pb: 6,
          width: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h2"
            align="center"
            color="text.secondary"
            gutterBottom
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              mb: 4,
            }}
          >
            Delivery Details
          </Typography>
          <Grid container spacing={2} sx={{ px: 3 }}>
            <Grid item md={3}>
              <Paper
                sx={{ p: 1, display: "flex", flexDirection: "column" }}
                elevation={3}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disableFuture
                    views={["year", "month"]}
                    label="Select Year and Month"
                    minDate={new Date("2022-01-01")}
                    maxDate={new Date("2030-06-01")}
                    value={monthYear}
                    onChange={(newValue) => {
                      setMonthYear(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </LocalizationProvider>
              </Paper>
            </Grid>
            <Grid item md={9} />
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
                            style={{
                              minWidth: column.minWidth,
                              fontWeight: 600,
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sale
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
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
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column?.id === "created" ||
                                    column?.id === "user_phone"
                                      ? column.format(value)
                                      : value}
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
                  count={sale.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
