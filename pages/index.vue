<template>
  <div class="page-container">
    <header class="p-3 text-bg-primary">
      <div class="container">
        <div
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
        >
          <a
            href="/"
            class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <i class="bi bi-mortarboard-fill me-2" style="font-size: 2rem"></i>
            <span class="fs-4">OnSchool</span>
          </a>
          <ul
            class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
          >
            <li><a href="/" class="nav-link px-2 text-white">Trang chủ</a></li>
            <li>
              <a href="/about" class="nav-link px-2 text-white">Giới thiệu</a>
            </li>
            <li>
              <a href="/contact" class="nav-link px-2 text-white">Liên hệ</a>
            </li>
            <li>
              <a href="/news" class="nav-link px-2 text-white">Tin tức</a>
            </li>
          </ul>

          <div class="text-end">
            <NuxtLink to="/login" class="btn btn-outline-light me-2">
              <i class="bi bi-box-arrow-in-right me-1"></i>Đăng nhập
            </NuxtLink>
            <NuxtLink to="/register" class="btn btn-warning">
              <i class="bi bi-person-plus me-1"></i>Đăng ký
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow-1">
      <section class="container mt-5">
        <div class="row flex-lg-row-reverse align-items-center g-5 ">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="https://jobviet.org/wp-content/uploads/2023/12/Onschool-review-cong-ty.jpg"
              class="d-block mx-lg-auto img-fluid"
              alt="OnSchool Education"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              Hệ thống quản lý sinh viên thông minh
            </h1>
            <p class="lead">
              OnSchool cung cấp giải pháp quản lý sinh viên toàn diện, giúp nhà
              trường dễ dàng theo dõi và quản lý thông tin sinh viên. Với giao
              diện thân thiện và tính năng đa dạng, OnSchool là lựa chọn hàng
              đầu cho các cơ sở giáo dục.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <NuxtLink to="/login" class="btn btn-primary btn-lg px-4 me-md-2">
                <i class="bi bi-box-arrow-in-right me-2"></i>Đăng nhập
              </NuxtLink>
              <NuxtLink
                to="/about"
                class="btn btn-outline-secondary btn-lg px-4"
              >
                <i class="bi bi-info-circle me-2"></i>Tìm hiểu thêm
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <section class="container py-5">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i
                  class="bi bi-people-fill text-primary"
                  style="font-size: 2.5rem"
                ></i>
                <h3 class="card-title h5 mt-3">Quản lý sinh viên</h3>
                <p class="card-text">
                  Theo dõi thông tin sinh viên, hồ sơ học tập và tiến độ đào tạo
                  một cách hiệu quả.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i
                  class="bi bi-graph-up text-primary"
                  style="font-size: 2.5rem"
                ></i>
                <h3 class="card-title h5 mt-3">Báo cáo thống kê</h3>
                <p class="card-text">
                  Tạo báo cáo chi tiết và biểu đồ trực quan về tình hình học tập
                  của sinh viên.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center">
                <i
                  class="bi bi-shield-check text-primary"
                  style="font-size: 2.5rem"
                ></i>
                <h3 class="card-title h5 mt-3">Bảo mật thông tin</h3>
                <p class="card-text">
                  Đảm bảo an toàn và bảo mật thông tin sinh viên với hệ thống mã
                  hóa tiên tiến.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-light">
        <div class="container px-4 py-5" id="featured-3">
          <h2 class="pb-2 border-bottom text-center">Tính năng nổi bật</h2>
          <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div class="feature col">
              <div
                class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-3"
              >
                <i class="bi bi-mortarboard-fill"></i>
              </div>
              <h3 class="fs-2 text-body-emphasis">Quản lý học tập</h3>
              <p>
                Theo dõi tiến độ học tập, điểm số và kết quả đánh giá của sinh
                viên. Hỗ trợ quản lý lịch học, lịch thi và các hoạt động học tập
                khác.
              </p>
              <a href="#" class="icon-link text-decoration-none">
                Xem chi tiết
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
            <div class="feature col">
              <div
                class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-3"
              >
                <i class="bi bi-people-fill"></i>
              </div>
              <h3 class="fs-2 text-body-emphasis">Quản lý sinh viên</h3>
              <p>
                Lưu trữ và quản lý thông tin cá nhân, hồ sơ học tập của sinh
                viên. Theo dõi quá trình học tập và phát triển của từng sinh
                viên.
              </p>
              <a href="#" class="icon-link text-decoration-none">
                Xem chi tiết
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
            <div class="feature col">
              <div
                class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 rounded-3"
              >
                <i class="bi bi-graph-up"></i>
              </div>
              <h3 class="fs-2 text-body-emphasis">Báo cáo thống kê</h3>
              <p>
                Tạo các báo cáo chi tiết về tình hình học tập, thống kê điểm số
                và đánh giá chất lượng đào tạo. Hỗ trợ ra quyết định dựa trên dữ
                liệu.
              </p>
              <a href="#" class="icon-link text-decoration-none">
                Xem chi tiết
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="py-4 mt-4 bg-primary text-white">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-3">
            <h5 class="text-white mb-3">OnSchool</h5>
            <p class="text-white-50">
              Hệ thống quản lý sinh viên hiện đại, giúp việc quản lý thông tin
              sinh viên trở nên dễ dàng và hiệu quả hơn.
            </p>
          </div>
          <div class="col-md-4 mb-3">
            <h5 class="text-white mb-3">Liên kết nhanh</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <a href="/about" class="text-decoration-none text-white-50">
                  <i class="bi bi-info-circle me-2"></i>Giới thiệu
                </a>
              </li>
              <li class="mb-2">
                <a href="/contact" class="text-decoration-none text-white-50">
                  <i class="bi bi-envelope me-2"></i>Liên hệ
                </a>
              </li>
              <li class="mb-2">
                <a href="/news" class="text-decoration-none text-white-50">
                  <i class="bi bi-newspaper me-2"></i>Tin tức
                </a>
              </li>
              <li class="mb-2">
                <a href="/faq" class="text-decoration-none text-white-50">
                  <i class="bi bi-question-circle me-2"></i>FAQ
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-4 mb-3">
            <h5 class="text-white mb-3">Liên hệ</h5>
            <ul class="list-unstyled">
              <li class="mb-2">
                <i class="bi bi-geo-alt me-2"></i>
                <span class="text-white-50"
                  >17T4, Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội</span
                >
              </li>
              <li class="mb-2">
                <i class="bi bi-telephone me-2"></i>
                <span class="text-white-50"></span>
              </li>
              <li class="mb-2">
                <i class="bi bi-envelope me-2"></i>
                <span class="text-white-50">@onschool.edu.vn</span>
              </li>
            </ul>
          </div>
        </div>
        <hr class="my-4 border-light" />
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-0 text-white-50">
              © 2025 OnSchool. Tất cả quyền được bảo lưu.
            </p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <a href="#" class="text-white me-3">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="#" class="text-white me-3">
              <i class="bi bi-twitter"></i>
            </a>
            <a href="#" class="text-white me-3">
              <i class="bi bi-linkedin"></i>
            </a>
            <a href="#" class="text-white">
              <i class="bi bi-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Header",
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

.nav-link {
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffc107 !important;
}

.form-control-dark {
  border-color: rgba(255, 255, 255, 0.2);
}

.form-control-dark:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.25);
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

footer a {
  transition: color 0.3s ease;
}

footer a:hover {
  color: #0d6efd !important;
}

footer .bi {
  font-size: 1.2rem;
}

footer .text-muted {
  font-size: 0.9rem;
}

.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.bi {
  transition: transform 0.3s ease;
}

.card:hover .bi {
  transform: scale(1.1);
}

.feature-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
}

.feature-icon i {
  font-size: 2rem;
}

.icon-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0d6efd;
  font-weight: 500;
  transition: all 0.3s ease;
}

.icon-link:hover {
  color: #0a58ca;
  transform: translateX(5px);
}

.icon-link i {
  transition: transform 0.3s ease;
}

.icon-link:hover i {
  transform: translateX(3px);
}

.bg-gradient {
  background: linear-gradient(45deg, #0d6efd, #0a58ca);
}
</style>
