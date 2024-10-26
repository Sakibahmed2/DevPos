/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import { useState } from "react";
import DPSelect from "../../../../components/form/DPSelect";
import { useCreateWarrantiesMutation } from "../../../../redux/api/admin/warrantiesApi";
import { toast } from "sonner";

const defaultValues = {
  name: "",
  description: "",
  duration: "",
  periods: "",
};

const CreateWarrantyModal = ({ open, setOpen }) => {
  const [toggleStatus, setToggleStatus] = useState("Active");

  const [createWarranties] = useCreateWarrantiesMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating warranty...");
    try {
      const warrantyData = {
        name: data.name,
        description: data.description,
        duration: `${data.duration} ${data.periods}`,
        status: toggleStatus,
      };

      const res = await createWarranties(warrantyData).unwrap();

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
      <DPModal open={open} setOpen={setOpen} title="Add warranty">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"name"} label={"Name"} fullWidth size="medium" />

            <DPInput name={"duration"} label={"Duration"} />

            <DPSelect
              name={"periods"}
              label={"Periods"}
              items={[
                { name: "Month", value: "Month" },
                { name: "Year", value: "Year" },
                { name: "Week", value: "Week" },
              ]}
            />

            <DPInput
              name={"description"}
              label={"description"}
              multiline
              rows={4}
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

export default CreateWarrantyModal;
