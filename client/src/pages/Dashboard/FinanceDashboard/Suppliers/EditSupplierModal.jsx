/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import DPFileUploader from "../../../../components/form/DPFileUploader";
import {
  useGetSingleSuppliersQuery,
  useUpdateSuppliersMutation,
} from "../../../../redux/api/finance/suppliersApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { toast } from "sonner";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";
import { useMemo, useState } from "react";
import countryList from "react-select-country-list";
import Select from "react-select";

const EditSupplierModal = ({ open, setOpen, id }) => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const { data: singleSupplier, isLoading } = useGetSingleSuppliersQuery(id);

  const [updateSupplier] = useUpdateSuppliersMutation();

  if (isLoading) return <DPLoading />;

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating supplier...");
    let base64Img = singleSupplier?.data?.img;

    if (data.img instanceof Blob) {
      base64Img = await convertImgToBase64(data.img);
    }

    try {
      const updateData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        country: value.label,
        description: data.description,
        img: base64Img,
      };

      const res = await updateSupplier({ id, data: updateData }).unwrap();
      if (res?.success) {
        toast.success("Supplier updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update supplier", { id: toastId });
    }
  };

  return (
    <Box>
      <DPModal open={open} setOpen={setOpen} title="Edit supplier">
        <DPForm onSubmit={onSubmit} defaultValue={singleSupplier?.data}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <Box>
              <DPFileUploader
                name={"img"}
                label={"Supplier img"}
                defaultImage={singleSupplier?.data?.img}
              />
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

export default EditSupplierModal;
