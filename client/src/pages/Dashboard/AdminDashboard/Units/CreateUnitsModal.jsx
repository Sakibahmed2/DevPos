/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateUnitMutation } from "../../../../redux/api/admin/unitsApi";

const defaultValues = {
  name: "",
  shortName: "",
};

const CreateUnitsModal = ({ open, setOpen }) => {
  const [status, setStatus] = useState("Active");
  const [createUnits] = useCreateUnitMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating unit...");
    try {
      const unitData = {
        name: data.name,
        shortName: data.shortName,
        status: status,
      };

      const res = await createUnits(unitData).unwrap();

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
      <DPModal open={open} setOpen={setOpen} title="Create unit">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"name"} label={"Units name"} />
            <DPInput name={"shortName"} label={"Short name"} />

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
            <Button type="submit">Add unit</Button>
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

export default CreateUnitsModal;
