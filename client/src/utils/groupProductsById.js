function groupProductsById(products) {
  const productCount = {};

  products?.forEach((product) => {
    if (productCount[product._id]) {
      productCount[product._id].soldQuantity += 1;
    } else {
      productCount[product._id] = { ...product, soldQuantity: 1 };
    }
  });

  return Object.values(productCount);
}

export default groupProductsById;
