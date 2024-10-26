/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import { toast } from "sonner";
import DPForm from "../../../../components/form/DPForm";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import DPLoading from "../../../../components/ui/DPLoading";
import { useCreateManageStockMutation } from "../../../../redux/api/admin/manageStockApi";
import { useGetAllProductsQuery } from "../../../../redux/api/admin/productApi";
import { useGetAllStoresQuery } from "../../../../redux/api/finance/storeApi";
import { useGetAllWarehousesQuery } from "../../../../redux/api/finance/warehouseApi";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";

const defaultValues = {
  product: "",
  warehouse: "",
  shop: "",
  responsiblePerson: "",
};

const CreateStockModal = ({ open, setOpen }) => {
  const { data: warehouseData, isLoading: warehouseLoading } =
    useGetAllWarehousesQuery({});
  const { data: storeData, isLoading: storeLoading } = useGetAllStoresQuery({});
  const { data: productData, isLoading: productLoading } =
    useGetAllProductsQuery({});
  const [createMangeStock] = useCreateManageStockMutation();

  if (warehouseLoading || storeLoading || productLoading) return <DPLoading />;

  const warehouseDataForSelect = convertDataForSelect(
    warehouseData?.data?.result
  );
  const storeDataForSelect = convertDataForSelect(storeData?.data?.result);
  const productDataForSelect = convertDataForSelect(productData?.data?.result);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating stock...");

    try {
      const stockData = {
        product: data.product,
        warehouse: data.warehouse,
        shop: data.shop,
        responsiblePerson: data.responsiblePerson,
      };

      const res = await createMangeStock(stockData).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create stock", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add stock">
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
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: 5,
            }}
          >
            <Button type="submit">Add stock</Button>
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

export default CreateStockModal;
