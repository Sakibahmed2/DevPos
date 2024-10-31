/* eslint-disable react/prop-types */
import { Box, Button, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPModal from "../../../../components/modal/DPModal";
import {
  useGetSingleCustomersQuery,
  useUpdateCustomersMutation,
} from "../../../../redux/api/finance/customersApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { toast } from "sonner";

const EditCustomerModal = ({ open, setOpen, id }) => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const { data: singleCustomer, isLoading } = useGetSingleCustomersQuery(id);
  const [updateCustomer] = useUpdateCustomersMutation();

  if (isLoading) return <DPLoading />;

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating customer...");

    try {
      const customerData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        description: data.description,
        country: value.label,
      };

      const res = await updateCustomer({ id, data: customerData }).unwrap();

      if (res.success) {
        toast.success("Customer updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update customer", { id: toastId });
    }
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
      }}
    >
      <DPModal open={open} setOpen={setOpen} title="Edit customer">
        <DPForm onSubmit={onSubmit} defaultValue={singleCustomer?.data}>
          <Stack
            direction={"column"}
            gap={3}
            sx={{
              width: "500px",
            }}
          >
            <Stack direction={"row"} gap={3}>
              <DPInput name={"name"} label={"Customer name"} />
              <DPInput name={"email"} label={"Email"} />
            </Stack>

            <Stack direction={"row"} gap={3} alignItems={"center"}>
              <DPInput name={"phone"} label={"Phone"} type="number" />
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

export default EditCustomerModal;
