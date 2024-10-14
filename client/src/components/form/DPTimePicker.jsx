/* eslint-disable react/prop-types */
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

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
      defaultValue={dayjs(new Date().toDateString())}
      name={name}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              {...field}
              label={label}
              value={value || null}
              onChange={(time) => onChange(time)}
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
