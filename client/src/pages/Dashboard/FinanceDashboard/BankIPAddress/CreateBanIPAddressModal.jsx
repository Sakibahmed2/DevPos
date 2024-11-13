/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { useCreateBanIpMutation } from "../../../../redux/api/finance/banIpApi";
import { toast } from "sonner";

const defaultValues = {
  ipAddress: "",
  reasonForBan: "",
};

const CreateBanIPAddressModal = ({ open, setOpen }) => {
  const [status, setStatus] = useState("Active");
  const [createBanIp] = useCreateBanIpMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating ban ip address");

    try {
      const banIpData = {
        ipAddress: data.ipAddress,
        reasonForBan: data.reasonForBan,
        status: status,
      };

      const res = await createBanIp(banIpData).unwrap();

      if (res?.success) {
        toast.success("Ban ip address created successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create ban ip address", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add new ban ip address">
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
            <Button type="submit">Create</Button>
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

export default CreateBanIPAddressModal;
