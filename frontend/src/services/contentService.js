import http from "../http-common";

class ContentService {

  getAll() {
    return http.get("/content");
  }

  get(id) {
    return http.get(`/content/${id}`);
  }

  create(data) {
    return http.post("/content", data);
  }

  update(id, data) {
    return http.put(`/content/${id}`, data);
  }

  delete(id) {
    return http.delete(`/content/${id}`);
  }

  deleteAll() {
    return http.delete(`/content`);
  }

  findByTitle(title) {
    return http.get(`/content?title=${title}`);
  }
}

export default new ContentService();