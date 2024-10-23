export const convertDataForSelect = (data) => {
  if (!data || !data.length) return [];

  return data.map((category) => ({
    value: category._id,
    name: category.name,
  }));
};
