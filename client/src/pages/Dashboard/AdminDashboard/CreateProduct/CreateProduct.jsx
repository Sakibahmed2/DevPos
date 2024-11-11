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
import { useGetAllCategoriesQuery } from "../../../../redux/api/admin/categoriesApi";
import { useGetAllSubCategoriesQuery } from "../../../../redux/api/admin/subCategoriesApi";
import { useGetAllBrandsQuery } from "../../../../redux/api/admin/brandApi";
import { useGetAllUnitsQuery } from "../../../../redux/api/admin/unitsApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { convertDataForSelect } from "../../../../utils/convertDataForSelect";

const defaultValues = {
  name: "",
  img: "",
  productInfo: {
    slug: "",
    stockKeepingUnit: "",
    category: "",
    subCategory: "",
    brand: "",
    unit: "",
    sellingType: "",
    barcodeSymbology: "",
    itemCode: "",
    description: "",
  },
  pricingAndStock: {
    productType: "",
    price: 0,
    taxType: "",
    discountType: "",
    discountValue: 0,
    quantityAlert: 0,
    quantity: 0,
  },
};

const CreateProduct = () => {
  const [createProduct] = useCreateProductMutation();
  const [productType, setProductType] = useState("single");
  const userInfo = getUserInfo();
  console.log(productType);

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery({});

  const { data: subCategoriesData, isLoading: subCategoriesLoading } =
    useGetAllSubCategoriesQuery({});

  const { data: brandData, isLoading: brandLoading } = useGetAllBrandsQuery({});

  const { data: unitsData, isLoading: unitLoading } = useGetAllUnitsQuery({});
  if (categoriesLoading || subCategoriesLoading || brandLoading || unitLoading)
    return <DPLoading />;

  const categoriesDataForSelect = convertDataForSelect(
    categoriesData?.data?.result
  );
  const subCategoriesDataForSelect = convertDataForSelect(
    subCategoriesData?.data?.result
  );
  const brandDataForSelect = convertDataForSelect(brandData?.data?.result);
  const unitsDataForSelect = convertDataForSelect(unitsData?.data?.result);

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
                      items={categoriesDataForSelect}
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
                      items={subCategoriesDataForSelect}
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
                      items={brandDataForSelect}
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
                      items={unitsDataForSelect}
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
                    <DPInput
                      name={"productInfo.barcodeSymbology"}
                      label={"Barcode symbology"}
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
                    <DPInput
                      name={"productInfo.itemCode"}
                      label={"Item code"}
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
                      name={"pricingAndStock.discountValue"}
                      label={"Discount value (%) "}
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
