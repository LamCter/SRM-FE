<template>
  <div class="container-fluid">
    <!-- Loading State -->
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-if="!loading && !error">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý sinh viên</h2>
        <div>
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            accept=".xlsx,.xls,.csv"
            @change="handleFileSelected"
          />
          <button class="btn btn-primary" @click="triggerFileInput">
            <i class="bi bi-file-earmark-arrow-up me-2"></i>Import file
          </button>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="table-light">
                <tr>
                  <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Mã hồ sơ sinh viên</th>
                  <th>Mã sinh viên</th>
                  <th>Trạng thái</th>
                  <th class="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in students" :key="student.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ student.fullName }}</td>
                  <td>{{ student.studentProfileCode }}</td>
                  <td>{{ student.studentCode }}</td>
                  <td>
                    <span :class="getStatusBadgeClass(student.status)">
                      {{ student.status }}
                    </span>
                  </td>
                  <td class="text-center">
                    <button
                      class="btn btn-sm btn-warning me-2"
                      @click="editStudent(student)"
                      title="Chỉnh sửa"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-danger"
                      @click="deleteStudent(student)"
                      title="Xóa"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination -->
          <div class="d-flex justify-content-between align-items-center mt-4">
            <div class="text-muted">
              Hiển thị {{ pagination.from }} đến {{ pagination.to }} của
              {{ pagination.total }} kết quả
            </div>
            <nav aria-label="Page navigation">
              <ul class="pagination mb-0">
                <li
                  class="page-item"
                  :class="{ disabled: !pagination.prev_page_url }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(pagination.current_page - 1)"
                  >
                    <i class="bi bi-chevron-left"></i>
                  </a>
                </li>
                <li
                  v-for="page in pagination.last_page"
                  :key="page"
                  class="page-item"
                  :class="{ active: page === pagination.current_page }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(page)"
                    >{{ page }}</a
                  >
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: !pagination.next_page_url }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(pagination.current_page + 1)"
                  >
                    <i class="bi bi-chevron-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <div
      class="modal fade"
      id="studentModal"
      tabindex="-1"
      aria-labelledby="studentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <form @submit.prevent="handleSubmit">
            <div class="modal-header">
              <h5 class="modal-title" id="studentModalLabel">
                Chỉnh sửa thông tin sinh viên
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Đóng"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="fullName" class="form-label">Họ và tên</label>
                    <input
                      type="text"
                      class="form-control"
                      id="fullName"
                      v-model="formData.fullName"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="studentProfileCode" class="form-label"
                      >Mã hồ sơ sinh viên</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="studentProfileCode"
                      v-model="formData.studentProfileCode"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="studentCode" class="form-label"
                      >Mã sinh viên</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="studentCode"
                      v-model="formData.studentCode"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="status" class="form-label">Trạng thái</label>
                    <select
                      class="form-select"
                      v-model="formData.status"
                      required
                    >
                      <option value="Chờ nhập học">Chờ nhập học</option>
                      <option value="Tham gia khai giảng">
                        Tham gia khai giảng
                      </option>
                      <option value="Đang học">Đang học</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button type="submit" class="btn btn-primary px-4">
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div
        id="updateToast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header bg-success text-white">
          <i class="bi bi-check-circle me-2"></i>
          <strong class="me-auto">Thông báo</strong>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">Cập nhật thông tin sinh viên thành công!</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentManagement",
  data() {
    return {
      students: [],
      loading: false,
      error: null,
      pagination: {
        current_page: 1,
        total: 0,
        per_page: 10,
        last_page: 1,
        from: 1,
        to: 10,
        prev_page_url: null,
        next_page_url: null,
      },
      formData: {
        fullName: "",
        studentProfileCode: "",
        studentCode: "",
        status: "",
      },
      selectedStudent: null,
    };
  },
  async created() {
    await this.fetchStudents();
  },
  methods: {
    async fetchStudents(page = 1) {
      try {
        this.loading = true;
        const response = await axios.get(
          `http://localhost:8000/api/students?page=${page}`
        );

        if (response.data && response.data.data) {
          // Lưu lại thứ tự hiện tại của students
          const currentOrder = this.students.reduce((acc, student, index) => {
            acc[student.id] = index;
            return acc;
          }, {});

          // Map dữ liệu mới
          const newStudents = response.data.data.data.map((student) => ({
            id: student.id,
            fullName: student.full_name,
            studentProfileCode: student.student_profile_code,
            studentCode: student.student_code || "Chưa có mã",
            status: student.status,
            studentProfile: student.student_profile,
          }));

          // Sắp xếp lại theo thứ tự cũ nếu có dữ liệu cũ
          if (this.students.length > 0) {
            this.students = newStudents.sort((a, b) => {
              const orderA = currentOrder[a.id] ?? Infinity;
              const orderB = currentOrder[b.id] ?? Infinity;
              return orderA - orderB;
            });
          } else {
            this.students = newStudents;
          }

          // Cập nhật thông tin phân trang
          this.pagination = {
            current_page: response.data.data.current_page,
            total: response.data.data.total,
            per_page: response.data.data.per_page,
            last_page: response.data.data.last_page,
            from: response.data.data.from,
            to: response.data.data.to,
            prev_page_url: response.data.data.prev_page_url,
            next_page_url: response.data.data.next_page_url,
          };
        } else {
          throw new Error("Cấu trúc dữ liệu không hợp lệ");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        this.error =
          error.response?.data?.message || "Không thể tải danh sách sinh viên";
      } finally {
        this.loading = false;
      }
    },
    changePage(page) {
      if (page < 1 || page > this.pagination.last_page) return;
      this.fetchStudents(page);
    },
    mapStatus(status) {
      const statusMap = {
        pending: "Chờ nhập học",
        orientation: "Tham gia khai giảng",
        active: "Đang học",
      };
      return statusMap[status] || status;
    },
    getStatusBadgeClass(status) {
      const statusMap = {
        "Chờ nhập học": "badge bg-warning",
        "Tham gia khai giảng": "badge bg-info",
        "Đang học": "badge bg-success",
      };
      return statusMap[status] || "badge bg-secondary";
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileSelected(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Kiểm tra định dạng file
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];

      if (!validTypes.includes(file.type)) {
        this.error = "Vui lòng chọn file Excel hoặc CSV";
        return;
      }

      try {
        this.loading = true;
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          "http://localhost:8000/api/students/import",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Refresh danh sách sinh viên sau khi import
        await this.fetchStudents();

        // Hiển thị thông báo thành công
        const toast = new bootstrap.Toast(
          document.getElementById("updateToast")
        );
        toast.show();
      } catch (error) {
        console.error("Error importing file:", error);
        this.error = error.response?.data?.message || "Không thể import file";
      } finally {
        this.loading = false;
        // Reset input file
        event.target.value = "";
      }
    },
    viewDetails(student) {
      console.log("Xem chi tiết sinh viên:", student);
      // Thêm logic xem chi tiết
    },
    editStudent(student) {
      this.selectedStudent = student;
      this.formData = {
        fullName: student.fullName,
        studentProfileCode: student.studentProfileCode,
        studentCode: student.studentCode,
        status: student.status,
      };

      const modal = new bootstrap.Modal(
        document.getElementById("studentModal")
      );
      modal.show();
    },
    async handleSubmit() {
      try {
        this.loading = true;
        const payload = {
          full_name: this.formData.fullName,
          student_profile_code: this.formData.studentProfileCode,
          student_code: this.formData.studentCode,
          status: this.formData.status,
        };

        const response = await axios.put(
          `http://localhost:8000/api/students/${this.selectedStudent.id}`,
          payload
        );

        // Cập nhật thông tin sinh viên trong danh sách hiện tại
        const updatedStudent = response.data.data;
        const index = this.students.findIndex(
          (s) => s.id === this.selectedStudent.id
        );
        if (index !== -1) {
          this.students[index] = {
            id: updatedStudent.id,
            fullName: updatedStudent.full_name,
            studentProfileCode: updatedStudent.student_profile_code,
            studentCode: updatedStudent.student_code || "Chưa có mã",
            status: updatedStudent.status,
            studentProfile: updatedStudent.student_profile,
          };
        }

        // Đóng modal
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("studentModal")
        );
        modal.hide();

        // Hiển thị toast thông báo thành công
        const toast = new bootstrap.Toast(
          document.getElementById("updateToast")
        );
        toast.show();

        // Reset form
        this.formData = {
          fullName: "",
          studentProfileCode: "",
          studentCode: "",
          status: "",
        };
        this.selectedStudent = null;
      } catch (error) {
        console.error("Error updating student:", error);
        this.error =
          error.response?.data?.message ||
          "Không thể cập nhật thông tin sinh viên";
      } finally {
        this.loading = false;
      }
    },
    deleteStudent(student) {
      
    },
  },
};
</script>

<style scoped>
.table th {
  font-weight: 600;
  background-color: #f8f9fa;
}

.badge {
  padding: 0.5em 0.8em;
  font-weight: 500;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
}

.btn i {
  font-size: 1rem;
}

.table td {
  vertical-align: middle;
}

.btn[title] {
  position: relative;
}

.btn[title]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1;
}
</style>
