/* eslint-disable react/prop-types */
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, useFormContext } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs"; // Make sure you import dayjs

const DPTimePicker = ({
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
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              {...field}
              label={label}
              value={value ? dayjs(value) : null} // Ensure value is a Day.js object or null
              onChange={(time) => {
                // Ensure the onChange updates the form state
                onChange(time ? time.toISOString() : null); // Store as ISO string
              }}
              timezone="system"
              slotProps={{
                textField: {
                  required: required,
                  size: size,
                  sx: { ...sx },
                  variant: "outlined",
                  fullWidth: fullWidth,
                  error: isError,
                  helperText: isError ? formState.errors[name]?.message : "",
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default DPTimePicker;
