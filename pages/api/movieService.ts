import http from "./http-common";

const getAll = () => {
  return http.get('/movies');
};

const get = (id: string) => {
  return http.get(`/movies/${id}`);
};

const create = (data: any) => {
  return http.get("/movies", data);
};

const update = (id: any, data: any) => {
  return http.put(`/movies/${id}`, data);
};

const remove = (id: any) => {
  return http.delete(`/movies/${id}`);
};

const removeAll = () => {
  return http.delete("/movies");
};

const findByTitle = (title: any) => {
  return http.get(`/tutorials?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};
