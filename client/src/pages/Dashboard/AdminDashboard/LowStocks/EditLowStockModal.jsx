/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";

const defaultValues = {
  productName: "",
};

const EditLowStockModal = ({ open, setOpen, id = "" }) => {
  console.log(id);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit low stocks">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
              overflow: "hidden",
            }}
          >
            <DPInput
              name={"productName"}
              label={"Product"}
              fullWidth
              size="medium"
            />
            <DPInput
              name={"warehouse"}
              label={"Warehouse"}
              fullWidth
              size="medium"
            />
            <DPInput
              name={"category"}
              label={"Category"}
              fullWidth
              size="medium"
            />
            <DPInput
              name={"stockKeepingUnit"}
              label={"SKU"}
              fullWidth
              size="medium"
            />
            <DPInput name={"quantity"} label={"Qty"} fullWidth size="medium" />
            <DPInput
              name={"quantityAlert"}
              label={"Qty alert"}
              fullWidth
              size="medium"
            />

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
            <Button>Save</Button>
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

export default EditLowStockModal;
