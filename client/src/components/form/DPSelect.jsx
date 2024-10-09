/* eslint-disable react/prop-types */
import { MenuItem, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const DPSelect = ({
  items,
  name,
  label,
  size = "medium",
  required,
  fullWidth = true,
  sx,
}) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          sx={{
            ...sx,
          }}
          size={size}
          select
          label={label}
          required={required}
          fullWidth={fullWidth}
          error={isError}
          helperText={isError ? formState.errors[name]?.message : ""}
        >
          {items.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default DPSelect;
