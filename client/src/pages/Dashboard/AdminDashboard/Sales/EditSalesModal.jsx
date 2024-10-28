/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import DPModal from "../../../../components/modal/DPModal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import DuePaymentForm from "../../../../components/paymentForm/DuePaymentForm";
import { useGetSingleSaleQuery } from "../../../../redux/api/admin/paymentApi";
import DPLoading from "../../../../components/ui/DPLoading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const EditSalesModal = ({ open, setOpen, id }) => {
  const { data: singleSale, isLoading } = useGetSingleSaleQuery(id);
  if (isLoading) return <DPLoading />;

  const amountDue = Number(singleSale?.data?.due).toFixed(2);

  return (
    <Box>
      <DPModal
        title="Edit sale"
        open={open}
        setOpen={setOpen}
        fullWidth
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "end",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography variant="h6">You have to pay:</Typography>
          <Typography variant="h6" fontWeight={600}>
            ${amountDue}
          </Typography>
        </Box>
        <Box>
          <Elements stripe={stripePromise}>
            <DuePaymentForm setOpen={setOpen} totalPrice={amountDue} id={id} />
          </Elements>
        </Box>
      </DPModal>
    </Box>
  );
};

export default EditSalesModal;
