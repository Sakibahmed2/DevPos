/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { useGetAllProductsQuery } from "../../../../redux/api/admin/productApi";
import { useGetAllWarehousesQuery } from "../../../../redux/api/finance/warehouseApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";
import DPSelect from "../../../../components/form/DPSelect";
import {
  useGetSingleStockTransferQuery,
  useUpdateStockTransferMutation,
} from "../../../../redux/api/admin/stockTransferApi";
import { toast } from "sonner";

const EditStockTransferModal = ({ open, setOpen, id }) => {
  const { data: warehouseData, isLoading: warehouseLoading } =
    useGetAllWarehousesQuery({});
  const { data: productData, isLoading: productLoading } =
    useGetAllProductsQuery({});
  const { data: stockTransferData, isLoading: stockTransferLoading } =
    useGetSingleStockTransferQuery(id);
  const [updateStockTransfer] = useUpdateStockTransferMutation();

  if (warehouseLoading || productLoading || stockTransferLoading)
    return <DPLoading />;

  console.log(stockTransferData);

  const defaultValues = {
    product: stockTransferData?.data?.product,
    from: stockTransferData?.data?.from,
    to: stockTransferData?.data?.to,
    noOfProduct: stockTransferData?.data?.noOfProduct,
    quantityTransferred: stockTransferData?.data?.quantityTransferred,
    note: stockTransferData?.data?.note,
  };

  const warehouseDataForSelect = convertDataForSelect(
    warehouseData?.data?.result
  );
  const productDataForSelect = convertDataForSelect(productData?.data?.result);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating stock transfer...");
    try {
      const res = await updateStockTransfer({
        stockTransferId: id,
        stockTransferData: data,
      }).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update stock transfer", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit stock transfer">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPSelect
              name={"product"}
              label={"Product"}
              items={productDataForSelect}
            />

            <Stack direction={"row"} gap={2}>
              <DPSelect
                name={"from"}
                label={"Warehouse from"}
                items={warehouseDataForSelect}
              />
              <DPSelect
                name={"to"}
                label={"Warehouse to"}
                items={warehouseDataForSelect}
              />
            </Stack>

            <Stack direction={"row"} gap={2}>
              <DPInput name={"noOfProduct"} label={"No of product"} />

              <DPInput
                name={"quantityTransferred"}
                label={"Quantity transferred"}
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
            <Button type="submit">Save</Button>
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

export default EditStockTransferModal;
