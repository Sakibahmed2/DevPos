/* eslint-disable react/prop-types */
import { Box, Button, TextField, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUpdateSaleMutation } from "../../redux/api/admin/paymentApi";
import { getUserInfo } from "../../utils/getUserInfo";

const DuePaymentForm = ({ setOpen, totalPrice, id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(totalPrice);
  const userInfo = getUserInfo();
  const [updatePayment] = useUpdateSaleMutation();

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/payments/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClientSecret(data.data.clientSecret);
      });
  }, [amount]);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment error: ", error);
      setError(error?.message);
    } else {
      console.log("Payment method:", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
          },
        },
      });

    if (confirmError) {
      console.log("Error:", confirmError);
      setError(confirmError?.message);
    } else {
      console.log("Payment intent:", paymentIntent);
      setError("");

      if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful");

        const payment = {
          customerName: name,
          amount: Number(totalPrice),
          paid: paymentIntent.amount / 100,
          biller: userInfo.id,
        };

        const res = await updatePayment({
          saleId: id,
          saleData: payment,
        }).unwrap();

        console.log(res);

        if (res.success) {
          toast.success("Payment created successfully");
          setOpen(false);
        }
      }
    }
  };

  return (
    <form onSubmit={handlePayment} className="w-[500px] mx-auto">
      <Typography variant="h6" gutterBottom>
        Payment Gateway
      </Typography>

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
      />

      <Box
        mt={2}
        mb={2}
        sx={{
          border: "1px solid lightgray",
          borderRadius: 2,
          padding: "20px 10px",
        }}
      >
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          type="submit"
          color="primary"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </Button>
        <Button
          onClick={() => setOpen(false)}
          sx={{
            bgcolor: "black",
          }}
        >
          Cancel
        </Button>
      </Box>
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
    </form>
  );
};

export default DuePaymentForm;
