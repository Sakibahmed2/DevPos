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
import laptopImg from "../../../../assets/laptopPng.png";
import EditSubCategory from "./EditSubCategory";

// table data
const tableData = [
  {
    id: 1,
    categoryImg: laptopImg,
    category: "Laptop",
    parentCategory: "Electronics",
    categoryCode: "LPTP",
    description: "This is a laptop",
    createdBy: "admin",
  },
  {
    id: 2,
    categoryImg: laptopImg,
    category: "Laptop",
    parentCategory: "Electronics",
    categoryCode: "LPTP",
    description: "This is a laptop",
    createdBy: "admin",
  },
  {
    id: 3,
    categoryImg: laptopImg,
    category: "Laptop",
    parentCategory: "Electronics",
    categoryCode: "LPTP",
    description: "This is a laptop",
    createdBy: "admin",
  },
  {
    id: 4,
    categoryImg: laptopImg,
    category: "Laptop",
    parentCategory: "Electronics",
    categoryCode: "LPTP",
    description: "This is a laptop",
    createdBy: "admin",
  },
];

const SubCategory = () => {
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);

  // const itemsPerPage = 3 ;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleModal = (productId) => {
    setOpen(true);
    setProductId(productId);
  };

  const columns = [
    {
      field: "categoryImg",
      headerName: "Img",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <img src={row.categoryImg} alt="laptop" className="h-8 w-12" />
          </Box>
        );
      },
    },
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

  const rows = tableData.map((data) => {
    return {
      id: data.id,
      categoryImg: data.categoryImg,
      category: data.category,
      parentCategory: data.parentCategory,
      categoryCode: data.categoryCode,
      description: data.description,
      createdBy: data.createdBy,
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
          title={"Categories"}
          description={"Manage your categories"}
        />

        <Button
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
                <MenuItem value={"date"}>date</MenuItem>
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
          totalItems={tableData.length}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Edit category modal */}
      <EditSubCategory open={open} setOpen={setOpen} id={productId} />
    </Container>
  );
};

export default SubCategory;
