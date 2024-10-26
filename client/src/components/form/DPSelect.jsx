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
          {items?.map((item, idx) => (
            <MenuItem key={idx} value={item.value ? item.value : item}>
              {item.name ? item.name : item}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default DPSelect;
