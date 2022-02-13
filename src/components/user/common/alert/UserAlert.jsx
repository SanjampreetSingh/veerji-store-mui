import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export default function UserAlert(props) {
  const { alertColor, alertText, open, setOpen } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          color={alertColor || "success"}
          severity={alertColor || "success"}
          action={
            <IconButton
              aria-label="close"
              color={alertColor || "inherit"}
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertText}
        </Alert>
      </Collapse>
    </Box>
  );
}
