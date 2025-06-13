<template>
  <div class="admin-layout">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
};
</script>

<style>
body {
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.admin-layout {
  min-height: 100vh;
}
</style>
