import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import upi from "../../../assets/images/payment-modal/upi.png";

export default function PaymentModal(props) {
  const { open, setOpen, pendingPayment } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="make payment online"
      aria-describedby="make payment online"
    >
      <Box sx={style}>
        <Card>
          <CardMedia component="img" image={upi} alt="payment QR" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Payable Amount: ₹ {pendingPayment}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You can scan using any UPI payment platform to make payments.
            </Typography>
            <Typography variant="body2" color="red">
              Note: Please send screen shot on WhatsApp after making payment.
              Reflection of pending payments will take some time to update.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button
              size="small"
              component="a"
              href="upi://pay?pa=jmohankhalsa@okaxis&amp;pn=Veerji Departmental Store &amp;cu=INR"
            >
              Payment
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
}
