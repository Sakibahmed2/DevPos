/* eslint-disable react/prop-types */
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import DPLoading from "../../../../components/ui/DPLoading";
import { useGetAllPurchaseQuery } from "../../../../redux/api/admin/purchaseApi";
import { useCreatePurchaseReturnMutation } from "../../../../redux/api/admin/purchaseReturnApi";
import { toast } from "sonner";

const defaultValues = {
  supplierName: "",
  status: "",
};

const CreatePurchaseReturnModal = ({ open, setOpen }) => {
  const [purchaseReturn, setPurchaseReturn] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: purchaseData, isLoading } = useGetAllPurchaseQuery({
    searchTerm: searchTerm,
  });
  const [createPurchaseReturn] = useCreatePurchaseReturnMutation();

  if (isLoading) return <DPLoading />;

  const productsData = purchaseData?.data?.result.reduce((acc, curr) => {
    const customerName = curr?.supplier?.name;
    const productsWithCustomer = curr?.products?.map((product) => ({
      ...product,
      customerName,
    }));
    return acc.concat(productsWithCustomer);
  }, []);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Processing purchase return...");

    try {
      const purchaseReturnData = {
        supplierName: data.supplierName,
        products: purchaseReturn,
        status: data.status,
      };

      const res = await createPurchaseReturn(purchaseReturnData).unwrap();

      if (res?.success) {
        toast.success("Purchase return created successfully", { id: toastId });
        setPurchaseReturn([]);
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create purchase return", { id: toastId });
    }
  };

  const columns = [
    {
      field: "productImg",
      headerName: "Products",
      width: 100,
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
              className="w-14 h-8  object-contain"
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
      field: "customerName",
      headerName: "Supplier name",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.customerName}</Typography>
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
      field: "id",
      headerName: "Action",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Chip
              onClick={() => setPurchaseReturn((prev) => [...prev, row.id])}
              label="Return"
              sx={{
                backgroundColor: "red",
                color: "white",
                border: 0,
                borderRadius: 2,
                cursor: "pointer",
              }}
            />
          </Box>
        );
      },
    },
  ];

  const rows = productsData.map((data) => {
    const compositeKey = `${data._id}_${Math.random()}`;
    return {
      id: data._id,
      customerName: data.customerName,
      productName: data.name,
      productImg: data.img,
      quantity: data.pricingAndStock.quantity,
      price: data.pricingAndStock.price,
      compositeKey: compositeKey,
    };
  });

  return (
    <Box>
      <DPModal
        title="Add purchase return"
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
            <Stack direction={"row"} gap={2}>
              <DPInput name={"supplierName"} label={"Supplier name"} />
              <DPSelect
                name={"status"}
                label={"Status"}
                items={["Received", "Pending", "Refunded"]}
              />
            </Stack>
            <Stack direction={"row"} gap={2}>
              <TextField
                label="Search here"
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: <img src={searchIcon} />,
                  },
                }}
              />
            </Stack>

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
                getRowId={(row) => row.compositeKey}
              />
            </Box>
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

export default CreatePurchaseReturnModal;
