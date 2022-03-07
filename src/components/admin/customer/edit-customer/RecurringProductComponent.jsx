import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import NumbersIcon from "@mui/icons-material/Numbers";
import KitchenIcon from "@mui/icons-material/Kitchen";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RecurringProductComponent(props) {
  const {
    product,
    recurringProduct,
    handleRecurringArray,
    handleRecurringObj,
    handleSubmit,
  } = props;

  return (
    <>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Button
          onClick={() => handleRecurringArray("add")}
          variant="contained"
          color="secondary"
        >
          Add product
        </Button>
      </Grid>
      {recurringProduct?.map((val, idx) => (
        <Grid container id={idx} spacing={2} sx={{ p: 1 }}>
          <Grid item md={6}>
            <TextField
              select
              aria-label="Select Product"
              fullWidth
              aria-labelledby="product"
              autoComplete="off"
              name="productId"
              value={val?.productId}
              size="small"
              helperText="Please select product"
              onChange={(e) =>
                handleRecurringObj(
                  val?.recurringIndex,
                  e?.target?.name,
                  e?.target?.value
                )
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KitchenIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">
                <em>Select Product</em>
              </MenuItem>
              {product.map((val, id) => (
                <MenuItem key={id} value={val?.id}>
                  {val?.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={5}>
            <TextField
              required
              fullWidth
              label="Customer house number"
              helperText="Please enter quantity"
              size="small"
              aria-describedby="quantity"
              type="number"
              className="form-control"
              name="quantity"
              placeholder="Please enter quantity"
              min={0}
              value={val?.quantity}
              onChange={(e) =>
                handleRecurringObj(
                  val?.recurringIndex,
                  e?.target?.name,
                  e?.target?.value
                )
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersIcon />
                  </InputAdornment>
                ),
                pattern: "[0-9]{10}",
                maxLength: "10",
                inputMode: "numeric",
              }}
            />
          </Grid>
          <Grid item md={1}>
            <IconButton
              label="Remove"
              variant="contained"
              color="error"
              aria-label="remove"
              component="span"
              size="small"
              sx={{
                border: "1px solid",
              }}
              onClick={() => {
                handleRecurringArray("delete", val?.recurringIndex);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Button onClick={handleSubmit} variant="contained">
          Update Daily Supplies
        </Button>
      </Grid>
    </>
  );
}
