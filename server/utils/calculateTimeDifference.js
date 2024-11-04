export function calculateWorkHours(checkIn, checkOut) {
  const checkInTime = new Date(checkIn);
  const checkOutTime = new Date(checkOut);

  const workTimeMs = checkOutTime - checkInTime;

  const workTimeHours = Math.floor(workTimeMs / (1000 * 60 * 60)); // Total hours
  const workTimeMinutes = Math.floor(
    (workTimeMs % (1000 * 60 * 60)) / (1000 * 60)
  );

  const regularHours = 8;
  let overTimeHours = 0;
  let overTimeMinutes = 0;

  if (
    workTimeHours > regularHours ||
    (workTimeHours === regularHours && workTimeMinutes > 0)
  ) {
    // Calculate overtime in hours and minutes
    const totalOvertimeMinutes =
      (workTimeHours - regularHours) * 60 + workTimeMinutes;
    overTimeHours = Math.floor(totalOvertimeMinutes / 60);
    overTimeMinutes = totalOvertimeMinutes % 60;
  }

  // Return the results
  return {
    totalHours: workTimeHours,
    totalMinutes: workTimeMinutes,
    overTimeHours: overTimeHours,
    overTimeMinutes: overTimeMinutes,
  };
}
