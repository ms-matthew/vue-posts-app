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

// Interceptor dla requestów - można dodać token auth itp.
apiClient.interceptors.request.use(
  (config) => {
    // Można tu dodać token autoryzacji
    // config.headers.Authorization = `Bearer ${getToken()}`
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

// Interceptor dla odpowiedzi - obsługa błędów
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `✅ API Response: ${response.config.url} - Status: ${response.status}`
    );
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", error.response?.status, error.message);

    // Obsługa różnych kodów błędów
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

// API endpoints
const postsAPI = {
  // Pobierz wszystkie posty
  getAll() {
    return apiClient.get("/posts");
  },

  // Pobierz konkretny post
  getById(id) {
    return apiClient.get(`/posts/${id}`);
  },

  // Pobierz posty konkretnego użytkownika
  getByUserId(userId) {
    return apiClient.get(`/posts?userId=${userId}`);
  },

  // Stwórz nowy post
  create(postData) {
    return apiClient.post("/posts", postData);
  },

  // Zaktualizuj post
  update(id, postData) {
    return apiClient.put(`/posts/${id}`, postData);
  },

  // Częściowo zaktualizuj post
  patch(id, postData) {
    return apiClient.patch(`/posts/${id}`, postData);
  },

  // Usuń post
  delete(id) {
    return apiClient.delete(`/posts/${id}`);
  },
};

const usersAPI = {
  // Pobierz wszystkich użytkowników
  getAll() {
    return apiClient.get("/users");
  },

  // Pobierz konkretnego użytkownika
  getById(id) {
    return apiClient.get(`/users/${id}`);
  },

  // Stwórz nowego użytkownika
  create(userData) {
    return apiClient.post("/users", userData);
  },

  // Zaktualizuj użytkownika
  update(id, userData) {
    return apiClient.put(`/users/${id}`, userData);
  },

  // Usuń użytkownika
  delete(id) {
    return apiClient.delete(`/users/${id}`);
  },
};

const commentsAPI = {
  // Pobierz wszystkie komentarze
  getAll() {
    return apiClient.get("/comments");
  },

  // Pobierz komentarze dla konkretnego posta
  getByPostId(postId) {
    return apiClient.get(`/comments?postId=${postId}`);
  },

  // Stwórz nowy komentarz
  create(commentData) {
    return apiClient.post("/comments", commentData);
  },
};

// Eksport głównego obiektu API
export const api = {
  posts: postsAPI,
  users: usersAPI,
  comments: commentsAPI,
};

// Eksport instancji axios dla bardziej zaawansowanych przypadków
export { apiClient };

// Eksport domyślny
export default api;
