/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import {
  useGetSingleHolidaysQuery,
  useUpdateHolidaysMutation,
} from "../../../../redux/api/finance/holidaysApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { toast } from "sonner";

const EditHolidayModal = ({ open, setOpen, id }) => {
  const [toggleStatus, setToggleStatus] = useState("Active");

  const { data: singleHoliday, isLoading } = useGetSingleHolidaysQuery(id);
  const [updateHoliday] = useUpdateHolidaysMutation();

  if (isLoading) return <DPLoading />;

  const defaultValues = {
    name: singleHoliday?.data?.name,
    startDate: null,
    endDate: null,
  };

  const handleToggle = (event) => {
    setToggleStatus(event.target.checked ? "Active" : "Inactive");
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating holiday...");
    try {
      const updatedData = {
        name: data.name,
        startDate: data.startDate
          ? data.startDate.toISOString()
          : singleHoliday.data.startDate,
        endDate: data.endDate
          ? data.endDate.toISOString()
          : singleHoliday.data.endDate,
        status: toggleStatus,
      };

      const res = await updateHoliday({ id, data: updatedData }).unwrap();

      if (res?.success) {
        toast.success("Holiday updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update holiday", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit holiday">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"name"} label={"Name"} />

            <Stack direction={"row"} gap={2}>
              <DPDatePicker name={"startDate"} label={"Start date"} />
              <DPDatePicker name={"endDate"} label={"End date"} />
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

export default EditHolidayModal;
