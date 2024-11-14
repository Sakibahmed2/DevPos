/* eslint-disable react/prop-types */
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "sonner";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import DPLoading from "../../../../components/ui/DPLoading";
import {
  useGetSinglePurchaseReturnQuery,
  useUpdatePurchaseReturnMutation,
} from "../../../../redux/api/admin/purchaseReturnApi";

const EditPurchaseReturnModal = ({ open, setOpen, id }) => {
  const { data: singlePurchaseReturn, isLoading } =
    useGetSinglePurchaseReturnQuery(id);
  const [updatePurchaseReturn] = useUpdatePurchaseReturnMutation();

  if (isLoading) return <DPLoading />;

  const productsData = singlePurchaseReturn?.data.products.map((product) => ({
    ...product,
    supplierName: singlePurchaseReturn?.data?.supplierName,
    status: singlePurchaseReturn?.data?.status,
    paymentTypeStatus: singlePurchaseReturn?.data?.paymentTypeStatus,
    refNo: singlePurchaseReturn?.data?.refNo,
  }));

  const defaultValues = {
    supplierName: singlePurchaseReturn?.data.supplierName,
    status: singlePurchaseReturn?.data.status,
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Processing purchase return...");

    try {
      const purchaseReturnData = {
        supplierName: data.supplierName,
        status: data.status,
      };

      const res = await updatePurchaseReturn({
        id: id,
        data: purchaseReturnData,
      }).unwrap();

      if (res?.success) {
        toast.success("Purchase return updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update purchase return", { id: toastId });
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
  ];

  const rows = productsData?.map((data) => {
    const compositeKey = `${data._id}_${Math.random()}`;
    return {
      id: data._id,
      customerName: data.supplierName,
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
                // onChange={(e) => setSearchTerm(e.target.value)}
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

export default EditPurchaseReturnModal;
