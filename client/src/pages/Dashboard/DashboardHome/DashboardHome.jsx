import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import totalPurchase from "../../../assets/dashboard icons/total-purchase.svg";
import totalSales from "../../../assets/dashboard icons/total-sales.svg";
import totalExpanse from "../../../assets/dashboard icons/total-expense.svg";
import totalAmount from "../../../assets/dashboard icons/total-amount.svg";
import ReactApexChart from "react-apexcharts";
import RecentProducts from "../../../components/dashboard/admin/AdminDashboard/RecentProducts";
import { useGetAllPurchaseQuery } from "../../../redux/api/admin/purchaseApi";
import DPLoading from "../../../components/ui/DPLoading";
import { useGetAllSalesQuery } from "../../../redux/api/admin/paymentApi";
import { useGetAllExpensesQuery } from "../../../redux/api/finance/expensesApi";
import { useGetAllEmployeesQuery } from "../../../redux/api/finance/employeesApi";
import { useGetAllUsersQuery } from "../../../redux/api/auth/authApi";

const DashboardHome = () => {
  const { data: purchaseData, isLoading: purchaseLoading } =
    useGetAllPurchaseQuery({});
  const { data: saleData, isLoading: saleLoading } = useGetAllSalesQuery({});
  const { data: expenseData, isLoading: expenseLoading } =
    useGetAllExpensesQuery({});
  const { data: employeesData, isLoading: employeeLoading } =
    useGetAllEmployeesQuery({});
  const { data: usersData, isLoading: userLoading } = useGetAllUsersQuery({});

  if (
    purchaseLoading ||
    saleLoading ||
    expenseLoading ||
    employeeLoading ||
    userLoading
  )
    return <DPLoading />;

  const totalPurchaseDue = purchaseData?.data?.result?.reduce(
    (acc, item) => acc + item.due,
    0
  );

  const totalSalesDue = saleData?.data?.result?.reduce(
    (acc, item) => acc + item.due,
    0
  );

  const totalSaleAmount = saleData?.data?.result?.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const totalExpenseAmount = expenseData?.data?.result?.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const cardData = [
    {
      title: "Total Purchase Due",
      value: totalPurchaseDue,
      icon: totalPurchase,
    },
    {
      title: "Total Sales Due",
      value: totalSalesDue.toFixed(2),
      icon: totalSales,
    },
    {
      title: "Total Sale Amount",
      value: totalSaleAmount.toFixed(2),
      icon: totalAmount,
    },
    {
      title: "Total Expense Amount",
      value: totalExpenseAmount.toFixed(2),
      icon: totalExpanse,
    },
  ];

  const formateSaleDataForChart = Array(12).fill({ sales: 0, view: 0 });

  saleData?.data?.result?.forEach((item) => {
    const month = new Date(item.createdAt).getMonth();
    formateSaleDataForChart[month] = {
      sales: (formateSaleDataForChart[month]?.sales || 0) + item.amount,
      view: (formateSaleDataForChart[month]?.view || 0) + 1,
    };
  });

  // Update chart series with formatted data
  const lineChartSeries = [
    {
      name: "Sales",
      data: formateSaleDataForChart.map((data) => data.sales),
    },
    {
      name: "Views",
      data: formateSaleDataForChart.map((data) => data.view),
    },
  ];

  const lineChartOptions = {
    chart: {
      type: "line",
    },
    labels: ["sales", "view"],
    title: {
      text: "Sales & view",
      align: "left",
    },
    colors: ["#008FFB", "#FF4560"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      min: 5000,
      max: 40000,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  const pieChartOptions = {
    chart: {
      type: "donut",
    },
    colors: ["#FF4560", "#775DD0"],
    labels: ["Staff", "Other"],
    title: {
      text: "Total Staff",
      align: "left",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const pieChartSeries = [
    employeesData?.data?.meta?.total,
    usersData?.data?.meta?.total,
  ];

  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "600" }}>
          Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Hi sakib, welcome back to admin dashboard
        </Typography>
      </Box>

      <Grid2 container spacing={2}>
        {cardData.map((item, index) => (
          <Grid2
            item
            size={{
              xs: 12,
              sm: 6,
              md: 6,
              lg: 3,
              xl: 3,
            }}
            key={index}
          >
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                padding: "30px 20px",
                marginBottom: 2,
                borderRadius: 3,
                border: "1px solid lightgray",
                width: "100%",
                maxWidth: "335px",
              }}
              className="shadow-sm"
            >
              <Box
                sx={{
                  p: 2,
                  bgcolor: "rgba(0, 176, 117, 0.09)",
                  borderRadius: "100%",
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={item.icon} alt="icon" className="" />
              </Box>

              <Box>
                <Typography variant="h5" sx={{ fontWeight: "700" }}>
                  ${item.value}
                </Typography>
                <Typography component={"p"}>{item.title}</Typography>
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>

      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          height: "406px",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: "65%",
            height: "100%",
            p: "10px 20px",
            border: "1px solid lightgray",
            borderRadius: 2,
          }}
        >
          <ReactApexChart
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height={350}
          />
        </Box>
        <Box
          sx={{
            p: "10px 20px",
            border: "1px solid lightgray",
            borderRadius: 2,
            height: "100%",
            width: "35%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactApexChart
            options={pieChartOptions}
            series={pieChartSeries}
            type="donut"
            width={380}
          />
        </Box>
      </Stack>

      <Box>
        <RecentProducts />
      </Box>
    </Container>
  );
};

export default DashboardHome;
