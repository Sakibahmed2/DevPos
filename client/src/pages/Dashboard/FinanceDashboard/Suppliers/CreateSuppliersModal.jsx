/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import { toast } from "sonner";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";
import { useCreateSuppliersMutation } from "../../../../redux/api/finance/suppliersApi";

const defaultValues = {
  name: "",
  img: "",
  email: "",
  phone: "",
  country: "",
  description: "",
};

const CreateSupplierModal = ({ open, setOpen }) => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const [createSupplier] = useCreateSuppliersMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating supplier...");

    const base64Img = await convertImgToBase64(data.img);
    try {
      const supplierData = {
        name: data.name,
        img: base64Img,
        email: data.email,
        phone: data.phone,
        country: value.label,
        description: data.description,
      };

      const res = await createSupplier(supplierData).unwrap();

      if (res.success) {
        toast.success("Supplier created successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);

      toast.error("Failed to create supplier", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Add supplier">
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <Box>
              <DPFileUploader name={"img"} label={"Supplier img"} />
            </Box>
            <Stack direction={"row"} gap={3}>
              <DPInput name={"name"} label={"Supplier name"} />
              <DPInput name={"email"} label={"Email"} />
            </Stack>

            <Stack direction={"row"} gap={3}>
              <DPInput name={"phone"} label={"Phone"} />
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden 0",
                }}
              >
                <Select
                  options={options}
                  value={value}
                  onChange={(e) => setValue(e)}
                  styles={{
                    control: (base) => ({
                      ...base,
                      padding: "9px 0",
                      borderRadius: "8px",
                    }),
                  }}
                />
              </Box>
            </Stack>

            <DPInput
              name={"description"}
              label={"Description"}
              multiline
              rows={4}
            />
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

export default CreateSupplierModal;
