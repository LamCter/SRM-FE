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
              Đăng ký tài khoản OnSchool
            </h1>
            <p class="col-lg-10 fs-4">
              Tạo tài khoản mới để bắt đầu sử dụng hệ thống quản lý sinh viên
              OnSchool. Điền thông tin của bạn vào form bên dưới.
            </p>
          </div>
          <div class="col-md-10 mx-auto col-lg-5">
            <form
              class="p-4 p-md-5 border rounded-3 bg-body-tertiary"
              @submit.prevent="handleRegister"
            >
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingName"
                  placeholder="Họ và tên"
                  v-model="name"
                  required
                />
                <label for="floatingName">Họ và tên</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingEmail"
                  placeholder="name@example.com"
                  v-model="email"
                  required
                />
                <label for="floatingEmail">Email</label>
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
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="floatingConfirmPassword"
                  placeholder="Confirm Password"
                  v-model="confirmPassword"
                  required
                />
                <label for="floatingConfirmPassword">Xác nhận mật khẩu</label>
              </div>
              <div class="checkbox mb-3">
                <label>
                  <input type="checkbox" v-model="agreeTerms" required /> Tôi
                  đồng ý với các điều khoản và điều kiện
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
                <i v-else class="bi bi-person-plus me-2"></i>
                {{ loading ? "Đang xử lý..." : "Đăng ký" }}
              </button>
              <hr class="my-4" />
              <div class="text-center">
                <p class="text-body-secondary mb-2">Đã có tài khoản?</p>
                <NuxtLink to="/login" class="text-decoration-none">
                  Đăng nhập ngay
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
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
      loading: false,
      error: null,
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.error = "Mật khẩu xác nhận không khớp";
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await this.$axios.$post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        // Lưu thông báo thành công vào sessionStorage
        sessionStorage.setItem(
          "registerSuccess",
          "Đăng ký tài khoản thành công! Vui lòng đăng nhập để tiếp tục."
        );

        // Chuyển hướng đến trang đăng nhập
        this.$router.push("/login");
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "Đăng ký thất bại. Vui lòng thử lại.";
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

.spinner-border {
  width: 1rem;
  height: 1rem;
}
</style>
