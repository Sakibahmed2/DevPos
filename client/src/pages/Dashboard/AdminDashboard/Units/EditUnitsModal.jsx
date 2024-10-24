/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import {
  useGetSingleUnitQuery,
  useUpdateUnitMutation,
} from "../../../../redux/api/admin/unitsApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { useState } from "react";
import { toast } from "sonner";

const EditUnitsModal = ({ open, setOpen, id }) => {
  const [status, setStatus] = useState("Active");
  const { data: singleUnit, isLoading } = useGetSingleUnitQuery(id);
  const [updateUnit] = useUpdateUnitMutation();

  if (isLoading) {
    return <DPLoading />;
  }

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating unit...");
    try {
      const unitData = {
        name: data.name,
        shortName: data.shortName,
        status: status,
      };

      const res = await updateUnit({
        unitId: id,
        unitData: unitData,
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
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit unit">
        <DPForm onSubmit={onSubmit} defaultValue={singleUnit?.data}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"name"} label={"Units name"} />
            <DPInput name={"shortName"} label={"Short name"} />

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

export default EditUnitsModal;
