/* eslint-disable react/prop-types */
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import DPLoading from "../../../../components/ui/DPLoading";
import {
  useGetSingleQuotationQuery,
  useUpdateQuotationMutation,
} from "../../../../redux/api/admin/quotationApi";
import { toast } from "sonner";

const EditQuotationModal = ({ open, setOpen, id }) => {
  const { data: singleQuotation, isLoading } = useGetSingleQuotationQuery(id);
  const [updateQuotation] = useUpdateQuotationMutation();

  const [tax, setTax] = useState(singleQuotation?.data?.tax || 0);
  const [discount, setDiscount] = useState(
    singleQuotation?.data?.discount || 0
  );
  const [shipping, setShipping] = useState(
    singleQuotation?.data?.shipping || 0
  );

  useEffect(() => {
    if (singleQuotation) {
      setTax(singleQuotation.data.tax || 0);
      setDiscount(singleQuotation.data.discount || 0);
      setShipping(singleQuotation.data.shipping || 0);
    }
  }, [singleQuotation]);

  if (isLoading) return <DPLoading />;

  const defaultValues = {
    customerName: singleQuotation?.data?.customerName,
    status: singleQuotation?.data?.status,
    note: singleQuotation?.data?.note,
    tax: singleQuotation?.data?.tax,
  };

  console.log({ tax, discount, shipping });

  console.log(singleQuotation);
  const totalPrice = singleQuotation?.data?.products.reduce(
    (total, product) => {
      return total + product.pricingAndStock.price;
    },
    0
  );

  const taxAmount = parseFloat((tax * totalPrice) / 100);
  const discountAmount = parseFloat((discount * totalPrice) / 100);
  const shippingCost = Number(shipping);

  const total = totalPrice + taxAmount + shippingCost - discountAmount;

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating quotation...");

    try {
      const updatedData = {
        customerName: data.customerName,
        tax: Number(tax),
        discount: Number(discount),
        shipping: Number(shipping),
        status: data.status,
        note: data.note,
        total: Number(total),
      };

      const res = await updateQuotation({ id, data: updatedData }).unwrap();

      if (res?.success) {
        toast.success("Quotation updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update quotation", { id: toastId });
    }
  };

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
  ];

  const rows = singleQuotation?.data?.products.map((data) => {
    return {
      id: data._id,
      productName: data.name,
      productImg: data.img,
      quantity: data.pricingAndStock.quantity,
      price: data.pricingAndStock.price,
      discount: data.pricingAndStock.discountValue,
    };
  });

  return (
    <Box>
      <DPModal
        title="Edit quotation"
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
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "800px",
            }}
          >
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
                    <Typography variant="p">
                      Total: ${total.toFixed(2)}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="h6">
                  Grand total: ${total.toFixed(2)}
                </Typography>
              </Stack>
            </Box>

            <Stack direction={"row"} gap={2}>
              <DPInput name={"customerName"} label={"Customer"} />
            </Stack>

            <Stack direction={"row"} gap={2}>
              <TextField
                label="Tax in (%)"
                onChange={(e) => setTax(e.target.value)}
                fullWidth
              />

              <TextField
                label="Discount in (%)"
                onChange={(e) => setDiscount(e.target.value)}
                fullWidth
              />
            </Stack>

            <Stack direction={"row"} gap={2}>
              <TextField
                label="Shipping charge"
                onChange={(e) => setShipping(e.target.value)}
                fullWidth
              />
              <DPSelect
                name={"status"}
                label={"Status"}
                items={["Pending", "Sent", "Ordered"]}
              />
            </Stack>

            <DPInput name={"note"} label={"Note"} multiline rows={4} />
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: 5,
            }}
          >
            <Button type="submit">Submit</Button>
            <Button
              sx={{
                backgroundColor: "black",
              }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </DPForm>
      </DPModal>
    </Box>
  );
};

export default EditQuotationModal;
