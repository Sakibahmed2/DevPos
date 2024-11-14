import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import companyImagesIcon from "../../../../assets/dashboard icons/finance/settings/companyImgaesIcon.svg";
import styled from "@emotion/styled";
import uploadImgIcon from "../../../../assets/dashboard icons/finance/settings/uploadImgIcon.svg";
import addressIcon from "../../../../assets/dashboard icons/finance/settings/addressIcon.svg";
import { useState } from "react";
import {
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
} from "../../../../redux/api/finance/companyApi";
import { toast } from "sonner";
import DPLoading from "../../../../components/ui/DPLoading";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CompanySettings = () => {
  const [logo, setLogo] = useState(null);
  const [icon, setIcon] = useState(null);
  const [favicon, setFavicon] = useState(null);

  const companyId = "6735726e7ad21f0fe9bb201a";

  const {
    data: company,
    isLoading,
    refetch,
  } = useGetSingleCompanyQuery({
    id: companyId,
  });

  const [updateCompany] = useUpdateCompanyMutation();

  if (isLoading) return <DPLoading />;

  const defaultValues = {
    companyName: company?.data?.name,
    companyEmail: company?.data?.email,
    companyPhone: company?.data?.phone,
    companyTax: company?.data?.tax,
    website: company?.data?.website,
    address: {
      country: company?.data?.address?.country,
      state: company?.data?.address?.state,
      city: company?.data?.address?.city,
      postalCode: company?.data?.address?.postalCode,
    },
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating company settings...");

    let logoBase64 = company?.data?.companyLogo;
    let iconBase64 = company?.data?.companyIcon;
    let faviconBase64 = company?.data?.favicon;

    if (logo || icon || favicon) {
      logoBase64 = await convertImgToBase64(logo);
      iconBase64 = await convertImgToBase64(icon);
      faviconBase64 = await convertImgToBase64(favicon);
    }

    try {
      const updatedData = {
        companyLogo: logoBase64,
        companyIcon: iconBase64,
        favicon: faviconBase64,
        name: data.companyName,
        email: data.companyEmail,
        phone: data.companyPhone,
        tax: data.companyTax,
        website: data.website,
        address: {
          country: data.address.country,
          state: data.address.state,
          city: data.address.city,
          postalCode: data.address.postalCode,
        },
      };

      const res = await updateCompany({
        id: companyId,
        data: updatedData,
      }).unwrap();

      if (res?.success) {
        toast.success("Company settings updated successfully", { id: toastId });
        refetch();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update company settings", { id: toastId });
    }
  };

  return (
    <div>
      {" "}
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
          Company settings
        </Typography>
      </Box>
      <Box>
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"row"}
            spacing={3}
            sx={{
              my: 2,
            }}
          >
            <DPInput name={"companyName"} label={"Company name"} />
            <DPInput name={"companyEmail"} label={"Company email address"} />
            <DPInput name={"companyPhone"} label={"Company Phone"} />
          </Stack>

          <Grid2 container spacing={3}>
            <Grid2 item size={4}>
              <DPInput name={"companyTax"} label={"Tax"} />
            </Grid2>
            <Grid2 item size={4}>
              <DPInput name={"website"} label={"Website"} />
            </Grid2>
          </Grid2>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 4,
            }}
          >
            <img src={companyImagesIcon} alt="" />
            <Typography variant="h6" fontWeight={500}>
              Company settings
            </Typography>
          </Box>

          <Stack direction={"column"} gap={4} mt={4}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Typography variant="h6" fontWeight={500}>
                  Company logo
                </Typography>
                <Typography variant="subtitle1">
                  Upload Logo of your Company to display in website
                </Typography>
              </Box>

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<img src={uploadImgIcon} alt="" />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => setLogo(event.target.files[0])}
                />
              </Button>
            </Stack>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Typography variant="h6" fontWeight={500}>
                  Company icon
                </Typography>
                <Typography variant="subtitle1">
                  Upload Icon of your Company to display in website
                </Typography>
              </Box>

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<img src={uploadImgIcon} alt="" />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => setIcon(event.target.files[0])}
                />
              </Button>
            </Stack>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Typography variant="h6" fontWeight={500}>
                  Favicon
                </Typography>
                <Typography variant="subtitle1">
                  Upload Icon of your Company to display in website
                </Typography>
              </Box>

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<img src={uploadImgIcon} alt="" />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => setFavicon(event.target.files[0])}
                />
              </Button>
            </Stack>
          </Stack>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 4,
            }}
          >
            <img src={addressIcon} alt="" />
            <Typography variant="h6" fontWeight={500}>
              Address
            </Typography>
          </Box>

          <Stack direction={"row"} gap={2} mt={2}>
            <DPInput name={"address.country"} label={"Country"} />
            <DPInput name={"address.state"} label={"State"} />
            <DPInput name={"address.city"} label={"City"} />
          </Stack>

          <Grid2 container spacing={2} mt={2}>
            <Grid2 item size={4}>
              <DPInput name={"address.postalCode"} label={"Postal code"} />
            </Grid2>
          </Grid2>

          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
            mt={4}
          >
            <Button type="submit">Save</Button>
            <Button
              sx={{
                backgroundColor: "black",
              }}
            >
              Cancel
            </Button>
          </Stack>
        </DPForm>
      </Box>
    </div>
  );
};

export default CompanySettings;
