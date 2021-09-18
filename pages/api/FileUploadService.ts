import http from "./http-common";

const upload = (file: any, onUploadProgress: any) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/cartera_en_riesgo/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
};

const getFiles = () => {
  return http.get("/files");
};

export default { upload, getFiles };
