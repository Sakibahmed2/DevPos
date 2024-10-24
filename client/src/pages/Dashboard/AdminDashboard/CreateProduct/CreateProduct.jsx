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
import DPFileUploader from "../../../../components/form/DPFileUploader";
import DPForm from "../../../../components/form/DPForm";
import DPInput from "../../../../components/form/DPInput";
import DPSelect from "../../../../components/form/DPSelect";
import SectionTitle from "../../../../components/ui/SectionTitle";
import convertImgToBase64 from "../../../../utils/convertImgToBase64";
import { useCreateProductMutation } from "../../../../redux/api/admin/productApi";
import { toast } from "sonner";
import { useState } from "react";
import { getUserInfo } from "../../../../utils/getUserInfo";

const defaultValues = {
  name: "Laptop Pro 15",
  img: "",
  productInfo: {
    slug: "laptop-pro-15",
    stockKeepingUnit: "SKU67890",
    category: "laptop",
    subCategory: "tablet",
    brand: "Apple",
    unit: "piece",
    sellingType: "retail",
    barcodeSymbology: "code128",
    itemCode: "123456",
    description:
      "A powerful laptop for professionals, offering high performance and a sleek design.",
  },
  pricingAndStock: {
    productType: "single",
    price: 1599.99,
    taxType: "VAT",
    discountType: "fixed",
    discountValue: 10,
    quantityAlert: 10,
    quantity: 100,
  },
};

const CreateProduct = () => {
  const [createProduct] = useCreateProductMutation();
  const [productType, setProductType] = useState("single");
  const userInfo = getUserInfo();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating product...");

    const imgBase64 = await convertImgToBase64(data.img);

    try {
      const productDetails = {
        name: data.name,
        img: imgBase64,
        createdBy: userInfo.id,
        productInfo: {
          slug: data.productInfo.slug,
          stockKeepingUnit: data.productInfo.stockKeepingUnit,
          category: data.productInfo.category,
          subCategory: data.productInfo.subCategory,
          brand: data.productInfo.brand,
          unit: data.productInfo.unit,
          sellingType: data.productInfo.sellingType,
          barcodeSymbology: data.productInfo.barcodeSymbology,
          itemCode: data.productInfo.itemCode,
          description: data.productInfo.description,
        },
        pricingAndStock: {
          productType: data.pricingAndStock.productType,
          price: data.pricingAndStock.price,
          taxType: data.pricingAndStock.taxType,
          discountType: data.pricingAndStock.discountType,
          discountValue: data.pricingAndStock.discountValue,
          quantityAlert: data.pricingAndStock.quantityAlert,
          quantity: data.pricingAndStock.quantity,
        },
      };

      const res = await createProduct(productDetails).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
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
                    <DPInput name={"name"} label={"Product name"} required />
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
                      name={"productInfo.stockKeepingUnit"}
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
                      checked={productType === "single"}
                      onChange={() => setProductType("single")}
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Variable product"
                      checked={productType === "variable"}
                      onChange={() => setProductType("variable")}
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
                      label={"Discount value (%) "}
                      items={[10, 20]}
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
                  <DPFileUploader name={"img"} label={"Upload image"} />
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
