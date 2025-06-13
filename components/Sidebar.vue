<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-primary sidebar">
    <a
      href="#"
      class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
    >
      <span class="fs-4">Admin site</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a
          href="#"
          class="nav-link text-white"
          :class="{ active: activeItem === 'StudentProfile' }"
          @click.prevent="setActive('StudentProfile')"
        >
          <i class="bi bi-house-door me-2"></i>
          Quản lý hồ sơ sinh viên
        </a>
      </li>
      <li>
        <a
          href="#"
          class="nav-link text-white"
          :class="{ active: activeItem === 'StudentManagement' }"
          @click.prevent="setActive('StudentManagement')"
        >
          <i class="bi bi-speedometer2 me-2"></i>
          Quản lý sinh viên
        </a>
      </li>
    </ul>
    <hr />
    <div class="dropdown">
      <a
        href="#"
        class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
       
        <strong>{{ user?.name || "User" }}</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
        
        <li>
          <a class="dropdown-item" href="#" @click.prevent="handleLogout"
            >Đăng xuất</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {
      activeItem: "StudentProfile",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        console.log("User state changed in Sidebar:", newUser); 
      },
    },
  },
  methods: {
    setActive(item) {
      console.log("Setting active item:", item);
      this.activeItem = item;
      this.$emit("change-content", item);
    },
    async handleLogout() {
      try {
        await this.$axios.$post("/logout");
        // Xóa token và user info
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        this.$store.commit("setUser", null);
        // Chuyển về trang chủ
        this.$router.push("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 280px;
  min-height: 100vh;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
}

.nav-link:hover {
  color: #fff;
}

.nav-link.active {
  background-color: #1f18ec !important;
}
</style>
