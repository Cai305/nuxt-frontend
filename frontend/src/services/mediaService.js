import http from "../http-common";

class MediaService {

  getAll() {
    return http.get("/media");
  }

  get(id) {
    return http.get(`/media/${id}`);
  }

  create(data) {
    return http.post("/media", data);
  }

  update(id, data) {
    return http.put(`/media/${id}`, data);
  }

  delete(id) {
    return http.delete(`/media/${id}`);
  }

  deleteAll() {
    return http.delete(`/media`);
  }

  findByTitle(src) {
    return http.get(`/media?title=${src}`);
  }
}

export default new MediaService();