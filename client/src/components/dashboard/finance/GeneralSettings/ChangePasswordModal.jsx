/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../form/DPForm";
import DPInput from "../../../form/DPInput";
import DPModal from "../../../modal/DPModal";
import { getUserInfo } from "../../../../utils/getUserInfo";
import {
  useGetSingleUsersQuery,
  useUpdateUserMutation,
} from "../../../../redux/api/auth/authApi";
import DPLoading from "../../../ui/DPLoading";
import { toast } from "sonner";

const ChangePasswordModal = ({ open, setOpen }) => {
  const userInfo = getUserInfo();

  const { data: singleUser, isLoading } = useGetSingleUsersQuery(userInfo?.id);
  const [updateUser] = useUpdateUserMutation();

  if (isLoading) return <DPLoading />;

  const defaultValues = {
    password: singleUser?.data?.password,
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Changing password...");

    try {
      const res = await updateUser({
        id: userInfo?.id,
        data: data,
      }).unwrap();

      if (res?.success) {
        toast.success("Password changed successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to change password", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Change password">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"password"} label={"Password"} />
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: 5,
            }}
          >
            <Button type="submit">Change</Button>
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

export default ChangePasswordModal;
