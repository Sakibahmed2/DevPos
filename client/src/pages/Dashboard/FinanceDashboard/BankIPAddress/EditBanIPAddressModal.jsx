/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import DPLoading from "../../../../components/ui/DPLoading";
import {
  useGetSingleBanIpQuery,
  useUpdateBanIpMutation,
} from "../../../../redux/api/finance/banIpApi";

const EditBanIPAddressModal = ({ open, setOpen, id }) => {
  const [status, setStatus] = useState("Active");
  const { data: singleBanIp, isLoading } = useGetSingleBanIpQuery(id);
  const [updateBanIp] = useUpdateBanIpMutation();

  if (isLoading) return <DPLoading />;

  const defaultValues = {
    ipAddress: singleBanIp?.data?.ipAddress,
    reasonForBan: singleBanIp?.data?.reasonForBan,
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating ban ip address");

    try {
      const banIpData = {
        ipAddress: data.ipAddress,
        reasonForBan: data.reasonForBan,
        status: status,
      };

      const res = await updateBanIp({ id: id, data: banIpData }).unwrap();

      if (res) {
        toast.success("Ban ip address updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update ban ip address", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit ban ip address">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <DPInput name={"ipAddress"} label={"IP Address"} />
            <DPInput
              name={"reasonForBan"}
              label={"Reason for ban"}
              multiline
              rows={4}
            />

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
            <Button type="submit">Update</Button>
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

export default EditBanIPAddressModal;
