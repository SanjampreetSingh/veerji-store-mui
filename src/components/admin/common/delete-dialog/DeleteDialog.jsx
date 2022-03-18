import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteDialog(props) {
  const {
    open,
    title,
    setOpen,
    deleteId,
    description,
    button1Title,
    button2Title,
    button2Action,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      disableEscapeKeyDown
      aria-labelledby="admin-dialog-title"
      aria-describedby="admin-dialog-description"
    >
      <DialogTitle id="admin-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="admin-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>{button1Title}</Button>
        <Button
          onClick={() => {
            setOpen(false);
            button2Action(deleteId);
          }}
          autoFocus
        >
          {button2Title}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
