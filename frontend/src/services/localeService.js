import http from "../http-common";

class LocaleService {
  getAll() {
    return http.get("/locale");
  }

  get(id) {
    return http.get(`/locale/${id}`);
  }

  create(data) {
    return http.post("/locale", data);
  }

  update(id, data) {
    return http.put(`/locale/${id}`, data);
  }

  delete(id) {
    return http.delete(`/locale/${id}`);
  }

  deleteAll() {
    return http.delete(`/locale`);
  }

  findByTitle(title) {
    return http.get(`/locale?title=${title}`);
  }
}

export default new LocaleService();
