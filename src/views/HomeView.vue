<template>
  <div class="home">
    <header class="page-header">
      <h1>Lista Postów</h1>
    </header>

    <PostsList />
  </div>
</template>

<script>
import PostsList from "@/components/PostsList.vue";

export default {
  name: "HomeView",
  components: {
    PostsList,
  },
};
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px 0;
}

.page-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 2.5em;
  font-weight: 300;
}

.subtitle {
  color: #666;
  font-size: 1.1em;
  margin: 0;
}

@media (max-width: 768px) {
  .home {
    padding: 15px;
  }

  .page-header h1 {
    font-size: 2em;
  }
}
</style>
