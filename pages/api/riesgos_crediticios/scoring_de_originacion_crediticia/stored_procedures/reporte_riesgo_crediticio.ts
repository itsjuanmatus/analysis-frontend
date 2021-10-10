import http from "../../../http-common";

const create = (data: any) => {
  return http.post("/sp/reporte_riesgo_crediticio", data);
};

export default { create };
