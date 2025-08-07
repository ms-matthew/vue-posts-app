import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    posts: [],
    users: [],
    loading: false,
    currentPage: 1,
    postsPerPage: 10,
    totalPosts: 0,
  },

  getters: {
    paginatedPosts: (state) => {
      const start = (state.currentPage - 1) * state.postsPerPage;
      const end = start + state.postsPerPage;
      return state.posts.slice(start, end);
    },

    totalPages: (state) => {
      return Math.ceil(state.totalPosts / state.postsPerPage);
    },

    getUserById: (state) => (userId) => {
      return state.users.find((user) => user.id === userId);
    },
  },

  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
      state.totalPosts = posts.length;
    },

    SET_USERS(state, users) {
      state.users = users;
    },

    SET_LOADING(state, loading) {
      state.loading = loading;
    },

    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },

    DELETE_POST(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId);
      state.totalPosts = state.posts.length;

      const maxPage = Math.ceil(state.posts.length / state.postsPerPage);
      if (state.currentPage > maxPage && maxPage > 0) {
        state.currentPage = maxPage;
      }
    },
  },

  actions: {
    async fetchPosts({ commit }) {
      try {
        commit("SET_LOADING", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        commit("SET_POSTS", response.data);
      } catch (error) {
        console.error("Błąd przy pobieraniu postów:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchUsers({ commit }) {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        commit("SET_USERS", response.data);
      } catch (error) {
        console.error("Błąd przy pobieraniu użytkowników:", error);
      }
    },

    changePage({ commit, getters }, page) {
      if (page >= 1 && page <= getters.totalPages) {
        commit("SET_CURRENT_PAGE", page);
      }
    },

    async deletePost({ commit }, postId) {
      try {
        await axios.delete(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        commit("DELETE_POST", postId);
        console.log(`Post o ID ${postId} został usunięty`);
      } catch (error) {
        console.error("Błąd przy usuwaniu posta:", error);
        commit("DELETE_POST", postId);
      }
    },
  },
});
