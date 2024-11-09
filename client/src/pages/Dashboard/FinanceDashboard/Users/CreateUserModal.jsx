/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import { useState } from "react";
import { useCreateUserMutation } from "../../../../redux/api/auth/authApi";
import { toast } from "sonner";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";

const defaultValues = {
  name: "",
  img: "",
  phone: "",
  email: "",
  role: "",
  description: "",
  password: "",
};

const CreateUserModal = ({ open, setOpen }) => {
  const [status, setStatus] = useState("Active");
  const [createUser] = useCreateUserMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating user...");
    const base64Img = await convertImgToBase64(data.img);
    try {
      const userData = {
        name: data.name,
        img: base64Img,
        password: data.password,
        phone: data.phone,
        email: data.email,
        role: data.role,
        description: data.description,
        status: status,
      };

      const res = await createUser(userData).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create user", { id: toastId });
    }
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
                items={["finance", "Sales", "Marketing"]}
              />
            </Stack>

            <DPInput name={"password"} label={"Password"} />

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
                checked={status === "Active"}
                size="medium"
                onChange={() =>
                  setStatus((prev) =>
                    prev === "Active" ? "Inactive" : "Active"
                  )
                }
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
            <Button type="submit">Submit</Button>
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
