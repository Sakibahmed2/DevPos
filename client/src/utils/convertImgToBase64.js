const convertImgToBase64 = async (img) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result); // Resolve the base64 result
    reader.onerror = (err) => reject("Base64 Error: " + err); // Reject on error
    reader.readAsDataURL(img); // Start reading the file
  });
};

export default convertImgToBase64;
