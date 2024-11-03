export function calculateWorkHours(checkIn, checkOut) {
  // Convert checkIn and checkOut to Date objects
  const checkInTime = new Date(checkIn);
  const checkOutTime = new Date(checkOut);

  // Calculate the total work time in milliseconds
  const workTimeMs = checkOutTime - checkInTime;

  // Convert milliseconds to hours and minutes
  const workTimeHours = Math.floor(workTimeMs / (1000 * 60 * 60)); // Total hours
  const workTimeMinutes = Math.floor(
    (workTimeMs % (1000 * 60 * 60)) / (1000 * 60)
  ); // Remaining minutes

  // Determine overtime (if the work hours exceed 8 hours)
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
