<template>
  <div class="page-container">
    <header class="p-3 text-bg-primary">
      <div class="container">
        <div
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
        >
          <NuxtLink
            to="/"
            class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <i class="bi bi-mortarboard-fill me-2" style="font-size: 2rem"></i>
            <span class="fs-4">OnSchool</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex-grow-1">
      <div class="container">
        <div class="row align-items-center g-lg-5 mt-5">
          <div class="col-lg-7 text-center text-lg-start">
            <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">
              Đăng nhập vào OnSchool
            </h1>
            <p class="col-lg-10 fs-4">
              Chào mừng bạn quay trở lại! Đăng nhập để truy cập vào hệ thống
              quản lý sinh viên OnSchool.
            </p>
          </div>
          <div class="col-md-10 mx-auto col-lg-5">
            <form
              class="p-4 p-md-5 border rounded-3 bg-body-tertiary"
              @submit.prevent="handleLogin"
            >
              <div
                v-if="successMessage"
                class="alert alert-success"
                role="alert"
              >
                {{ successMessage }}
              </div>
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  v-model="email"
                  required
                />
                <label for="floatingInput">Email</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  v-model="password"
                  required
                />
                <label for="floatingPassword">Mật khẩu</label>
              </div>
              <div class="checkbox mb-3">
                <label>
                  <input type="checkbox" v-model="rememberMe" /> Ghi nhớ đăng
                  nhập
                </label>
              </div>
              <button
                class="w-100 btn btn-lg btn-primary"
                type="submit"
                :disabled="loading"
              >
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                <i v-else class="bi bi-box-arrow-in-right me-2"></i>
                {{ loading ? "Đang xử lý..." : "Đăng nhập" }}
              </button>
              <hr class="my-4" />
              <div class="text-center">
                <p class="text-body-secondary mb-2">Chưa có tài khoản?</p>
                <NuxtLink to="/register" class="text-decoration-none">
                  Đăng ký ngay
                </NuxtLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

    <footer class="py-4 mt-4 bg-primary text-white">
      <div class="container text-center">
        <p class="mb-0 text-white-50">
          © 2025 OnSchool. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      loading: false,
      error: null,
      successMessage: null,
    };
  },
  mounted() {
    // Kiểm tra và hiển thị thông báo thành công từ trang đăng ký
    const registerSuccess = sessionStorage.getItem("registerSuccess");
    if (registerSuccess) {
      this.successMessage = registerSuccess;
      sessionStorage.removeItem("registerSuccess"); // Xóa thông báo sau khi hiển thị
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = null;
      this.successMessage = null;

      try {
        const response = await this.$axios.post("/login", {
          email: this.email,
          password: this.password,
        });

        console.log("Login response:", response.data);

        // Lưu token vào localStorage nếu rememberMe được chọn
        const token = response.data.token || response.data.access_token;
        if (token) {
          if (this.rememberMe) {
            localStorage.setItem("token", token);
          } else {
            sessionStorage.setItem("token", token);
          }

          // Thêm token vào header
          this.$axios.setToken(token, "Bearer");

          // Lấy thông tin user sau khi đăng nhập thành công
          try {
            const userResponse = await this.$axios.get("/user");
            console.log("User info:", userResponse.data);

            if (userResponse.data && userResponse.data.user) {
              // Lưu thông tin user vào store
              this.$store.commit("setUser", userResponse.data.user);
            }
          } catch (userError) {
            console.error("Failed to get user info:", userError);
          }
        } else {
          console.error("No token found in response:", response.data);
        }

        // Chuyển hướng đến trang admin
        this.$router.push("/admin");
      } catch (error) {
        console.error("Login error:", error.response?.data || error);
        this.error =
          error.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng thử lại.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}

.form-floating > .form-control:focus ~ label,
.form-floating > .form-control:not(:placeholder-shown) ~ label {
  color: #0d6efd;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.checkbox label {
  color: #6c757d;
  cursor: pointer;
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

footer {
  flex-shrink: 0;
}

.alert {
  margin-bottom: 1rem;
}

.alert-success {
  background-color: #d1e7dd;
  border-color: #badbcc;
  color: #0f5132;
}

.spinner-border {
  width: 1rem;
  height: 1rem;
}
</style>
