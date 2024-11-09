/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import {
  useGetSingleUsersQuery,
  useUpdateUserMutation,
} from "../../../../redux/api/auth/authApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { useState } from "react";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";
import { toast } from "sonner";
import { useGetAllRolesQuery } from "../../../../redux/api/finance/roleApi";

const EditUserModal = ({ open, setOpen, id }) => {
  const [status, setStatus] = useState("Active");
  const { data: singleUser, isLoading } = useGetSingleUsersQuery(id);
  const [updateUser] = useUpdateUserMutation();
  const { data: roleData, isLoading: roleLoading } = useGetAllRolesQuery({});

  if (isLoading || roleLoading) return <DPLoading />;
  const roleForSelect = roleData?.data?.result.map((item) => item.name);

  const defaultValues = {
    name: singleUser?.data?.name,
    img: singleUser?.data?.img,
    phone: singleUser?.data?.phone,
    email: singleUser?.data?.email,
    role: singleUser?.data?.role,
    description: singleUser?.data?.description,
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating user...");
    let base64Img = singleUser?.data?.img;

    if (data.img instanceof Blob) {
      base64Img = await convertImgToBase64(data.img);
    }
    try {
      const userData = {
        name: data.name,
        img: base64Img,
        phone: data.phone,
        email: data.email,
        role: data.role,
        description: data.description,
        status: status,
      };

      const res = await updateUser({ id: id, data: userData }).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update user", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit user">
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
              <DPSelect name={"role"} label={"Role"} items={roleForSelect} />
            </Stack>

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

export default EditUserModal;
