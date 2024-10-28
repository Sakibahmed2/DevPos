/* eslint-disable react/prop-types */
import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "../../../../components/paymentForm/PaymentForm";
import DPModal from "../../../../components/modal/DPModal";
import { useGetAllProductsQuery } from "../../../../redux/api/admin/productApi";
import { addProduct } from "../../../../redux/features/admin/paymentSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CreateSaleModal = ({ open, setOpen }) => {
  const [orderTax, setOrderTax] = useState("");
  const [discount, setDiscount] = useState("");
  const [shipping, setShipping] = useState("");
  const [note, setNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: tableData } = useGetAllProductsQuery({
    searchTerm: searchTerm,
  });
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.products.product);

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
      field: "discount",
      headerName: "Discount",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.discount}</Typography>
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
      discount: data.pricingAndStock.discountValue,
      unitCost:
        data.pricingAndStock.price - data.pricingAndStock.discountValue || 0,
      totalCost:
        data.pricingAndStock.price - data.pricingAndStock.discountValue,
    };
  });

  return (
    <Box>
      <DPModal
        title="Create sale"
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
            <TextField
              label="Order tax in (%)"
              onChange={(e) => setOrderTax(e.target.value)}
              fullWidth
            />
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
        </Stack>

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

        {/* Payment form */}

        <Box>
          <Elements stripe={stripePromise}>
            <PaymentForm
              setOpen={setOpen}
              note={note}
              totalPrice={totalPrice}
            />
          </Elements>
        </Box>
      </DPModal>
    </Box>
  );
};

export default CreateSaleModal;
