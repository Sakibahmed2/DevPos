/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import DPModal from "../../../../components/modal/DPModal";
import { useGetAllProductsQuery } from "../../../../redux/api/admin/productApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../../redux/features/admin/paymentSlice";
import { useGetAllSuppliersQuery } from "../../../../redux/api/finance/suppliersApi";
import PurchasePaymentForm from "../../../../components/paymentForm/PurchasePaymentForm/PurchasePaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CreatePurchasesModal = ({ open, setOpen }) => {
  const [supplierId, setSupplierId] = useState("");
  const [orderTax, setOrderTax] = useState("");
  const [discount, setDiscount] = useState("");
  const [shipping, setShipping] = useState("");
  const [note, setNote] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const { data: tableData, isLoading } = useGetAllProductsQuery({
    searchTerm: searchTerm,
  });
  const { data: supplierData } = useGetAllSuppliersQuery({});
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.products.product);

  if (isLoading) return <DPLoading />;

  const allPrice = selectedProduct.reduce((total, product) => {
    return total + product.price;
  }, 0);

  const taxAmount = (Number(orderTax) * allPrice) / 100;
  const discountAmount = (Number(discount) * allPrice) / 100;
  const shippingCost = Number(shipping);

  const totalPrice = allPrice + taxAmount + shippingCost - discountAmount;

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
      field: "quantity",
      headerName: "QTY",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.quantity}</Typography>
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
      field: "unitCost",
      headerName: "Unit cost",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.unitCost}</Typography>
          </Box>
        );
      },
    },
    {
      field: "totalCost",
      headerName: "Total cost",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.totalCost}</Typography>
          </Box>
        );
      },
    },
    {
      field: "id",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Chip
              onClick={() => dispatch(addProduct(row))}
              label="Add"
              variant="outlined"
              component={Button}
              sx={{
                color: "primary.main",
                borderColor: "primary.main",
                borderRadius: 1,
                cursor: "pointer",
              }}
            ></Chip>
          </Box>
        );
      },
    },
  ];

  const rows = tableData?.data?.result.map((data) => {
    return {
      id: data._id,
      productName: data.name,
      productImg: data.img,
      quantity: data.pricingAndStock.quantity,
      price: data.pricingAndStock.price,
      unitCost:
        data.pricingAndStock.price - data.pricingAndStock.discountValue || 0,
      totalCost:
        data.pricingAndStock.price - data.pricingAndStock.discountValue,
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

            <TextField
              label="Order tax in (%)"
              onChange={(e) => setOrderTax(e.target.value)}
              fullWidth
            />
          </Stack>

          <Stack direction={"row"} gap={2}>
            <TextField
              label="Discount in (%)"
              onChange={(e) => setDiscount(e.target.value)}
              fullWidth
            />

            <TextField
              label="Shipping charge"
              onChange={(e) => setShipping(e.target.value)}
              fullWidth
            />
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
              mt: 5,
              mb: 2,
            }}
          >
            <TextField
              label="Search here"
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
          </Box>

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
                width: "300px",
                color: "black",
                border: "1px solid lightgray",
                borderRadius: 2,
                p: "5px 10px",
                gap: 1,
              }}
            >
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack>
                  <Typography variant="p">
                    Tax: ${taxAmount.toFixed(2)}
                  </Typography>
                  <Typography variant="p">
                    Discount: ${discountAmount.toFixed(2)}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="p">Shipping: ${shipping}</Typography>
                  <Typography variant="p">Total: ${allPrice}</Typography>
                </Stack>
              </Stack>
              <Typography variant="h6">
                Grand total: ${totalPrice.toFixed(2)}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Box>
          <Elements stripe={stripePromise}>
            <PurchasePaymentForm
              setOpen={setOpen}
              note={note}
              totalPrice={totalPrice}
              supplierId={supplierId}
            />
          </Elements>
        </Box>
      </DPModal>
    </Box>
  );
};

export default CreatePurchasesModal;
