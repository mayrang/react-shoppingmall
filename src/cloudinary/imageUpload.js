import axios from "axios";

export const imageUpload = async (files) => {
  const formData = new FormData();
  formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);

  formData.append("timestamp", (Date.now() / 1000) | 0);
  formData.append("file", files[0]);

  formData.append("upload_preset", "react-shoppingmall");

  const config = {
    header: {
      "Content-Type": "multipart/form-data",
    },
  };
  console.log(123);
  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const result = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, config);

  console.log(result.data.url);
};
