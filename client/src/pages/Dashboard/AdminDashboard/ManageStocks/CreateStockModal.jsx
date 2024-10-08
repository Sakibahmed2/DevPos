/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";

const defaultValues = {
  name: "",
  description: "",
  duration: "",
  status: "",
};

const CreateStockModal = ({ open, setOpen }) => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add stock">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput
              name={"name"}
              label={"Product name"}
              fullWidth
              size="medium"
            />

            <Stack direction={"row"} gap={2}>
              <DPSelect
                name={"warehouse"}
                label={"Warehouse"}
                items={["Warehouse 1", "Warehouse 2"]}
                fullWidth
                size="medium"
              />
              <DPSelect
                name={"shop"}
                label={"Shop"}
                items={["Shop 1", "Shop 2"]}
                fullWidth
                size="medium"
              />
            </Stack>

            <DPSelect
              name={"person"}
              label={"Responsible person"}
              items={["Person 1", "Person 2"]}
              fullWidth
              size="medium"
            />

            {/* Status toggle */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography component={"p"}>Status</Typography>
              <Switch defaultChecked size="medium" />
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
            <Button type="submit">Add stock</Button>
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

export default CreateStockModal;
