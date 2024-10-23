import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useParams } from "react-router-dom";
import SectionTitle from "../../../../components/ui/SectionTitle";
import { useGetSingleProductQuery } from "../../../../redux/api/admin/productApi";
import DPLoading from "../../../../components/ui/DPLoading";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id);

  if (isLoading) {
    return <DPLoading />;
  }

  const productDetails = data?.data;

  const tableData = [
    ["Product", productDetails.name],
    ["Category", productDetails.productInfo.category],
    ["Sub Category", productDetails.productInfo.subCategory],
    ["Brand", productDetails.productInfo.brand],
    ["Unit", productDetails.productInfo.unit],
    ["SKU", productDetails.productInfo.stockKeepingUnit],
    ["Quantity", productDetails.pricingAndStock.quantity],
    ["Tax", productDetails.pricingAndStock.taxType],
    ["Discount Type", productDetails.pricingAndStock.discountType],
    ["Price", productDetails.pricingAndStock.price],
    ["Status", productDetails.productInfo.status],
    ["Description", productDetails.productInfo.description],
  ];

  return (
    <Container>
      <Box
        sx={{
          mb: 5,
        }}
      >
        <SectionTitle
          title={"Product details"}
          description={"Full detail of a product"}
        />
      </Box>

      <Table>
        <TableBody
          sx={{
            border: "1px solid lightgray",
            overflow: "hidden",
          }}
        >
          {tableData.map(([label, value]) => (
            <TableRow key={label}>
              <TableCell
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  borderRight: "1px solid lightgray",
                  py: 3,
                }}
              >
                {label}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "18px",
                }}
              >
                {value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ProductDetail;
