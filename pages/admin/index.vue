<template>
  <div class="d-flex admin-page">
    <Sidebar @change-content="currentComponent = $event" />
    <div class="flex-grow-1 p-4">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import Sidebar from "~/components/Sidebar.vue";
import StudentProfile from "~/components/StudentProfile.vue";
import StudentManagement from "~/components/StudentManagement.vue";

export default {
  name: "AdminPage",
  layout: "admin",
  components: {
    Sidebar,
    StudentProfile,
    StudentManagement,
  },
  data() {
    return {
      currentComponent: "StudentProfile",
    };
  },
};
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
}

/* Styles sẽ được thêm vào khi cần */
</style>
