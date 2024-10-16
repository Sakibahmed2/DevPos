/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import DPFileUploader from "../../../../components/form/DPFileUploader";

const defaultValues = {
  name: "",
  img: "",
  phone: "",
  email: "",
  role: "",
  description: "",
};

const CreateUserModal = ({ open, setOpen }) => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add user">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <Box>
              <DPFileUploader name={"img"} label={"User img"} />
            </Box>
            <Stack direction={"row"} gap={3}>
              <DPInput name={"name"} label={"User name"} />
              <DPInput name={"phone"} label={"Phone"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name={"email"} label={"Email"} />
              <DPSelect
                name={"role"}
                label={"Role"}
                items={["Finance", "Sales", "Marketing"]}
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

export default CreateUserModal;
