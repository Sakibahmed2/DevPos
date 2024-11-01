/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPModal from "../../../../components/modal/DPModal";
import { useState, useEffect } from "react";
import DPInput from "../../../../components/form/DPInput";
import DPTimePicker from "../../../../components/form/DPTimePicker";
import {
  useGetSingleShiftsQuery,
  useUpdateShiftsMutation,
} from "../../../../redux/api/finance/shiftsApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { toast } from "sonner";
import formatTime from "../../../../utils/formateTime";
import dayjs from "dayjs";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const EditShiftModal = ({ open, setOpen, id }) => {
  const [toggleStatus, setToggleStatus] = useState("Active");
  const [selectedDays, setSelectedDays] = useState("");

  const { data: singleShift, isLoading } = useGetSingleShiftsQuery(id);
  const [updateShift] = useUpdateShiftsMutation();

  useEffect(() => {
    if (singleShift) {
      setSelectedDays(singleShift.data.weekOff || "");
      setToggleStatus(singleShift.data.status || "Active");
    }
  }, [singleShift]);

  if (isLoading) return <DPLoading />;

  const defaultValues = {
    name: singleShift?.data?.name,
  };

  const handleToggle = (event) => {
    setToggleStatus(event.target.checked ? "Active" : "Inactive");
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating shift...");

    try {
      const updatedData = {
        name: data.name,
        startTime: data.startTime
          ? formatTime(dayjs(data.startTime))
          : singleShift.data.startTime,
        endTime: data.endTime
          ? formatTime(dayjs(data.endTime))
          : singleShift.data.endTime,
        weekOff: selectedDays,
        status: toggleStatus,
      };

      const res = await updateShift({ id, data: updatedData }).unwrap();

      if (res?.success) {
        toast.success("Shift updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update shift", { id: toastId });
    }
  };

  const toggleDay = (day) => {
    setSelectedDays((prevSelectedDays) => {
      const daysArray = prevSelectedDays ? prevSelectedDays.split(", ") : [];

      if (daysArray.includes(day)) {
        // Remove the day if it's already selected
        return daysArray.filter((d) => d !== day).join(", ");
      } else {
        // Add the day if it's not selected
        return [...daysArray, day].join(", ");
      }
    });
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit shift">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"name"} label={"Shift name"} />

            <Stack direction={"row"} gap={2}>
              <DPTimePicker name={"startTime"} label={"Start time"} />
              <DPTimePicker name={"endTime"} label={"End time"} />
            </Stack>

            {/* Week off toggles */}

            <Box>
              <Typography component={"p"} variant="h6">
                Weekdays
              </Typography>
            </Box>

            <Box>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {daysOfWeek.map((day) => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        checked={selectedDays.split(", ").includes(day)}
                        onChange={() => toggleDay(day)}
                        size="small"
                      />
                    }
                    label={day}
                  />
                ))}
              </Box>
            </Box>

            {/* Status toggle */}
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

export default EditShiftModal;
