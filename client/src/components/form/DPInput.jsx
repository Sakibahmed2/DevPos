/* eslint-disable react/prop-types */
import { InputAdornment, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const DPInput = ({
  name,
  label,
  type = "text",
  size = "medium",
  fullWidth = true,
  sx,
  required,
  rows,
  multiline,
  icon,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          placeholder={label}
          type={type}
          size={size}
          fullWidth={fullWidth}
          required={required}
          rows={rows}
          multiline={multiline}
          error={!!error}
          helperText={error?.message}
          variant="outlined"
          InputProps={{
            startAdornment: icon && (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default DPInput;
