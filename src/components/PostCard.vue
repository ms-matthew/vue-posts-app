<template>
  <div class="post-card">
    <div class="post-header">
      <h3 class="post-title">{{ post.title }}</h3>
      <button @click="deletePost" class="delete-btn" title="Usuń post">
        ✕
      </button>
    </div>

    <div class="post-content">
      <p v-if="!showFull" class="post-body">
        {{ truncatedBody }}
        <button
          @click="showFull = true"
          class="show-more-btn"
          v-if="isTruncated"
        >
          pokaż więcej
        </button>
      </p>
      <p v-else class="post-body">
        {{ post.body }}
        <button @click="showFull = false" class="show-more-btn">
          pokaż mniej
        </button>
      </p>
    </div>

    <div class="post-author">
      <span class="author-label">Autor:</span>
      <span class="author-name">{{ authorName }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PostCard",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showFull: false,
      truncateLength: 100,
    };
  },

  computed: {
    ...mapGetters(["getUserById"]),

    truncatedBody() {
      if (this.post.body.length <= this.truncateLength) {
        return this.post.body;
      }
      return this.post.body.substring(0, this.truncateLength) + "...";
    },

    isTruncated() {
      return this.post.body.length > this.truncateLength;
    },

    authorName() {
      const author = this.getUserById(this.post.userId);
      return author ? author.name : "Nieznany autor";
    },
  },

  methods: {
    deletePost() {
      if (confirm("Czy na pewno chcesz usunąć ten post?")) {
        this.$store.dispatch("deletePost", this.post.id);
      }
    },
  },
};
</script>

<style scoped>
.post-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.post-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.post-title {
  margin: 0;
  color: #333;
  font-size: 1.2em;
  line-height: 1.4;
  flex: 1;
  margin-right: 15px;
}

.delete-btn {
  background: #ff4757;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.delete-btn:hover {
  background: #ff3838;
}

.post-content {
  margin-bottom: 15px;
}

.post-body {
  margin: 0;
  line-height: 1.6;
  color: #666;
}

.show-more-btn {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin-left: 5px;
  font-size: inherit;
}

.show-more-btn:hover {
  color: #0056b3;
}

.post-author {
  font-size: 0.9em;
  color: #888;
  border-top: 1px solid #f0f0f0;
  padding-top: 10px;
}

.author-label {
  font-weight: 500;
}

.author-name {
  color: #333;
  font-weight: 600;
}
</style>
