/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { useCreateLeaveTypesMutation } from "../../../../redux/api/finance/leaveTypesApi";
import { toast } from "sonner";

const defaultValues = {
  name: "",
  quote: "",
  status: "",
};

const CreateLeaveTypesModal = ({ open, setOpen }) => {
  const [toggleStatus, setToggleStatus] = useState("Active");
  const [createLeaveType] = useCreateLeaveTypesMutation();

  const handleToggle = (event) => {
    setToggleStatus(event.target.checked ? "Active" : "Inactive");
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating leave type...");
    try {
      const leaveType = {
        name: data.name,
        quote: data.quote,
        status: toggleStatus,
      };

      const res = await createLeaveType(leaveType).unwrap();
      if (res) {
        toast.success("Leave type created successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create leave type", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add new leave type">
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

export default CreateLeaveTypesModal;
