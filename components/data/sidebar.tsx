import * as Icons from "react-bootstrap-icons";

const sidebar = [
  {
    name: "Consolidados",
    path: "consolidados",
    items: [
      {
        anchor: "Matriz de Riesgos",
        subpath: "matriz_de_riesgos",
        icon: <Icons.PersonCheck />,
      },
      {
        anchor: "Monitoreo de indicadores",
        subpath: "monitoreo_de_indicadores",
        icon: <Icons.People />,
      },
    ],
  },
  {
    name: "Riesgos Crediticios",
    path: "riesgos_crediticios",
    items: [
      {
        anchor: "Scoring de Originación Crediticia",
        subpath: "scoring_de_originacion_crediticia",
        icon: <Icons.FileEarmarkCheck />,
      },
      {
        anchor: "Matriz de Transición Crediticia",
        subpath: "matriz_de_transicion_crediticia",
        icon: <Icons.FileEarmarkCheck />,
      },
      {
        anchor: "Análisis de cosechas de crédito",
        subpath: "analisis_de_cosechas_de_credito",
        icon: <Icons.FileEarmarkCheck />,
      },
      {
        anchor: "Análisis de endeudamientos",
        subpath: "analisis_de_endeudamientos",
        icon: <Icons.FileEarmarkCheck />,
      },
      {
        anchor: "Análisis de exposición al riesgo climático",
        subpath: "analisis_de_exposicion_al_riesgo_climatico",
        icon: <Icons.FileEarmarkCheck />,
      },
    ],
  },
  {
    name: "Riesgos Financieros",
    path: "riesgos_financieros",
    items: [
      {
        anchor: "Análisis de brechas de liquidez",
        subpath: "analisis_de_brechas_de_liquidez",
        icon: <Icons.Wallet2 />,
      },
      {
        anchor: "Análisis de exposición por riesgos de mercado",
        subpath: "analisis_de_exposicion_por_riesgos_de_mercado",
        icon: <Icons.FileEarmarkMedical />,
      },
    ],
  },
  {
    name: "Riesgos Operacionales",
    path: "riesgos_operacionales",
    items: [
      {
        anchor: "Riesgos Operacionales",
        subpath: "",
        icon: <Icons.CreditCard2Front />,
      }
    ],
  },
];

export default sidebar;
