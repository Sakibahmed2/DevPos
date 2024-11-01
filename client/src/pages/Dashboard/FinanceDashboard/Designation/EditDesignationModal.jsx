/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { useState } from "react";
import {
  useGetSingleDesignationsQuery,
  useUpdateDesignationsMutation,
} from "../../../../redux/api/finance/designationsApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { toast } from "sonner";

const EditDesignationModal = ({ open, setOpen, id }) => {
  const [status, setStatus] = useState("Active");
  const { data: singleDesignation, isLoading } =
    useGetSingleDesignationsQuery(id);

  const [updateDesignation] = useUpdateDesignationsMutation();

  if (isLoading) return <DPLoading />;

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating designation...");
    try {
      const designationData = {
        name: data.name,
        status: status,
      };

      const res = await updateDesignation({
        id: id,
        data: designationData,
      }).unwrap();

      if (res?.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update designation", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit designation">
        <DPForm onSubmit={onSubmit} defaultValue={singleDesignation?.data}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput
              name={"name"}
              label={"Designation name"}
              fullWidth
              size="medium"
            />

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

export default EditDesignationModal;
