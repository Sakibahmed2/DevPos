/* eslint-disable react/prop-types */
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";

const PaginationUi = ({ totalItems, itemsPerPage = 5, onPageChange }) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(page);
    }
  }, [page, onPageChange]);

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        mx: 3,
        mt: 4,
      }}
    >
      {/* Pagination information */}
      <span className="font-semibold">{`${page * itemsPerPage + 1}-${Math.min(
        (page + 1) * itemsPerPage,
        totalItems
      )} of ${totalItems} items`}</span>

      {/* Pagination controls */}
      <Box
        display="flex"
        alignItems="center"
        sx={{
          border: "1px solid lightgray",
          borderRadius: "5px",
        }}
      >
        <Button
          onClick={handlePrevious}
          disabled={page === 0}
          variant="text"
          sx={{
            color: "black",
          }}
        >
          Previous
        </Button>

        <Box
          sx={{
            backgroundColor: "#00C853",
            color: "white",
            p: "10px 8px",
            borderRadius: "5px",
            mx: 1,
          }}
        >
          {page}
        </Box>

        <Button
          onClick={handleNext}
          disabled={page >= totalPages - 1}
          variant="text"
          sx={{
            color: "black",
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PaginationUi;
