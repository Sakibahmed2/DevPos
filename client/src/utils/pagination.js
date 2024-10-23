export const paginateFormateData = (data, page, limit = 5) => {
  if (!data || !data.length) return [];

  return data.slice(page * limit, (page + 1) * limit);
};
