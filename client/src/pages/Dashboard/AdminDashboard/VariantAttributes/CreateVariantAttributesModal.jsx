/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import { useState } from "react";
import { useCreateVariantAttributesMutation } from "../../../../redux/api/admin/variantAttributesApi";
import { toast } from "sonner";

const defaultValues = {
  name: "",
  value: "",
};

const CreateVariantAttributesModal = ({ open, setOpen }) => {
  const [status, setStatus] = useState("Active");
  const [createVariantAttributes] = useCreateVariantAttributesMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating variant attributes...");

    try {
      const variantAttributeData = {
        name: data.name,
        value: data.value,
        status: status,
      };

      const res = await createVariantAttributes(variantAttributeData).unwrap();

      console.log(res);

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add attributes">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput
              name={"name"}
              label={"Variant name"}
              fullWidth
              size="medium"
            />
            <DPInput name={"value"} label={"Value"} fullWidth size="medium" />

            {/* Status toggle */}
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
            <Button type="submit">Add variant attributes</Button>
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

export default CreateVariantAttributesModal;
