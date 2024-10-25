/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import {
  useGetSingleVariantAttributesQuery,
  useUpdateVariantAttributesMutation,
} from "../../../../redux/api/admin/variantAttributesApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { useState } from "react";
import { toast } from "sonner";

const EditVariantAttributesModal = ({ open, setOpen, id }) => {
  const { data: singleVariantAttributes, isLoading } =
    useGetSingleVariantAttributesQuery(id);
  const [status, setStatus] = useState("");

  const [updateVariantAttributes] = useUpdateVariantAttributesMutation();

  if (isLoading) {
    return <DPLoading />;
  }

  console.log(status);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating variant attributes...");

    try {
      const variantAttributeData = {
        name: data.name,
        value: data.value,
        status: status,
      };

      const res = await updateVariantAttributes({
        variantAttributeId: id,
        variantAttributeData,
      }).unwrap();

      console.log(res);

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update variant attributes", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit attributes">
        <DPForm
          onSubmit={onSubmit}
          defaultValue={singleVariantAttributes?.data}
        >
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
                defaultChecked={
                  singleVariantAttributes?.data.status === "Active"
                    ? true
                    : false
                }
                size="medium"
                onChange={() =>
                  setStatus((prev) =>
                    prev === "Inactive" ? "Active" : "Inactive"
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

export default EditVariantAttributesModal;
