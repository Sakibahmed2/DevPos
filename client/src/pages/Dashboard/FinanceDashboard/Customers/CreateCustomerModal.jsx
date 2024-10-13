/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";

const defaultValues = {
  customerName: "",
  email: "",
  phone: "",
  country: "",
  description: "",
};

const CreateCustomerModal = ({ open, setOpen }) => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add customer">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <Stack direction={"row"} gap={3}>
              <DPInput name={"customerName"} label={"Customer name"} />
              <DPInput name={"email"} label={"Email"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name={"phone"} label={"Phone"} />
              <DPSelect
                name={"email"}
                label={"Email"}
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

export default CreateCustomerModal;
