import axios from "axios";

export default axios.create({
  baseURL: "https://dataanalysisapp.uc.r.appspot.com/",
  headers: {
    "Content-type": "application/json"
  }
});
