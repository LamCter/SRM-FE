<template>
  <div class="d-flex">
    <Sidebar @change-content="handleContentChange" />
    <div class="flex-grow-1">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import StudentProfile from "./components/StudentProfile.vue";
import StudentManagement from "./components/StudentManagement.vue";

export default {
  name: "App",
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
  methods: {
    handleContentChange(component) {
      console.log("Changing to component:", component);
      this.currentComponent = component;
    },
  },
};
</script>
