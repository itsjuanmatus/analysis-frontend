import http from "./http-common";

const create = (data: any) => {
  return http.post("/sp/analisis_de_cosechas", data);
};

export default { create };



