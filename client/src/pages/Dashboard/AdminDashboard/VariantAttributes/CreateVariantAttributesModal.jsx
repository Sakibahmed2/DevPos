/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";

const defaultValues = {
  variants: "",
  value: "",
  status: "",
};

const CreateVariantAttributesModal = ({ open, setOpen }) => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add attributes">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput
              name={"variants"}
              label={"Variant name"}
              fullWidth
              size="medium"
            />
            <DPInput name={"value"} label={"Value"} fullWidth size="medium" />

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
            <Button type="submit">Add variant attributes</Button>
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

export default CreateVariantAttributesModal;
