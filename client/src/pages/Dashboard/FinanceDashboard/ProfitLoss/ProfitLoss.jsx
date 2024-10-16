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
import DPDatePicker from "../../../../components/form/DPDatePicker";
import DPForm from "../../../../components/form/DPForm";
import SectionTitle from "../../../../components/ui/SectionTitle";

const defaultValues = {
  from: new Date(),
  to: new Date(),
};

const ProfitLoss = () => {
  const data = [
    {
      month: "Jan 2024",
      income: {
        sales: "$4,02,124.00",
        service: "$4,02,124.00",
        purchaseReturn: "$4,02,124.00",
        grossProfit: "$4,02,124.00",
      },
      expenses: {
        sales: "$4,02,124.00",
        service: "$4,02,124.00",
        purchase: "$4,02,124.00",
        salesReturn: "$4,02,124.00",
        totalExpense: "$4,02,124.00",
        netProfit: "$4,02,124.00",
      },
    },
    {
      month: "Feb 2024",
      income: {
        sales: "$3,05,178.00",
        service: "$3,05,178.00",
        purchaseReturn: "$3,05,178.00",
        grossProfit: "$3,05,178.00",
      },
      expenses: {
        sales: "$3,05,178.00",
        service: "$3,05,178.00",
        purchase: "$3,05,178.00",
        salesReturn: "$3,05,178.00",
        totalExpense: "$3,05,178.00",
        netProfit: "$3,05,178.00",
      },
    },
    {
      month: "Mar 2024",
      income: {
        sales: "$5,61,639.00",
        service: "$5,61,639.00",
        purchaseReturn: "$5,61,639.00",
        grossProfit: "$5,61,639.00",
      },
      expenses: {
        sales: "$5,61,639.00",
        service: "$5,61,639.00",
        purchase: "$5,61,639.00",
        salesReturn: "$5,61,639.00",
        totalExpense: "$5,61,639.00",
        netProfit: "$5,61,639.00",
      },
    },
    {
      month: "Apr 2024",
      income: {
        sales: "$2,46,123.00",
        service: "$2,46,123.00",
        purchaseReturn: "$2,46,123.00",
        grossProfit: "$2,46,123.00",
      },
      expenses: {
        sales: "$2,46,123.00",
        service: "$2,46,123.00",
        purchase: "$2,46,123.00",
        salesReturn: "$2,46,123.00",
        totalExpense: "$2,46,123.00",
        netProfit: "$2,46,123.00",
      },
    },
    {
      month: "May 2024",
      income: {
        sales: "$2,16,836.00",
        service: "$2,16,836.00",
        purchaseReturn: "$2,16,836.00",
        grossProfit: "$2,16,836.00",
      },
      expenses: {
        sales: "$2,16,836.00",
        service: "$2,16,836.00",
        purchase: "$2,16,836.00",
        salesReturn: "$2,16,836.00",
        totalExpense: "$2,16,836.00",
        netProfit: "$2,16,836.00",
      },
    },
    {
      month: "Jun 2023",
      income: {
        sales: "$3,40,472.00",
        service: "$3,40,472.00",
        purchaseReturn: "$3,40,472.00",
        grossProfit: "$3,40,472.00",
      },
      expenses: {
        sales: "$3,40,472.00",
        service: "$3,40,472.00",
        purchase: "$3,40,472.00",
        salesReturn: "$3,40,472.00",
        totalExpense: "$3,40,472.00",
        netProfit: "$3,40,472.00",
      },
    },
  ];

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <Box p={4}>
      {/* Heading Section */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Stack>
          <SectionTitle
            title={"Profit loss"}
            description={"Manage your profit loss"}
          />
        </Stack>
        <DPForm onSubmit={onSubmit} defaultValue={defaultValues}>
          <Stack direction="row" spacing={2}>
            <DPDatePicker name={"from"} label={"From"} />
            <DPDatePicker name={"to"} label={"To"} />
          </Stack>
        </DPForm>
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
              <TableCell></TableCell>
              <TableCell>Jan 2024</TableCell>
              <TableCell>Feb 2024</TableCell>
              <TableCell>Mar 2024</TableCell>
              <TableCell>Apr 2024</TableCell>
              <TableCell>May 2024</TableCell>
              <TableCell>Jun 2023</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" colSpan={7}>
                <Typography variant="h6">Income</Typography>
              </TableCell>
            </TableRow>
            {Object.keys(data[0].income).map((key, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </TableCell>
                {data.map((monthData) => (
                  <TableCell key={monthData.month}>
                    {monthData.income[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            <TableRow>
              <TableCell component="th" scope="row" colSpan={7}>
                <Typography variant="h6">Expenses</Typography>
              </TableCell>
            </TableRow>
            {Object.keys(data[0].expenses).map((key) => (
              <TableRow key={key}>
                <TableCell>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </TableCell>
                {data.map((monthData) => (
                  <TableCell key={monthData.month}>
                    {monthData.expenses[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default ProfitLoss;
