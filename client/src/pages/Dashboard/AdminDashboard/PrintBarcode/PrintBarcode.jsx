import {
  Box,
  Button,
  Container,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DPForm from "../../../../components/form/DPForm";
import DPSelect from "../../../../components/form/DPSelect";
import SectionTitle from "../../../../components/ui/SectionTitle";
import PrintBarcodeTable from "./PrintBarcodeTable";

const defaultValues = {
  warehouse: "",
  store: "",
  product: "",
  paperSize: "",
};

const PrintBarcode = () => {
  const handlePrint = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Box>
        <SectionTitle
          title={"Print barcode"}
          description={"Manage your barcode"}
        />

        {/* print barcode form & table */}

        <Box
          sx={{
            border: "1px solid lightgray",
            p: 3,
            mt: 5,
          }}
        >
          <DPForm onSubmit={handlePrint} defaultValue={defaultValues}>
            <Grid2 container spacing={2}>
              <Grid2
                item
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <DPSelect
                  name={"warehouse"}
                  label={"Warehouse"}
                  items={["Warehouse 1", "Warehouse 2"]}
                  fullWidth
                  size="medium"
                />
              </Grid2>

              <Grid2
                item
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <DPSelect
                  name={"store"}
                  label={"Store"}
                  items={["Store 1", "Store 2"]}
                  fullWidth
                  size="medium"
                />
              </Grid2>
            </Grid2>

            <Grid2
              container
              spacing={2}
              sx={{
                mt: 6,
              }}
            >
              <Grid2
                item
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Box>
                  <TextField
                    label="Search here"
                    fullWidth
                    slotProps={{
                      input: {
                        endAdornment: <img src={searchIcon} />,
                      },
                    }}
                  />
                </Box>
              </Grid2>
            </Grid2>

            {/* products table */}
            <PrintBarcodeTable />

            <Grid2
              container
              spacing={2}
              sx={{
                mt: 9,
              }}
            >
              <Grid2
                item
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <Typography
                  component={"p"}
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontSize: "25px",
                    fontWeight: "500",
                  }}
                >
                  Paper size
                </Typography>

                <DPSelect
                  name={"paperSize"}
                  label={"Paper size"}
                  items={["A4", "A5"]}
                  fullWidth
                  size="medium"
                />
              </Grid2>
            </Grid2>

            <Box
              sx={{
                mt: 5,
                display: "flex",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <Button type="submit">Print Barcode</Button>
              <Button
                sx={{
                  bgcolor: "black",
                }}
              >
                Reset
              </Button>
            </Box>
          </DPForm>
        </Box>
      </Box>
    </Container>
  );
};

export default PrintBarcode;
