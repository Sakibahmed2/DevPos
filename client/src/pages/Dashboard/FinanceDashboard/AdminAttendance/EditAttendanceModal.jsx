/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPTimePicker from "../../../../components/form/DPTimePicker";
import DPModal from "../../../../components/modal/DPModal";

const defaultValues = {
  empName: "",
  checkIn: "",
  checkOut: "",
};

const EditAttendanceModal = ({ open, setOpen, id }) => {
  console.log(id);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit attendance">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"empName"} label={"Employee name"} />

            <Stack direction={"row"} gap={3}>
              <DPTimePicker name={"checkIn"} label={"Check in"} />
              <DPTimePicker name={"checkIn"} label={"Check out"} />
            </Stack>
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

export default EditAttendanceModal;
