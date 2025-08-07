<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

#app {
  min-height: 100vh;
}

button {
  font-family: inherit;
}

/* Globalne style dla przycisków */
button:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
</style>
