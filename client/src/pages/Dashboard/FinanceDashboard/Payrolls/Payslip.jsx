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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toWords } from "number-to-words";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import DPLoading from "../../../../components/ui/DPLoading";
import SectionTitle from "../../../../components/ui/SectionTitle";
import { useGetSinglePayrollsQuery } from "../../../../redux/api/finance/payrollsApi";
import formatDate from "../../../../utils/formateDate";

const Payslip = () => {
  const { id } = useParams();
  const { data: singlePayrolls, isLoading } = useGetSinglePayrollsQuery(id);
  const payslipRef = useRef(); // Reference to the payslip content

  if (isLoading) return <DPLoading />;

  const earningData = [
    { type: "Basic Salary", amount: singlePayrolls?.data?.basicSalary },
    { type: "HRA Allowance", amount: singlePayrolls?.data?.hraAllowance },
    { type: "Conveyance", amount: singlePayrolls?.data?.conveyance },
    { type: "Medical Allowance", amount: singlePayrolls?.data?.medical },
    { type: "Bonus", amount: singlePayrolls?.data?.bonus },
  ];

  const deductionsData = [
    { type: "Total deductions", amount: singlePayrolls?.data?.totalDeduction },
  ];

  // Function to handle download
  const handleDownload = async () => {
    const element = payslipRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 190; // Adjust for margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("payslip.pdf");
  };

  return (
    <Container>
      <Box>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <SectionTitle title={"Payslips"} />
          <Button
            onClick={handleDownload} // Trigger download on click
            startIcon={
              <img
                src={plusIcon}
                alt="plus icon"
                style={{ width: 30, height: 30 }}
              />
            }
          >
            Download
          </Button>
        </Stack>
      </Box>

      <Paper
        ref={payslipRef} // Set the reference here
        elevation={3}
        sx={{
          padding: 3,
          marginTop: 3,
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={600}>
            Payslip for the{" "}
            {formatDate(new Date(singlePayrolls?.data?.createdAt))}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack>
              <Typography variant="body1">
                Emp Name: {singlePayrolls?.data?.employee?.firstName}{" "}
                {singlePayrolls?.data?.employee?.lastName}
              </Typography>
              <Typography variant="body1">
                Emp Id: {singlePayrolls?.data?.employee?.employeeCode}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="body1">
                Pay in: {formatDate(new Date(singlePayrolls?.data?.createdAt))}
              </Typography>
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
                    {earningData.map((row) => (
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
                        <strong>${singlePayrolls?.data?.netSalary}</strong>
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
                        <strong>{singlePayrolls?.data?.totalDeduction}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>

          <Stack>
            <Typography variant="h6">
              Net Salary: ${singlePayrolls?.data?.netSalary}
            </Typography>
            <Typography variant="body1">
              In words: {toWords(singlePayrolls?.data?.netSalary)}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Payslip;
