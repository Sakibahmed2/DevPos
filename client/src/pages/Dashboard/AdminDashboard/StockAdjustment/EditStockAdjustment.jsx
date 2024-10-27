/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import { toast } from "sonner";
import DPForm from "../../../../components/form/DPForm";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import DPLoading from "../../../../components/ui/DPLoading";
import {
  useGetSingleManageStockQuery,
  useUpdateManageStockMutation,
} from "../../../../redux/api/admin/manageStockApi";
import { useGetAllProductsQuery } from "../../../../redux/api/admin/productApi";
import { useGetAllStoresQuery } from "../../../../redux/api/finance/storeApi";
import { useGetAllWarehousesQuery } from "../../../../redux/api/finance/warehouseApi";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";
import DPInput from "../../../../components/form/DPInput";

const EditStockAdjustment = ({ open, setOpen, id }) => {
  const { data: warehouseData, isLoading: warehouseLoading } =
    useGetAllWarehousesQuery({});
  const { data: storeData, isLoading: storeLoading } = useGetAllStoresQuery({});
  const { data: productData, isLoading: productLoading } =
    useGetAllProductsQuery({});
  const { data: singleStockData, isLoading: singleStockLoading } =
    useGetSingleManageStockQuery(id);
  const [updateMangeStock] = useUpdateManageStockMutation({});

  if (warehouseLoading || storeLoading || productLoading || singleStockLoading)
    return <DPLoading />;

  const defaultValues = {
    product: singleStockData?.data?.product._id,
    warehouse: singleStockData?.data?.warehouse._id,
    shop: singleStockData?.data?.shop._id,
    responsiblePerson: singleStockData?.data?.responsiblePerson,
    note: singleStockData?.data?.note || "",
  };

  const warehouseDataForSelect = convertDataForSelect(
    warehouseData?.data?.result
  );
  const storeDataForSelect = convertDataForSelect(storeData?.data?.result);
  const productDataForSelect = convertDataForSelect(productData?.data?.result);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating stock adjustment...");

    try {
      const stockData = {
        product: data.product,
        warehouse: data.warehouse,
        shop: data.shop,
        responsiblePerson: data.responsiblePerson,
        note: data.note,
      };

      const res = await updateMangeStock({
        manageStockId: id,
        manageStockData: stockData,
      }).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update stock", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit stock adjustment">
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
              label={"Product name"}
              items={productDataForSelect}
            />

            <Stack direction={"row"} gap={2}>
              <DPSelect
                name={"warehouse"}
                label={"Warehouse"}
                items={warehouseDataForSelect}
              />
              <DPSelect
                name={"shop"}
                label={"Shop"}
                items={storeDataForSelect}
              />
            </Stack>

            <DPSelect
              name={"responsiblePerson"}
              label={"Responsible person"}
              items={["Person 1", "Person 2"]}
            />

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
            <Button type="submit">Update stock adjustment</Button>
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

export default EditStockAdjustment;
