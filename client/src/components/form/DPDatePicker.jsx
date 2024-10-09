/* eslint-disable react/prop-types */
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useFormContext } from "react-hook-form";

const DPDatePicker = ({
  name,
  label,
  size = "medium",
  required,
  fullWidth = true,
  sx,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date())} // Ensure this is a valid Day.js object
      render={({ field: { onChange, value, ...field } }) => {
        const parsedValue = value ? dayjs(value) : null; // Convert value to Day.js if it's not null

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              disablePast
              onChange={(date) => onChange(date)}
              {...field}
              value={parsedValue} // Ensure the value passed is a Day.js object
              slotProps={{
                textField: {
                  required: required,
                  size: size,
                  fullWidth: fullWidth,
                  sx: { ...sx },
                  variant: "outlined",
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default DPDatePicker;
