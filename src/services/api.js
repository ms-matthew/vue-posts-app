import axios from "axios";

// Konfiguracja bazowego URL
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Utworzenie instancji axios z domyślną konfiguracją
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 sekund timeout
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `✅ API Response: ${response.config.url} - Status: ${response.status}`
    );
    return response;
  },
  (error) => {
    console.error("Response Error:", error.response?.status, error.message);

    if (error.response?.status === 404) {
      console.error("Zasób nie został znaleziony");
    } else if (error.response?.status === 500) {
      console.error("Błąd serwera");
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
    }

    return Promise.reject(error);
  }
);

const postsAPI = {
  getAll() {
    return apiClient.get("/posts");
  },

  getById(id) {
    return apiClient.get(`/posts/${id}`);
  },

  getByUserId(userId) {
    return apiClient.get(`/posts?userId=${userId}`);
  },

  create(postData) {
    return apiClient.post("/posts", postData);
  },

  update(id, postData) {
    return apiClient.put(`/posts/${id}`, postData);
  },

  patch(id, postData) {
    return apiClient.patch(`/posts/${id}`, postData);
  },

  delete(id) {
    return apiClient.delete(`/posts/${id}`);
  },
};

const usersAPI = {
  getAll() {
    return apiClient.get("/users");
  },

  getById(id) {
    return apiClient.get(`/users/${id}`);
  },

  create(userData) {
    return apiClient.post("/users", userData);
  },

  update(id, userData) {
    return apiClient.put(`/users/${id}`, userData);
  },

  delete(id) {
    return apiClient.delete(`/users/${id}`);
  },
};

const commentsAPI = {
  getAll() {
    return apiClient.get("/comments");
  },

  getByPostId(postId) {
    return apiClient.get(`/comments?postId=${postId}`);
  },

  create(commentData) {
    return apiClient.post("/comments", commentData);
  },
};

export const api = {
  posts: postsAPI,
  users: usersAPI,
  comments: commentsAPI,
};

export { apiClient };

export default api;
