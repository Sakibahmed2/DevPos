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
      defaultValue={dayjs(new Date())}
      render={({ field: { onChange, value, ...field } }) => {
        const parsedValue = value ? dayjs(value) : null;

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              onChange={(date) => onChange(date)}
              {...field}
              value={parsedValue}
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
