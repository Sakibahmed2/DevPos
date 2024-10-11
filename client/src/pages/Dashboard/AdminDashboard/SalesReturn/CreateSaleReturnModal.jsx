/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPDatePicker from "../../../../components/form/DPDatePicker";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import DPModal from "../../../../components/modal/DPModal";
import SalesReturnTable from "./SalesReturnTable";

const defaultValues = {
  customerName: "",
  date: "",
  referenceNo: "",
  productName: "",
  orderTax: "",
  discount: "",
  shipping: "",
  status: "",
  note: "",
};

const CreateSaleReturnModal = ({ open, setOpen }) => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <DPModal
        title="Add sale return"
        open={open}
        setOpen={setOpen}
        fullWidth
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "800px",
            }}
          >
            <Stack direction={"row"} gap={2}>
              <DPInput name={"customerName"} label={"Customer"} />
              <DPDatePicker name={"date"} label={"Purchase date"} />
            </Stack>

            <Stack direction={"row"} gap={2}>
              <DPInput name={"productName"} label={"Product"} />
              <DPInput name={"referenceNo"} label={"Reference no"} />
            </Stack>

            {/* Sale table */}
            <SalesReturnTable />

            <Stack direction={"row"} gap={2}>
              <DPInput name={"orderTax"} label={"Order tax"} />
              <DPInput name={"discount"} label={"Discount"} />
            </Stack>

            <Stack direction={"row"} gap={2}>
              <DPInput name={"shipping"} label={"Shipping"} />
              <DPSelect
                name={"status"}
                label={"Status"}
                items={["Completed", "Pending"]}
              />
            </Stack>

            <DPInput name={"note"} label={"Note"} multiline rows={4} />
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: 5,
            }}
          >
            <Button type="submit">Submit</Button>
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

export default CreateSaleReturnModal;
