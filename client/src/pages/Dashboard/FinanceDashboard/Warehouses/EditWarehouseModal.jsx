/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";

const defaultValues = {
  warehouse: "",
  contactPerson: "",
  phone: "",
  stock: "",
  quantity: "",
  status: "",
};

const EditWarehouseModal = ({ open, setOpen, id }) => {
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
      <DPModal
        open={open}
        setOpen={setOpen}
        title="Edit warehouse"
        maxWidth="lg"
      >
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "700px",
            }}
          >
            <Stack direction={"row"} gap={3}>
              <DPInput name={"warehouse"} label={"Warehouse"} />
              <DPInput name={"contactPerson"} label={"Contact person"} />
              <DPInput name={"phone"} label={"Phone"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name={"stock"} label={"Stock"} />
              <DPInput name={"quantity"} label={"QTY"} />
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

export default EditWarehouseModal;