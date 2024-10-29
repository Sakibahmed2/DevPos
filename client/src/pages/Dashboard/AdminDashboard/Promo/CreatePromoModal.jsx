/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import { useState } from "react";
import { useCreatePromoMutation } from "../../../../redux/api/admin/promoApi";
import { toast } from "sonner";

const defaultValues = {
  name: "",
  code: "",
  type: "",
  discount: "",
  limit: "",
  startDate: "",
  endDate: "",
};

const CreatePromoModal = ({ open, setOpen }) => {
  const [status, setStatus] = useState("Active");
  const [createPromo] = useCreatePromoMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating promo...");
    try {
      const promoData = {
        name: data.name,
        code: data.code,
        type: data.type,
        discount: data.discount,
        limit: data.limit,
        startDate: data.startDate,
        endDate: data.endDate,
        status: status,
      };
      console.log(promoData);
      const res = await createPromo(data).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create promo", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add promo">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <Stack direction={"row"} gap={2}>
              <DPInput name={"name"} label={"Name"} fullWidth size="medium" />
              <DPInput name={"code"} label={"Code"} fullWidth size="medium" />
            </Stack>

            <Stack direction={"row"} gap={2}>
              <DPSelect
                name={"type"}
                label={"Type"}
                items={["Flat", "Percentage"]}
                fullWidth
                size="medium"
              />
              <DPInput
                name={"discount"}
                label={"Discount"}
                fullWidth
                size="medium"
              />
            </Stack>

            <DPInput name={"limit"} label={"Limit"} fullWidth size="medium" />

            <Stack direction={"row"} gap={2}>
              <DPDatePicker name={"startDate"} label={"Start date"} />
              <DPDatePicker name={"endDate"} label={"End date"} />
            </Stack>

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

export default CreatePromoModal;
