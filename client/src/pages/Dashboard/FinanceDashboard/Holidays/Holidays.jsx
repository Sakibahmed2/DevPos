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
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import PaginationUi from "../../../../components/ui/PaginationUi";
import CreateHolidayModal from "./CreateHolidayModal";
import EditHolidayModal from "./EditHolidayModal";
import {
  useDeleteHolidaysMutation,
  useGetAllHolidaysQuery,
} from "../../../../redux/api/finance/holidaysApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { paginateFormateData } from "../../../../utils/pagination";
import formatDate from "../../../../utils/formateDate";
import { toast } from "sonner";

const Holidays = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [productId, setProductId] = useState(null);

  const { data: holidaysData, isLoading } = useGetAllHolidaysQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });
  const [deleteHoliday] = useDeleteHolidaysMutation();

  if (isLoading) return <DPLoading />;

  const paginateData = paginateFormateData(holidaysData?.data?.result, page);

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting holiday...");
    try {
      const res = await deleteHoliday(id).unwrap();

      if (res?.success) {
        toast.success("Holiday deleted successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete holiday", { id: toastId });
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
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.name}</Typography>
          </Box>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.date}</Typography>
          </Box>
        );
      },
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.duration} Days</Typography>
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created on",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.createdAt}</Typography>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Chip
              variant="outlined"
              label={row.status}
              sx={{
                borderColor: row.status === "Active" ? "primary.main" : "red",
                color: row.status === "Active" ? "primary.main" : "red",
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
      renderCell: ({ row }) => {
        return (
          <Stack
            direction={"row"}
            gap={1}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
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
      name: data.name,
      date: formatDate(new Date(data.startDate)),
      duration: data.duration,
      status: data.status,
      createdAt: formatDate(new Date(data.createdAt)),
    };
  });

  return (
    <Container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SectionTitle title={"Holidays"} description={"Manage your holidays"} />

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
          Add new holiday
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
          totalItems={holidaysData?.data?.meta?.total}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Edit holiday */}
      <EditHolidayModal open={open} setOpen={setOpen} id={productId} />

      {/* Add holiday */}
      <CreateHolidayModal open={createModal} setOpen={setCreateModal} />
    </Container>
  );
};

export default Holidays;
