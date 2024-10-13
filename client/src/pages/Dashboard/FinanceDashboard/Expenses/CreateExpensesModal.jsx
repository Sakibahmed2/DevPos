/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import { useState } from "react";

const defaultValues = {
  categoryName: "",
  date: "",
  amount: "",
  reference: "",
  expenseFor: "",
  description: "",
  status: "",
};

const CreateExpanseModal = ({ open, setOpen }) => {
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
      <DPModal open={open} setOpen={setOpen} title="Add expenses">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <Stack direction={"row"} gap={3}>
              <DPInput name={"categoryName"} label={"Expenses category"} />
              <DPDatePicker name={"date"} label={"Date"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name={"amount"} label={"Amount"} />
              <DPInput name={"reference"} label={"Reference"} />
            </Stack>

            <DPInput name={"expenseFor"} label={"Expanse for"} />

            <DPInput
              name={"description"}
              label={"Description"}
              multiline
              rows={4}
            />

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

export default CreateExpanseModal;
