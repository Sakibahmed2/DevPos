/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import {
  useGetSingleStoresQuery,
  useUpdateStoresMutation,
} from "../../../../redux/api/finance/storeApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { toast } from "sonner";

const EditStoresModal = ({ open, setOpen, id }) => {
  const [toggleStatus, setToggleStatus] = useState("Active");
  const { data: singleStore, isLoading } = useGetSingleStoresQuery(id);
  const [updateStore] = useUpdateStoresMutation();

  if (isLoading) return <DPLoading />;

  const handleToggle = (event) => {
    setToggleStatus(event.target.checked ? "Active" : "Inactive");
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating store...");
    try {
      const updateData = {
        name: data.name,
        ownerName: data.ownerName,
        ownerPhone: data.ownerPhone,
        ownerEmail: data.ownerEmail,
        status: toggleStatus,
      };

      const res = await updateStore({
        storeId: id,
        storeData: updateData,
      }).unwrap();

      if (res?.success) {
        toast.success("Store updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update store", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit store">
        <DPForm onSubmit={onSubmit} defaultValue={singleStore?.data}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <Stack direction={"row"} gap={3}>
              <DPInput name={"name"} label={"Store name"} />
              <DPInput name={"ownerName"} label={"Username"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name={"ownerPhone"} label={"Phone"} />
              <DPInput name={"ownerEmail"} label={"Email"} />
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
                onChange={handleToggle}
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

export default EditStoresModal;
