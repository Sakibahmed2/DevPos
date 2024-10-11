/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPModal from "../../../../components/modal/DPModal";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPDatePicker from "../../../../components/form/DPDatePicker";

const defaultValues = {
  name: "",
  code: "",
  type: "",
  discount: "",
  limit: "",
  startDate: "",
  endDate: "",
  status: "",
};
const EditPromoModal = ({ open, setOpen, id }) => {
  console.log(id);

  const onSubmit = (data) => {
    console.log(data);
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
              <DPDatePicker name={"endData"} label={"End date"} />
            </Stack>

            {/* Status toggle */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography component={"p"}>Status</Typography>
              <Switch defaultChecked size="medium" />
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
