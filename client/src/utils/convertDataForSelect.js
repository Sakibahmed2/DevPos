export const convertDataForSelect = (data) => {
  if (!data || !data.length) return [];

  return data.map((item) => ({
    value: item._id,
    name: item.name,
  }));
};
