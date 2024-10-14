/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPModal from "../../../../components/modal/DPModal";
import { useState } from "react";
import DPInput from "../../../../components/form/DPInput";
import DPTimePicker from "../../../../components/form/DPTimePicker";

const defaultValues = {
  shiftName: "",
  startTime: "",
  endTime: "",
  weekOff: "",
};

const EditShiftModal = ({ open, setOpen, id }) => {
  console.log(id);

  const [toggleStatus, setToggleStatus] = useState("Active");

  const handleToggle = (event) => {
    setToggleStatus(event.target.checked ? "Active" : "Inactive");
  };

  const onSubmit = (data) => {
    data.status = toggleStatus;
    console.log(data);
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
            <DPInput name={"shiftName"} label={"Shift name"} />

            <Stack direction={"row"} gap={2}>
              <DPTimePicker name={"startTime"} label={"Start time"} />
              <DPTimePicker name={"endTime"} label={"End time"} />
            </Stack>

            <DPInput name={"weekOff"} label={"Week of"} />

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
