/* eslint-disable react/prop-types */
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";

const defaultValues = {
  category: "",
  categorySlug: "",
  status: "",
};

const EditSubCategory = ({ open, setOpen, id }) => {
  console.log(id);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <DPModal title="Edit sub category" open={open} setOpen={setOpen}>
      <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
        <Stack
          direction={"column"}
          gap={3}
          sx={{
            width: "500px",
          }}
        >
          <DPInput
            name={"parentCategory"}
            label={"Parent category"}
            fullWidth
            size="medium"
          />

          <DPInput
            name={"category"}
            label={"Category name"}
            fullWidth
            size="medium"
          />

          <DPInput
            name={"categoryCode"}
            label={"Category code"}
            fullWidth
            size="medium"
          />

          <DPInput
            name={"description"}
            label={"Description"}
            fullWidth
            multiline
            rows={3}
            size="medium"
          />

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
          <Button>Save</Button>
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
  );
};

export default EditSubCategory;
