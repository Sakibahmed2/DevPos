/* eslint-disable react/prop-types */

import { Input, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Controller, useFormContext } from "react-hook-form";
import plusIcon from "../../assets/dashboard icons/plusIcon.svg";
import { useState, useEffect } from "react";

export default function DPFileUploader({ name, label, sx, defaultImage }) {
  const { control } = useFormContext();
  const [preview, setPreview] = useState(defaultImage);

  useEffect(() => {
    setPreview(defaultImage);
  }, [defaultImage]);

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
              backgroundImage: preview ? `url(${preview})` : "none",
              backgroundSize: "cover",
              ...sx,
            }}
            startIcon={
              !preview && (
                <img
                  src={plusIcon}
                  alt="plus icon"
                  style={{
                    width: 30,
                    height: 30,
                    filter: "invert(1)",
                    display: "flex",
                    marginLeft: "10px",
                  }}
                />
              )
            }
            variant="text"
          >
            {label || "Upload file"}
            <Input
              {...field}
              type="file"
              onChange={(e) => {
                const file = e?.target?.files?.[0];
                onChange(file);
                setPreview(file ? URL.createObjectURL(file) : defaultImage);
              }}
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
