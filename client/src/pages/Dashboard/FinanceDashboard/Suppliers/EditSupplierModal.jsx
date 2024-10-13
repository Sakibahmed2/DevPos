/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import DPFileUploader from "../../../../components/form/DPFileUploader";

const defaultValues = {
  supplierName: "",
  supplierImg: "",
  email: "",
  phone: "",
  country: "",
  description: "",
};

const EditSupplierModal = ({ open, setOpen, id }) => {
  console.log(id);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit supplier">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <Box>
              <DPFileUploader name={"supplierImg"} label={"Supplier img"} />
            </Box>
            <Stack direction={"row"} gap={3}>
              <DPInput name={"supplierName"} label={"Supplier name"} />
              <DPInput name={"email"} label={"Email"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name={"phone"} label={"Phone"} />
              <DPSelect
                name={"country"}
                label={"Country"}
                items={["Bangladesh", "Nepal"]}
              />
            </Stack>

            <DPInput
              name={"description"}
              label={"Description"}
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

export default EditSupplierModal;
