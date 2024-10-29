/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import {
  useGetSinglePromoQuery,
  useUpdatePromoMutation,
} from "../../../../redux/api/admin/promoApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { useState } from "react";
import { toast } from "sonner";

const EditPromoModal = ({ open, setOpen, id }) => {
  const [status, setStatus] = useState("Active");
  const { data: singlePromo, isLoading } = useGetSinglePromoQuery(id);

  const [updatePromo] = useUpdatePromoMutation();

  if (isLoading) {
    return <DPLoading />;
  }

  const defaultValues = {
    name: singlePromo?.data?.name,
    code: singlePromo?.data?.code,
    type: singlePromo?.data?.type,
    discount: singlePromo?.data?.discount,
    limit: singlePromo?.data?.limit,
    startDate: singlePromo?.data?.startDate,
    endDate: singlePromo?.data?.endDate,
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating promo...");
    try {
      const updatedData = {
        name: data.name,
        code: data.code,
        type: data.type,
        discount: data.discount,
        limit: data.limit,
        startDate: data.startDate,
        endDate: data.endDate,
        status: status,
      };

      const res = await updatePromo({
        promoId: id,
        promoData: updatedData,
      }).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update promo", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit promo">
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
                items={["Fixed", "Percentage"]}
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

export default EditPromoModal;
