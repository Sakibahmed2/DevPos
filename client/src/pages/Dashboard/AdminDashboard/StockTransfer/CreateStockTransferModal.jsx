/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";

const defaultValues = {
  product: "",
  from: "",
  to: "",
  responsiblePerson: "",
  note: "",
};

const CreateStockTransferModal = ({ open, setOpen }) => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Create stock transfer">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput
              name={"product"}
              label={"Product"}
              fullWidth
              size="medium"
            />

            <Stack direction={"row"} gap={2}>
              <DPInput
                name={"from"}
                label={"Warehouse from"}
                fullWidth
                size="medium"
              />
              <DPInput
                name={"to"}
                label={"Warehouse to"}
                fullWidth
                size="medium"
              />
            </Stack>

            <DPInput
              name={"note"}
              label={"Note"}
              fullWidth
              size="medium"
              multiline
              rows={4}
            />
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

export default CreateStockTransferModal;
