/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { toast } from "sonner";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import DPLoading from "../../../../components/ui/DPLoading";
import {
  useGetSingleWarehousesQuery,
  useUpdateWarehousesMutation,
} from "../../../../redux/api/finance/warehouseApi";

const EditWarehouseModal = ({ open, setOpen, id }) => {
  const [toggleStatus, setToggleStatus] = useState("Active");
  const options = useMemo(() => countryList().getData(), []);
  const [value, setValue] = useState("");
  const { data: singleWarehouse, isLoading } = useGetSingleWarehousesQuery(id);
  const [updateWarehouse] = useUpdateWarehousesMutation();

  if (isLoading) return <DPLoading />;

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating warehouse...");
    try {
      const updateData = {
        name: data.name,
        contactPerson: data.contactPerson,
        phone: data.phone,
        stock: data.stock,
        quantity: data.quantity,
        status: toggleStatus,
        country: !value.label ? singleWarehouse.data.country : value.label,
        email: data.email,
      };

      console.log(updateData);

      const res = await updateWarehouse({
        warehouseId: id,
        warehouseData: updateData,
      }).unwrap();

      if (res.success) {
        toast.success("Warehouse updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update warehouse", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal
        open={open}
        setOpen={setOpen}
        title="Edit warehouse"
        maxWidth="lg"
      >
        <DPForm onSubmit={onSubmit} defaultValue={singleWarehouse?.data}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "700px",
            }}
          >
            <Stack direction={"row"} gap={3}>
              <DPInput name={"name"} label={"Warehouse name"} />
              <DPInput name={"contactPerson"} label={"Contact person name"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name={"phone"} label={"Phone"} />
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden 0",
                  zIndex: 99,
                }}
              >
                <Select
                  options={options}
                  value={value}
                  onChange={(e) => setValue(e)}
                  styles={{
                    control: (base) => ({
                      ...base,
                      padding: "9px 0",
                      borderRadius: "8px",
                    }),
                  }}
                />
              </Box>
              <DPInput name={"email"} label={"Email"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name={"stock"} label={"Stock"} type="number" />
              <DPInput name={"quantity"} label={"QTY"} type="number" />
            </Stack>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography component={"p"}>Status</Typography>
              <Switch
                checked={toggleStatus === "Active"}
                onChange={() =>
                  setToggleStatus((prev) =>
                    prev === "Active" ? "Inactive" : "Active"
                  )
                }
                size="medium"
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

export default EditWarehouseModal;
