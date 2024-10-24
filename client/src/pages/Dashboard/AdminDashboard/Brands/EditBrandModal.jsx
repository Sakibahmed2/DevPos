/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import {
  useGetSingleBrandQuery,
  useUpdateBrandMutation,
} from "../../../../redux/api/admin/brandApi";
import { useState } from "react";
import { toast } from "sonner";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";
import DPLoading from "../../../../components/ui/DPLoading";

const EditBrandModal = ({ open, setOpen, id }) => {
  const [status, setStatus] = useState("Active");
  const { data: singleBrand, isLoading } = useGetSingleBrandQuery(id);
  const [updateBrand] = useUpdateBrandMutation();

  if (isLoading) {
    return <DPLoading />;
  }

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating brand...");

    let base64Img = singleBrand?.data?.img;

    if (data.img instanceof Blob) {
      base64Img = await convertImgToBase64(data.img);
    }

    try {
      const brandData = {
        name: data.name,
        img: data.img ? base64Img : singleBrand?.data?.img,
        status: status,
      };

      const res = await updateBrand({
        brandId: id,
        brandData: brandData,
      }).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DPModal title="Edit brand" open={open} setOpen={setOpen}>
      <DPForm onSubmit={onSubmit} defaultValue={singleBrand?.data}>
        <Stack
          direction={"column"}
          gap={3}
          sx={{
            width: "500px",
          }}
        >
          <DPInput name={"name"} label={"Brand"} fullWidth size="medium" />

          <Stack direction={"row"} gap={3}>
            <DPFileUploader name={"img"} label={"Logo"} />
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
              <img src={singleBrand?.data?.img} alt="" />
            </Box>
          </Stack>

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
                setStatus((prev) => (prev === "Active" ? "Inactive" : "Active"))
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
  );
};

export default EditBrandModal;
