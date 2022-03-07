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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Link } from "react-router-dom";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
];

export default function ListCustomerComponent(props) {
  const {
    user,
    page,
    columns,
    rowsPerPage,
    searchOptions,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearchOptionsChange,
  } = props;

  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <>
      <Grid item xs={12}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Typography align="center" variant="h5">
            Customer List
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={10} lg={10}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Autocomplete
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            freeSolo
            disableClearable
            size="small"
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label={"Search with " + searchOptions}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} md={2} lg={2}>
        <Paper sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <FormControl fullWidth size="small">
            <InputLabel>Search with</InputLabel>
            <Select
              value={searchOptions}
              label="Search with"
              onChange={handleSearchOptionsChange}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="locality">Locality</MenuItem>
            </Select>
          </FormControl>
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
