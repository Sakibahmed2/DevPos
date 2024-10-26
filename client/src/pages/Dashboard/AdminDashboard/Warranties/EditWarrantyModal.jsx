/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import {
  useGetSingleWarrantiesQuery,
  useUpdateWarrantiesMutation,
} from "../../../../redux/api/admin/warrantiesApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { useState } from "react";
import { toast } from "sonner";

const EditWarrantyModal = ({ open, setOpen, id }) => {
  const [toggleStatus, setToggleStatus] = useState("Active");
  const { data: singleWarranty, isLoading } = useGetSingleWarrantiesQuery(id);
  const [updateWarranties] = useUpdateWarrantiesMutation();
  if (isLoading) {
    return <DPLoading />;
  }

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating warranty...");

    try {
      const warrantyData = {
        name: data.name,
        description: data.description,
        duration: data.duration,
        status: toggleStatus,
      };

      const res = await updateWarranties({
        warrantiesId: id,
        warrantiesData: warrantyData,
      }).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit warranty">
        <DPForm onSubmit={onSubmit} defaultValue={singleWarranty?.data}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"name"} label={"Name"} />
            <DPInput name={"description"} label={"description"} />
            <DPInput name={"duration"} label={"Duration"} />

            {/* Status toggle */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography component={"p"}>Status</Typography>
              <Switch
                checked={toggleStatus === "Active"}
                onChange={() =>
                  setToggleStatus((prev) =>
                    prev === "Active" ? "Inactive" : "Active"
                  )
                }
                size="medium"
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

export default EditWarrantyModal;
