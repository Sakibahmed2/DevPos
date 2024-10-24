/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { toast } from "sonner";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";
import { useState } from "react";
import { useCreateBrandMutation } from "../../../../redux/api/admin/brandApi";

const defaultValues = {
  name: "",
  img: "",
};
const CreateBrandModal = ({ open, setOpen }) => {
  const [status, setStatus] = useState("Active");
  const [createBrand] = useCreateBrandMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating brand...");
    const base64Img = await convertImgToBase64(data.img);
    try {
      const brandData = {
        name: data.name,
        img: base64Img,
        status: status,
      };

      const res = await createBrand(brandData).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DPModal title="Create brand" open={open} setOpen={setOpen}>
      <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
        <Stack
          direction={"column"}
          gap={3}
          sx={{
            width: "500px",
          }}
        >
          <DPInput name={"name"} label={"Brand name"} fullWidth size="medium" />

          <DPFileUploader name={"img"} label={"Logo"} />

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
          <Button type="submit">Add brand</Button>
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

export default CreateBrandModal;
