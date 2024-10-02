import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import SectionTitle from "../../../../components/ui/SectionTitle";
import DPFileUploader from "../../../../components/form/DPFileUploader";

// const defaultValues = {
//   // productName: "",
//   // slug: "",
//   // stockKeepingUnit: "",
//   // quantity: "",
//   // category: "",
//   // subCategory: "",
//   // brand: "",
//   // unit: "",
//   // sellingType: "",
//   // barcodeSymbology: "",
//   // itemCode: "",
//   // description: "",
//   // price: "",
//   // taxType: "",
//   // discountType: "",
//   // discountValue: "",
//   // quantityAlert: "",
//   // productImg: "",
// };

const defaultValues = {
  productName: "Apple Macbook Pro",
  productImg: "https://source.unsplash.com/random",
  productInfo: {
    slug: "apple-macbook-pro",
    sku: "MBP-123456",
    category: "laptop",
    subCategory: "tablet",
    brand: "Apple",
    unit: "piece",
    sellingType: "retail",
    barcodeSymbology: "code128",
    itemCode: "123456",
    description: "Latest model of Apple MacBook Pro with M1 chip.",
  },
  pricingAndStock: {
    price: 2500,
    quantity: 10,
    taxType: "VAT",
    taxRate: 15, // percentage
    discountType: "percentage",
    discountValue: "10%", // percentage
    quantityAlert: 5,
  },
};

const CreateProduct = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Box>
        <SectionTitle
          title={"New product"}
          description={"Create new product"}
        />

        <Box
          sx={{
            mt: 3,
          }}
        >
          <Box>
            <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
              {/* Product information part */}
              <Box>
                <Typography
                  variant="h5"
                  component={"p"}
                  sx={{
                    color: "black",
                    fontWeight: "600",
                    p: 2,
                  }}
                >
                  Product information
                </Typography>
                <Divider></Divider>

                {/* first row */}
                <Grid2
                  sx={{
                    mt: 2,
                  }}
                  container
                  spacing={5}
                >
                  <Grid2
                    item
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                  >
                    <DPInput
                      name={"productName"}
                      label={"Product name"}
                      required
                      fullWidth
                      size="medium"
                    />
                  </Grid2>

                  <Grid2
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                    item
                  >
                    <DPInput
                      name={"productInfo.slug"}
                      label={"Slug"}
                      required
                      fullWidth
                      size="medium"
                    />
                  </Grid2>

                  <Grid2
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                    item
                  >
                    <DPInput
                      name={"productInfo.sku"}
                      label={"Stock keeping unit"}
                      required
                      fullWidth
                      size="medium"
                    />
                  </Grid2>
                </Grid2>

                {/* second row */}
                <Grid2
                  sx={{
                    mt: 2,
                  }}
                  container
                  spacing={5}
                >
                  <Grid2
                    item
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                  >
                    <DPSelect
                      name={"productInfo.category"}
                      label={"Category"}
                      items={["laptop", "mobile"]}
                      size="medium"
                    />
                  </Grid2>

                  <Grid2
                    item
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                  >
                    <DPSelect
                      name={"productInfo.subCategory"}
                      label={"Sub category"}
                      items={["tablet", "accessories"]}
                      size="medium"
                    />
                  </Grid2>

                  <Grid2
                    item
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                  >
                    <DPSelect
                      name={"productInfo.brand"}
                      label={"Brand"}
                      items={["Apple", "Samsung"]}
                      size="medium"
                    />
                  </Grid2>
                </Grid2>

                {/* third row */}
                <Grid2
                  sx={{
                    mt: 2,
                  }}
                  container
                  spacing={5}
                >
                  <Grid2
                    item
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 3,
                    }}
                  >
                    <DPSelect
                      name={"productInfo.unit"}
                      label={"Unit"}
                      items={["piece", "kg"]}
                      size="medium"
                    />
                  </Grid2>

                  <Grid2
                    item
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 3,
                    }}
                  >
                    <DPSelect
                      name={"productInfo.sellingType"}
                      label={"Seeling type"}
                      items={["retail", "wholesale"]}
                      size="medium"
                    />
                  </Grid2>

                  <Grid2
                    item
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 3,
                    }}
                  >
                    <DPSelect
                      name={"productInfo.barcodeSymbology"}
                      label={"Barcode symbology"}
                      items={["code128", "code39"]}
                      size="medium"
                    />
                  </Grid2>

                  <Grid2
                    item
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 3,
                    }}
                  >
                    <DPSelect
                      name={"productInfo.itemCode"}
                      label={"Item code"}
                      items={["123456", "789123"]}
                      size="medium"
                    />
                  </Grid2>
                </Grid2>

                {/* fourth row */}
                <Grid2
                  sx={{
                    mt: 2,
                  }}
                  container
                  spacing={5}
                >
                  <Grid2 item size={12}>
                    <DPInput
                      name={"productInfo.description"}
                      label={"Description"}
                      fullWidth
                      size="medium"
                      multiline
                      rows={6}
                    />
                  </Grid2>
                </Grid2>
              </Box>

              {/* Pricing and stock */}
              <Box
                sx={{
                  mt: 5,
                }}
              >
                <Typography
                  variant="h5"
                  component={"p"}
                  sx={{
                    color: "black",
                    fontWeight: "600",
                    p: 2,
                  }}
                >
                  Pricing & stock
                </Typography>
                <Divider></Divider>

                {/* product type */}

                <Box
                  sx={{
                    p: 3,
                  }}
                >
                  <Typography variant="subtitle1" component={"p"}>
                    Product type
                  </Typography>

                  <Stack direction={"row"}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Single product"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Variable product"
                    />
                  </Stack>
                </Box>

                {/* first row */}
                <Grid2
                  sx={{
                    mt: 2,
                  }}
                  container
                  spacing={5}
                >
                  <Grid2
                    item
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                  >
                    <DPInput
                      name={"pricingAndStock.quantity"}
                      label={"Quantity"}
                      required
                      fullWidth
                      size="medium"
                    />
                  </Grid2>

                  <Grid2
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                    item
                  >
                    <DPInput
                      name={"pricingAndStock.price"}
                      label={"Price"}
                      required
                      fullWidth
                      size="medium"
                    />
                  </Grid2>

                  <Grid2
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                    item
                  >
                    <DPSelect
                      name={"pricingAndStock.taxType"}
                      label={"Tax type"}
                      items={["VAT", "GST"]}
                      fullWidth
                      size="medium"
                    />
                  </Grid2>
                </Grid2>

                {/* second row */}
                <Grid2
                  sx={{
                    mt: 2,
                  }}
                  container
                  spacing={5}
                >
                  <Grid2
                    item
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                  >
                    <DPSelect
                      name={"pricingAndStock.discountType"}
                      label={"Discount type"}
                      items={["percentage", "fixed"]}
                      fullWidth
                      size="medium"
                    />
                  </Grid2>

                  <Grid2
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                    item
                  >
                    <DPSelect
                      name={"pricingAndStock.discountValue"}
                      label={"Discount value"}
                      items={["10%", "20%"]}
                      required
                      fullWidth
                      size="medium"
                    />
                  </Grid2>

                  <Grid2
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                    item
                  >
                    <DPInput
                      name={"pricingAndStock.quantityAlert"}
                      label={"Quantity alert"}
                      fullWidth
                      required
                      size="medium"
                    />
                  </Grid2>
                </Grid2>
              </Box>

              {/* Image */}
              <Box
                sx={{
                  mt: 5,
                }}
              >
                <Typography
                  variant="h5"
                  component={"p"}
                  sx={{
                    color: "black",
                    fontWeight: "600",
                    p: 2,
                  }}
                >
                  Images
                </Typography>
                <Divider></Divider>

                <Box
                  sx={{
                    mt: 3,
                  }}
                >
                  <DPFileUploader name={"productImg"} label={"Upload image"} />
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 3,
                }}
              >
                <Button type="submit">Create product</Button>
              </Box>
            </DPForm>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateProduct;
