/* eslint-disable react/prop-types */

import { Input, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Controller, useFormContext } from "react-hook-form";
import plusIcon from "../../assets/dashboard icons/plusIcon.svg";

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
            startIcon={
              <img
                src={plusIcon}
                alt="plus icon"
                style={{ width: 30, height: 30, filter: "invert(1)" }}
              />
            }
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
