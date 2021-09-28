import http from "./http-common";

const create = (data: any) => {
  return http.post("/sp/analisis_de_cosechas", data);
};

export default { create };

/* export default function CallAnalisisDeCosechas(transaction: any) {
  return fetch(
    "https://dataanalysisapp.uc.r.appspot.com/sp/analisis_de_cosechas",
    {
      method: "POST",
      body: JSON.stringify({ transaction }),
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else return null;
    })
    .catch((error) => error);
} */
