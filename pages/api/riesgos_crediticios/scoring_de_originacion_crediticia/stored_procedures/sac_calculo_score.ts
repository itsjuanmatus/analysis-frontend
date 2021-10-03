import http from "../../../http-common";

const create = (data: any) => {
  return http.post("/sp/sac_calculo_score", data);
};

export default { create };
