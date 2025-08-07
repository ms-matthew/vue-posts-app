<template>
  <nav class="pagination-nav" v-if="totalPages > 1">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="pagination-btn prev-btn"
    >
      ‹ Poprzednia
    </button>

    <div class="pagination-numbers">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'pagination-btn',
          'page-btn',
          { active: page === currentPage },
        ]"
      >
        {{ page }}
      </button>
    </div>

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="pagination-btn next-btn"
    >
      Następna ›
    </button>

    <div class="pagination-info">
      Strona {{ currentPage }} z {{ totalPages }}
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "PostsPagination",

  computed: {
    ...mapState(["currentPage"]),
    ...mapGetters(["totalPages"]),

    visiblePages() {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);

      // Dostosuj start jeśli end jest na końcu
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
  },

  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$store.dispatch("changePage", page);
        // scroll do gory strony po zmianie
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  },
};
</script>

<style scoped>
.pagination-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 30px 0;
  flex-wrap: wrap;
}

.pagination-btn {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  color: #333;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 14px;
}

.pagination-btn:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #007bff;
  color: #007bff;
}

.pagination-btn:disabled {
  background: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.page-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.page-btn.active:hover {
  background: #0056b3;
  border-color: #0056b3;
  color: white;
}

.pagination-numbers {
  display: flex;
  gap: 5px;
}

.prev-btn,
.next-btn {
  font-weight: 500;
}

.pagination-info {
  font-size: 14px;
  color: #666;
  margin-left: 15px;
}

@media (max-width: 768px) {
  .pagination-nav {
    flex-direction: column;
    gap: 15px;
  }

  .pagination-info {
    margin-left: 0;
  }
}
</style>
