import { Button, Container, Stack } from "@mui/material";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import PaginationUi from "../../../../components/ui/PaginationUi";
import SectionTitle from "../../../../components/ui/SectionTitle";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

// icons
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DPLoading from "../../../../components/ui/DPLoading";
import {
  useDeleteSubCategoriesMutation,
  useGetAllSubCategoriesQuery,
} from "../../../../redux/api/admin/subCategoriesApi";
import { paginateFormateData } from "../../../../utils/pagination";
import CreateSubCategoryModal from "./CreateSubCategoryModal";
import EditSubCategory from "./EditSubCategory";
import { toast } from "sonner";

const SubCategory = () => {
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [createCategoriesModal, setCreateCategoriesModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const {
    data: subCategoryData,
    isLoading,
    refetch,
  } = useGetAllSubCategoriesQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });
  const [deleteSubCategories] = useDeleteSubCategoriesMutation();

  if (isLoading) {
    return <DPLoading />;
  }

  const limit = subCategoryData?.data?.meta?.limit;
  const paginateData = paginateFormateData(
    subCategoryData?.data?.result,
    page,
    limit
  );

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting category...");
    try {
      const res = await deleteSubCategories(id).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
        refetch();
      }
    } catch (err) {
      console.log(err);
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
      field: "category",
      headerName: "Category ",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.category}</Typography>
          </Box>
        );
      },
    },
    {
      field: "parentCategory",
      headerName: "Parent category",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.parentCategory}</Typography>
          </Box>
        );
      },
    },
    {
      field: "categoryCode",
      headerName: "Category code",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.categoryCode}</Typography>
          </Box>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.description}</Typography>
          </Box>
        );
      },
    },
    {
      field: "createdBy",
      headerName: "Created by",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.createdBy}</Typography>
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
      category: data.name,
      parentCategory: data.parentCategory.name,
      categoryCode: data.code,
      description: data.description,
      createdBy: data.createdBy.name,
    };
  });
  return (
    <Container>
      {/* section title */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SectionTitle
          title={"Sub categories list"}
          description={"Manage your sub categories"}
        />

        <Button
          onClick={() => setCreateCategoriesModal(true)}
          startIcon={
            <img
              src={plusIcon}
              alt="plus icon"
              style={{ width: 30, height: 30 }}
            />
          }
        >
          Add new sub category
        </Button>
      </Stack>

      {/* data table */}
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
          totalItems={subCategoryData?.data?.meta?.total}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Edit category modal */}
      <EditSubCategory open={open} setOpen={setOpen} id={productId} />

      {/* Create category modal */}
      <CreateSubCategoryModal
        open={createCategoriesModal}
        setOpen={setCreateCategoriesModal}
      />
    </Container>
  );
};

export default SubCategory;
