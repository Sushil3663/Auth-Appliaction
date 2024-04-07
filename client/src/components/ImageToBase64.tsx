export const ImageToBase64 = async (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  const data = new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  return data;
};
