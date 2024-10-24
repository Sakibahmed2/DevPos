const convertImgToBase64 = async (img) => {
  return new Promise((resolve, reject) => {
    // Validation: Check if the input is a File or Blob
    if (!(img instanceof Blob)) {
      return reject("Invalid input: The provided value is not a File or Blob.");
    }

    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject("Base64 Error: " + err);

    reader.readAsDataURL(img);
  });
};

export default convertImgToBase64;
