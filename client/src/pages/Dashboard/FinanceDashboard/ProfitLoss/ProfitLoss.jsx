import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DPLoading from "../../../../components/ui/DPLoading";
import SectionTitle from "../../../../components/ui/SectionTitle";
import { useGetAllSalesQuery } from "../../../../redux/api/admin/paymentApi";
import { useGetAllExpensesQuery } from "../../../../redux/api/finance/expensesApi";
import formatDate from "../../../../utils/formateDate";

const ProfitLoss = () => {
  const { data: saleData, isLoading: saleLoading } = useGetAllSalesQuery();
  const { data: expenseData, isLoading: expenseLoading } =
    useGetAllExpensesQuery();

  if (saleLoading || expenseLoading) return <DPLoading />;

  const saleFormattedData = saleData?.data?.result.map((sale) => ({
    month: formatDate(new Date(sale.createdAt), "MMM yyyy"),
    income: {
      saleAmount: sale.amount,
      itemsSale: sale.products.length,
      due: sale.due,
      paid: sale.paid,
    },
  }));

  const expenseFormattedData = expenseData?.data?.result.map((expense) => ({
    month: formatDate(new Date(expense.createdAt), "MMM yyyy"),
    expenseAmount: expense.amount,
  }));

  return (
    <Box p={4}>
      {/* Heading Section */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <SectionTitle
          title="Profit & Loss"
          description="Overview of monthly profit and loss"
        />
      </Stack>

      {/* Table Section */}
      <Box
        mt={4}
        sx={{
          border: "1px solid #e0e0e0",
          p: 2,
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              {saleFormattedData.map((sale) => (
                <TableCell key={sale.month}>{sale.month}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Income Section */}
            <TableRow>
              <TableCell colSpan={saleFormattedData.length + 1}>
                <Typography variant="h6">Income</Typography>
              </TableCell>
            </TableRow>
            {Object.keys(saleFormattedData[0].income).map((key) => (
              <TableRow key={key}>
                <TableCell>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </TableCell>
                {saleFormattedData.map((sale) => (
                  <TableCell key={sale.month}>{sale.income[key]}</TableCell>
                ))}
              </TableRow>
            ))}

            {/* Expenses Section */}
            <TableRow>
              <TableCell colSpan={saleFormattedData.length + 1}>
                <Typography variant="h6">Expenses</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Expense Amount</TableCell>
              {expenseFormattedData.map((expense) => (
                <TableCell key={expense.month}>
                  {expense.expenseAmount}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default ProfitLoss;
