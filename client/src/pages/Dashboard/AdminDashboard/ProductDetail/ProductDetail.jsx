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

const productDetails = {
  product: "Laptop",
  category: "Computers",
  subCategory: "None",
  brand: "Waltion",
  unit: "Piece",
  sku: "PT007",
  minQty: 5,
  quantity: 50,
  tax: "0.00%",
  discountType: "Percentage",
  price: 5100.0,
  status: "Active",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
};

const ProductDetail = () => {
  const tableData = [
    ["Product", productDetails.product],
    ["Category", productDetails.category],
    ["Sub Category", productDetails.subCategory],
    ["Brand", productDetails.brand],
    ["Unit", productDetails.unit],
    ["SKU", productDetails.sku],
    ["Min Qty", productDetails.minQty],
    ["Quantity", productDetails.quantity],
    ["Tax", productDetails.tax],
    ["Discount Type", productDetails.discountType],
    ["Price", productDetails.price],
    ["Status", productDetails.status],
    ["Description", productDetails.description],
  ];

  const { id } = useParams();
  console.log(id);

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
