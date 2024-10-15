import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import SectionTitle from "../../../../components/ui/SectionTitle";

const Payslip = () => {
  const earningsData = [
    { type: "Basic Salary", amount: 32000 },
    { type: "HRA Allowance", amount: 0 },
    { type: "Conveyance", amount: 0 },
    { type: "Medical Allowance", amount: 0 },
    { type: "Bonus", amount: 0 },
  ];

  const deductionsData = [
    { type: "PF", amount: 0 },
    { type: "Professional Tax", amount: 0 },
    { type: "TDS", amount: 0 },
    { type: "Loans & Others", amount: 0 },
    { type: "Bonus", amount: 0 },
  ];

  return (
    <Container>
      <Box>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <SectionTitle title={"Payrolls"} />

          <Button
            startIcon={
              <img
                src={plusIcon}
                alt="plus icon"
                style={{ width: 30, height: 30 }}
              />
            }
          >
            Add new payrolls
          </Button>
        </Stack>
      </Box>

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginTop: 3,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={600}>
            Payslip for the Month of Sep 2024
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack>
              <Typography variant="body1">Emp Name: Md Tanjid</Typography>
              <Typography variant="body1">Emp Id: POS1234</Typography>
            </Stack>
            <Stack>
              <Typography variant="body1">Location: Bangladesh</Typography>
              <Typography variant="body1">Pay Period: Sep 2024</Typography>
            </Stack>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                Earnings
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Pay Type</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {earningsData.map((row) => (
                      <TableRow key={row.type}>
                        <TableCell>{row.type}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <strong>Total Earnings</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>32,000</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                Deduction
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Pay Type</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deductionsData.map((row) => (
                      <TableRow key={row.type}>
                        <TableCell>{row.type}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>
                        <strong>Total Deductions</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>0.00</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>

          <Stack>
            <Typography variant="h6">Net Salary: $32,000</Typography>
            <Typography variant="body1">
              In words: Thirty Two Thousand Only
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Payslip;
