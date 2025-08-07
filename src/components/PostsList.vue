<template>
  <div class="posts-list-container">
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>Ładowanie postów...</p>
    </div>

    <div v-else-if="paginatedPosts.length === 0" class="no-posts">
      <p>Brak postów do wyświetlenia</p>
    </div>

    <div v-else class="posts-content">
      <div class="posts-summary">
        <span
          >Wyświetlanie {{ paginatedPosts.length }} z
          {{ totalPosts }} postów</span
        >
      </div>

      <transition-group name="post-list" tag="div" class="posts-grid">
        <PostCard v-for="post in paginatedPosts" :key="post.id" :post="post" />
      </transition-group>

      <Pagination />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PostCard from "./PostCard.vue";
import Pagination from "./PostsPagination.vue";

export default {
  name: "PostsList",

  components: {
    PostCard,
    Pagination,
  },

  computed: {
    ...mapState(["loading"]),
    ...mapGetters(["paginatedPosts"]),

    totalPosts() {
      return this.$store.state.posts.length;
    },
  },

  async created() {
    // Pobierz dane przy inicjalizacji komponentu
    if (this.$store.state.posts.length === 0) {
      await Promise.all([
        this.$store.dispatch("fetchPosts"),
        this.$store.dispatch("fetchUsers"),
      ]);
    }
  },
};
</script>

<style scoped>
.posts-list-container {
  width: 100%;
}

.loading {
  text-align: center;
  padding: 60px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.no-posts {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 1.1em;
}

.posts-content {
  min-height: 60vh;
}

.posts-summary {
  margin-bottom: 20px;
  color: #666;
  font-size: 0.9em;
  text-align: right;
  padding: 0 5px;
}

.posts-grid {
  margin-bottom: 40px;
}

/* Animacje dla listy postów */
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}

.post-list-enter-from {
  opacity: 0;
}

.post-list-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .posts-summary {
    text-align: center;
    font-size: 0.8em;
  }
}
</style>
