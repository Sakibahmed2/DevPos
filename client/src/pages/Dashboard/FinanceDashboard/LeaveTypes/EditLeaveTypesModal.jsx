/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import {
  useGetSingleLeaveTypesQuery,
  useUpdateLeaveTypesMutation,
} from "../../../../redux/api/finance/leaveTypesApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { toast } from "sonner";

const EditLeaveTypesModal = ({ open, setOpen, id }) => {
  const [toggleStatus, setToggleStatus] = useState("Active");
  const { data: singleLeaveType, isLoading } = useGetSingleLeaveTypesQuery(id);
  const [updateLeaveType] = useUpdateLeaveTypesMutation();

  if (isLoading) return <DPLoading />;

  const handleToggle = (event) => {
    setToggleStatus(event.target.checked ? "Active" : "Inactive");
  };

  const defaultValues = {
    name: singleLeaveType?.data?.name,
    quote: singleLeaveType?.data?.quote,
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating leave type...");
    try {
      const leaveType = {
        name: data.name,
        quote: data.quote,
        status: toggleStatus,
      };

      const res = await updateLeaveType({
        id: id,
        data: leaveType,
      }).unwrap();
      if (res?.success) {
        toast.success("Leave type updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update leave type", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit leave type">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"name"} label={"Name"} />
            <DPInput name={"quote"} label={"Leave quote"} />

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

export default EditLeaveTypesModal;
