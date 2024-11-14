/* eslint-disable react/prop-types */
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import DPModal from "../../../../components/modal/DPModal";
import PurchaseDueForm from "../../../../components/paymentForm/PurchasePaymentForm/PurchaseDueForm";
import DPLoading from "../../../../components/ui/DPLoading";
import { useGetSinglePurchaseQuery } from "../../../../redux/api/admin/purchaseApi";
import { useGetAllSuppliersQuery } from "../../../../redux/api/finance/suppliersApi";
import groupProductsById from "../../../../utils/groupProductsById";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const EditPurchaseModal = ({ open, setOpen, id }) => {
  const [supplierId, setSupplierId] = useState("");
  const [note, setNote] = useState("");

  const { data: singlePurchase, isLoading } = useGetSinglePurchaseQuery(id);
  const { data: supplierData } = useGetAllSuppliersQuery({});

  const productData = groupProductsById(singlePurchase?.data?.products);

  useEffect(() => {
    if (singlePurchase) {
      setSupplierId(singlePurchase?.data?.supplier?._id);
      setNote(singlePurchase?.data?.note);
    }
  }, [singlePurchase]);

  if (isLoading) return <DPLoading />;

  const columns = [
    {
      field: "productImg",
      headerName: "Products",
      width: 90,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <img
              src={row.productImg}
              alt="laptop"
              className="w-14 h-8 object-contain"
            />
          </Box>
        );
      },
    },
    {
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.productName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "Purchase Price",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.price}</Typography>
          </Box>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.quantity}</Typography>
          </Box>
        );
      },
    },
  ];

  const rows = productData.map((data) => {
    return {
      id: data._id,
      productName: data.name,
      productImg: data.img,
      quantity: data.soldQuantity,
      price: data.pricingAndStock.price,
    };
  });

  return (
    <Box>
      <DPModal
        title="Add purchases"
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
        <Stack
          direction={"column"}
          gap={3}
          sx={{
            width: "800px",
          }}
        >
          <Stack direction={"row"} gap={2}>
            <FormControl fullWidth>
              <InputLabel>Supplier</InputLabel>
              <Select
                value={supplierId}
                label="Sort by date"
                onChange={(e) => setSupplierId(e.target.value)}
              >
                {supplierData?.data?.result.map((supplier) => (
                  <MenuItem key={supplier._id} value={supplier._id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <TextField
            label="Note"
            onChange={(e) => setNote(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />

          <Box
            sx={{
              mb: 2,
            }}
          ></Box>

          {/* Sale table */}
          <Box
            sx={{
              borderBottom: "1px solid lightgray",
            }}
          >
            <DataGrid
              sx={{
                border: 0,
                borderTop: "1px solid lightgray",
              }}
              rows={rows}
              columns={columns}
              hideFooter
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Stack
              sx={{
                width: "200px",
                color: "black",
                border: "1px solid lightgray",
                borderRadius: 2,
                p: "5px 10px",
                gap: 1,
              }}
            >
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="p">Total</Typography>
                <Typography variant="p">
                  ${singlePurchase?.data?.amount}
                </Typography>
              </Stack>

              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="p">Paid</Typography>
                <Typography variant="p">
                  ${singlePurchase?.data?.paid}
                </Typography>
              </Stack>

              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="p">Due</Typography>
                <Typography variant="p" color="red">
                  ${singlePurchase?.data?.due}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Box
          sx={{
            mt: 2,
          }}
        >
          <Elements stripe={stripePromise}>
            <PurchaseDueForm
              setOpen={setOpen}
              note={note}
              supplierId={supplierId}
              id={id}
            />
          </Elements>
        </Box>
      </DPModal>
    </Box>
  );
};

export default EditPurchaseModal;
