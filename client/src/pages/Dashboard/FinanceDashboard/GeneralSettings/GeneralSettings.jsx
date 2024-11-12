import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import { toast } from "sonner";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";
import {
  useGetSingleUsersQuery,
  useUpdateUserMutation,
} from "../../../../redux/api/auth/authApi";
import { getUserInfo } from "../../../../utils/getUserInfo";
import DPLoading from "../../../../components/ui/DPLoading";

const GeneralSettings = () => {
  const userInfo = getUserInfo();

  const { data: singleUser, isLoading } = useGetSingleUsersQuery(userInfo?.id);
  const [updateProfile] = useUpdateUserMutation();

  if (isLoading) return <DPLoading />;

  const defaultValue = {
    img: singleUser?.data?.img || null,
    firstName: singleUser?.data?.firstName || "",
    lastName: singleUser?.data?.lastName || "",
    username: singleUser?.data?.username || "",
    phone: singleUser?.data?.phone || "",
    email: singleUser?.data?.email || "",
    address: {
      country: singleUser?.data?.address?.country || "",
      state: singleUser?.data?.address?.state || "",
      city: singleUser?.data?.address?.city || "",
      postalCode: singleUser?.data?.address?.postalCode || "",
    },
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating profile information...");

    let base64Img = singleUser?.data?.img;

    if (data.img instanceof Blob) {
      base64Img = await convertImgToBase64(data.img);
    }
    try {
      const userData = {
        img: base64Img,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        phone: data.phone,
        email: data.email,
        address: {
          country: data.address.country,
          state: data.address.state,
          city: data.address.city,
          postalCode: data.address.postalCode,
        },
      };

      const res = await updateProfile({
        id: userInfo?.id,
        data: userData,
      }).unwrap();

      if (res?.success) {
        toast.success("Profile information updated successfully", {
          id: toastId,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile information", { id: toastId });
    }
  };

  return (
    <Container>
      {/* Employee setting */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <img src={employeeIcon} alt="" />
          <Typography variant="h6" fontWeight={500}>
            Profile information
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 2,
          }}
        >
          <DPForm onSubmit={onSubmit} defaultValue={defaultValue}>
            <Stack direction={"column"} gap={3}>
              <Stack direction={"row"} gap={2}>
                <DPFileUploader name={"img"} label={"Profile photo"} />

                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={singleUser?.data?.img} alt="" />
                </Box>
              </Stack>

              <Stack direction={"row"} gap={2}>
                <DPInput name={"firstName"} label={"First name"} />
                <DPInput name={"lastName"} label={"Last name"} />
                <DPInput name={"username"} label={"Username"} />
              </Stack>

              <Grid2 container spacing={2}>
                <Grid2 item size={4}>
                  <DPInput name={"phone"} label={"Phone number"} />
                </Grid2>
                <Grid2 item size={4}>
                  <DPInput name={"email"} label={"Email"} />
                </Grid2>
              </Grid2>

              <Typography variant="h6" fontWeight={500} sx={{ mt: 2 }}>
                Your address
              </Typography>

              <Stack direction={"row"} gap={2}>
                <DPInput name={"address.country"} label={"Country"} />
                <DPInput name={"address.state"} label={"State"} />
                <DPInput name={"address.city"} label={"City"} />
              </Stack>

              <Grid2 container spacing={2}>
                <Grid2 item size={4}>
                  <DPInput name={"address.postalCode"} label={"Postal code"} />
                </Grid2>
              </Grid2>
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
              >
                Cancel
              </Button>
            </Box>
          </DPForm>
        </Box>
      </Box>
    </Container>
  );
};

export default GeneralSettings;
