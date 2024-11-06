import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import SectionTitle from "../../../../components/ui/SectionTitle";

// icons
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import eyeIcon from "../../../../assets/dashboard icons/visibility-icon.svg";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import PaginationUi from "../../../../components/ui/PaginationUi";
import EditPayrollsModal from "./EditPayrollsModal";
import CreatePayrollsModal from "./CreatePayrollsModal";
import {
  useDeletePayrollsMutation,
  useGetAllPayrollsQuery,
} from "../../../../redux/api/finance/payrollsApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { paginateFormateData } from "../../../../utils/pagination";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";

const Payrolls = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [createModal, setCreateModal] = useState(false);

  const { data: payrollsData, isLoading } = useGetAllPayrollsQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });
  const [deletePayrolls] = useDeletePayrollsMutation();

  if (isLoading) return <DPLoading />;

  const paginateData = paginateFormateData(payrollsData?.data?.result, page);

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting payroll...");
    try {
      const res = await deletePayrolls(id).unwrap();

      if (res?.success) {
        toast.success("Payroll deleted successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete payroll", { id: toastId });
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleModal = (productId) => {
    setOpen(true);
    setProductId(productId);
  };

  const columns = [
    {
      field: "employeeName",
      headerName: "Employee",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {row.employeeName}
            </Typography>
            {row.employeeRole && (
              <Typography variant="body2" color="textSecondary">
                {row.employeeRole}
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "employeeId",
      headerName: "Employee id",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.employeeId}</Typography>
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.email}</Typography>
          </Box>
        );
      },
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.salary}</Typography>
          </Box>
        );
      },
    },
    {
      field: "isPaid",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Chip
              variant="outlined"
              label={row.isPaid ? "Paid" : "Unpaid"}
              sx={{
                borderColor: row.isPaid ? "primary.main" : "red",
                color: row.isPaid ? "primary.main" : "red",
                borderRadius: 1,
                fontWeight: 500,
                px: 2,
              }}
            />
          </Box>
        );
      },
    },
    {
      field: "id",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              component={NavLink}
              to={`/finance/payroll/payslip/${row.id}`}
              sx={{
                border: "1px solid gray",
                borderRadius: 1,
                p: "5px 3px",
              }}
            >
              <img src={eyeIcon} alt="" className="w-5 h-5" />
            </Box>

            <Box
              onClick={() => handleModal(row.id)}
              component={"button"}
              sx={{
                border: "1px solid gray",
                borderRadius: 1,
                p: "5px 3px",
              }}
            >
              <img src={editIcons} alt="" className="w-5 h-5" />
            </Box>

            <Box
              component={"button"}
              onClick={() => handleDelete(row.id)}
              sx={{
                border: "1px solid gray",
                borderRadius: 1,
                p: "5px 3px",
              }}
            >
              <img src={deleteIcon} alt="" className="w-5 h-5" />
            </Box>
          </Stack>
        );
      },
    },
  ];

  const rows = paginateData.map((data) => {
    return {
      id: data._id,
      employeeName: `${data.employee.firstName} ${data.employee.lastName}`,
      employeeRole: data.employee.designation.name,
      employeeId: data.employee.employeeCode,
      email: data.employee.email,
      salary: data.netSalary,
      isPaid: data.isPaid,
    };
  });

  return (
    <Container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SectionTitle title={"Payrolls"} description={"Manage your payrolls"} />

        <Button
          onClick={() => setCreateModal(true)}
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

      <Box
        sx={{
          mt: 5,
          border: "1px solid lightgray",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            pt: 3,
            px: 2,
          }}
        >
          <Box
            sx={{
              width: "250px",
            }}
          >
            <TextField
              label="Search here"
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: <img src={searchIcon} />,
                },
              }}
            />
          </Box>

          <Box
            sx={{
              width: "170px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Sort by date</InputLabel>
              <Select
                value={sortBy}
                label="Sort by date"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value={"createdAt"}>Oldest First</MenuItem>
                <MenuItem value={"-createdAt"}>Newest First</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        {/* Table */}
        <Box
          sx={{
            mt: 5,
          }}
        >
          <DataGrid
            sx={{
              border: 0,
              borderTop: "1px solid lightgray",
            }}
            rows={rows}
            columns={columns}
            rowHeight={80}
            hideFooter
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Box>

      <Box>
        <PaginationUi
          totalItems={payrollsData?.data?.meta?.total}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Edit payrolls */}
      <EditPayrollsModal open={open} setOpen={setOpen} id={productId} />

      {/* Create modal */}
      <CreatePayrollsModal open={createModal} setOpen={setCreateModal} />
    </Container>
  );
};

export default Payrolls;
