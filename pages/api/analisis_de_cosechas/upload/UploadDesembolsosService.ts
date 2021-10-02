import http from "../../http-common";

const upload = (file: any, onUploadProgress: any) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/desembolsos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
};


export default { upload };
