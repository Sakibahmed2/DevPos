import { Box, Container, Stack, Typography } from "@mui/material";
import totalPurchase from "../../../assets/dashboard icons/total-purchase.svg";
import totalSales from "../../../assets/dashboard icons/total-sales.svg";
import totalExpanse from "../../../assets/dashboard icons/total-expense.svg";
import totalAmount from "../../../assets/dashboard icons/total-amount.svg";
import ReactApexChart from "react-apexcharts";
import RecentProducts from "../../../components/dashboard/admin/AdminDashboard/RecentProducts";

const cardData = [
  {
    title: "Total Purchase Due",
    value: 253.32,
    icon: totalPurchase,
  },
  {
    title: "Total Sales Due",
    value: 253.32,
    icon: totalSales,
  },
  {
    title: "Total Sale Amount",
    value: 253.32,
    icon: totalAmount,
  },
  {
    title: "Total Expense Amount",
    value: 253.32,
    icon: totalExpanse,
  },
];

const DashboardHome = () => {
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

  const lineChartSeries = [
    {
      name: "2023",
      data: [
        12000, 19000, 18000, 22000, 32000, 39000, 36000, 28000, 25000, 24000,
        25000, 24000,
      ],
    },
    {
      name: "2024",
      data: [
        15000, 30000, 16000, 20000, 28000, 32000, 36000, 34000, 30000, 18000,
        28000, 36000,
      ],
    },
  ];

  // Data for the pie chart
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

  const pieChartSeries = [81, 19];

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

      <Stack direction={"row"} gap={3}>
        {cardData.map((item, index) => (
          <Box
            key={index}
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
        ))}
      </Stack>

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
