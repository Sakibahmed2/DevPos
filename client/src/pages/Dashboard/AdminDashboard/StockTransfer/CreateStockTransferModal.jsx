/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { useGetAllWarehousesQuery } from "../../../../redux/api/finance/warehouseApi";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";
import DPSelect from "../../../../components/form/DPSelect";
import DPLoading from "../../../../components/ui/DPLoading";
import { useGetAllProductsQuery } from "../../../../redux/api/admin/productApi";
import { useCreateStockTransferMutation } from "../../../../redux/api/admin/stockTransferApi";
import { toast } from "sonner";

const defaultValues = {
  from: "",
  to: "",
  product: "",
  noOfProduct: "",
  quantityTransferred: "",
  note: "",
};

const CreateStockTransferModal = ({ open, setOpen }) => {
  const { data: warehouseData, isLoading: warehouseLoading } =
    useGetAllWarehousesQuery({});
  const { data: productData, isLoading: productLoading } =
    useGetAllProductsQuery({});
  const [createStockTransfer] = useCreateStockTransferMutation();

  if (warehouseLoading || productLoading) return <DPLoading />;

  const warehouseDataForSelect = convertDataForSelect(
    warehouseData?.data?.result
  );
  const productDataForSelect = convertDataForSelect(productData?.data?.result);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating stock transfer...");

    try {
      const res = await createStockTransfer(data).unwrap();

      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Create stock transfer">
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

export default CreateStockTransferModal;
