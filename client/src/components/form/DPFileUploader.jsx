/* eslint-disable react/prop-types */
"use client";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Input, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Controller, useFormContext } from "react-hook-form";

export default function DPFileUploader({ name, label, sx }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <Button
            component="label"
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              color: "gray",
              width: 200,
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "8px",
              cursor: "pointer",
              ...sx,
            }}
            startIcon={<AddCircleOutlineIcon />}
            variant="text"
          >
            {label || "Upload file"}
            <Input
              {...field}
              type="file"
              onChange={(e) => onChange(e?.target?.files?.[0])}
              style={{ display: "none" }}
            />
            {value && (
              <Typography variant="caption" sx={{ marginTop: 1 }}>
                {value?.name}
              </Typography>
            )}
          </Button>
        );
      }}
    />
  );
}
