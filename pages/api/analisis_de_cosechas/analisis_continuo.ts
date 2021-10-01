import http from "../http-common";

const create = (data: any) => {
  return http.post("/sp/analisis_continuo", data);
};

export default { create };



