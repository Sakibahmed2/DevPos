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

const CreateCategoriesModal = ({ open, setOpen }) => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <DPModal title="Create category" open={open} setOpen={setOpen}>
      <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
        <Stack
          direction={"column"}
          gap={3}
          sx={{
            width: "500px",
          }}
        >
          <DPInput
            name={"category"}
            label={"Category"}
            fullWidth
            size="medium"
          />
          <DPInput
            name={"categorySlug"}
            label={"Category slug"}
            fullWidth
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
          <Button type="submit">Add category</Button>
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

export default CreateCategoriesModal;
