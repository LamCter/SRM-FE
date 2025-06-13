<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Quản lý hồ sơ sinh viên</h2>
      <div class="d-flex gap-2">
        <button
          class="btn btn-success"
          @click="approveSelectedProfiles"
          :disabled="loading || selectedProfiles.length === 0"
        >
          <i class="bi bi-check-circle me-2"></i>Duyệt đã chọn ({{
            selectedProfiles.length
          }})
        </button>
        <button class="btn btn-primary" @click="openAddNewModal">
          <i class="bi bi-plus-circle me-2"></i>Thêm hồ sơ
        </button>
      </div>
    </div>
    <!-- Modal Form -->
    <div
      class="modal fade"
      id="profileModal"
      tabindex="-1"
      aria-labelledby="profileModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <form @submit.prevent="handleSubmit">
            <div class="modal-header">
              <h5 class="modal-title" id="profileModalLabel">
                {{
                  isEditMode
                    ? "Chỉnh sửa hồ sơ sinh viên"
                    : "Chi tiết hồ sơ sinh viên"
                }}
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
                <!-- Thông tin sinh viên -->
                <div class="col-md-6 border-end">
                  <h6 class="mb-3 fw-bold text-primary">Thông tin sinh viên</h6>
                  <div class="mb-3">
                    <label for="fullName" class="form-label">Họ và tên</label>
                    <input
                      type="text"
                      class="form-control"
                      id="fullName"
                      v-model="formData.profile.fullName"
                      :disabled="!isEditMode"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="phoneNumber" class="form-label"
                      >Số điện thoại</label
                    >
                    <input
                      type="tel"
                      class="form-control"
                      id="phoneNumber"
                      v-model="formData.profile.phoneNumber"
                      :disabled="!isEditMode"
                      required
                      pattern="[0-9]{10,11}"
                      title="Số điện thoại phải có 10-11 chữ số"
                    />
                    <small class="text-muted"
                      >Nhập số điện thoại 10-11 chữ số</small
                    >
                  </div>
                  <div class="mb-3">
                    <label for="identityNumber" class="form-label"
                      >Số CCCD/CMND</label
                    >
                    <input
                      type="tel"
                      class="form-control"
                      id="identityNumber"
                      v-model="formData.profile.identityNumber"
                      :disabled="!isEditMode"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="dateOfBirth" class="form-label"
                      >Ngày sinh</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="dateOfBirth"
                      v-model="formData.profile.dateOfBirth"
                      :disabled="!isEditMode"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Giới tính</label>
                    <div class="d-flex gap-3">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                          v-model="formData.profile.gender"
                          :disabled="!isEditMode"
                          required
                        />
                        <label class="form-check-label" for="male">Nam</label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                          v-model="formData.profile.gender"
                          :disabled="!isEditMode"
                        />
                        <label class="form-check-label" for="female">Nữ</label>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="address" class="form-label">Địa chỉ</label>
                    <textarea
                      class="form-control"
                      id="address"
                      v-model="formData.profile.address"
                      rows="3"
                      :disabled="!isEditMode"
                      required
                    ></textarea>
                  </div>
                </div>

                <!-- Thông tin hồ sơ -->
                <div class="col-md-6">
                  <h6 class="mb-3 fw-bold text-primary">Thông tin hồ sơ</h6>
                  <div class="mb-3">
                    <label for="studentProfileCode" class="form-label"
                      >Mã hồ sơ</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="studentProfileCode"
                      v-model="formData.studentProfileCode"
                      :disabled="!isEditMode"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="enrollYear" class="form-label"
                      >Năm nhập học</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="enrollYear"
                      v-model="formData.enrollYear"
                      :disabled="!isEditMode"
                      required
                      min="2000"
                      max="2100"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="school" class="form-label">Trường học</label>
                    <template v-if="isEditMode">
                      <select
                        class="form-select"
                        v-model="formData.schoolId"
                        required
                      >
                        <option value="" disabled>Lựa chọn trường học</option>
                        <option
                          v-for="school in schools"
                          :key="school.id"
                          :value="school.id"
                          :selected="school.id === formData.schoolId"
                        >
                          {{ school.school_name }} ({{ school.school_code }})
                        </option>
                      </select>
                      <small class="text-muted" v-if="formData.schoolName">
                        Giá trị hiện tại: {{ formData.schoolName }}
                      </small>
                    </template>
                    <template v-else>
                      <input
                        type="text"
                        class="form-control"
                        :value="formData.schoolName"
                        disabled
                      />
                    </template>
                  </div>
                  <div class="mb-3">
                    <label for="major" class="form-label">Ngành học</label>
                    <template v-if="isEditMode">
                      <select
                        class="form-select"
                        v-model="formData.majorId"
                        required
                      >
                        <option value="" disabled>Lựa chọn ngành học</option>
                        <option
                          v-for="major in majors"
                          :key="major.id"
                          :value="major.id"
                          :selected="major.id === formData.majorId"
                        >
                          {{ major.major_name }} ({{ major.major_code }})
                        </option>
                      </select>
                      <small class="text-muted" v-if="formData.majorName">
                        Giá trị hiện tại: {{ formData.majorName }}
                      </small>
                    </template>
                    <template v-else>
                      <input
                        type="text"
                        class="form-control"
                        :value="formData.majorName"
                        disabled
                      />
                    </template>
                  </div>
                  <div class="mb-3">
                    <label for="status" class="form-label">Trạng thái</label>
                    <select
                      class="form-select"
                      v-model="formData.status"
                      :disabled="!isEditMode"
                      required
                    >
                      <option value="" disabled>Lựa chọn trạng thái</option>
                      <option value="Hồ sơ mới">Hồ sơ mới</option>
                      <option value="Đã gửi hồ sơ sang trường">
                        Đã gửi hồ sơ sang trường
                      </option>
                      <option value="Trường đã duyệt hồ sơ">
                        Trường đã duyệt hồ sơ
                      </option>
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
              <button
                v-if="isEditMode"
                type="submit"
                class="btn btn-primary px-4"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Xác nhận xóa -->
    <div
      class="modal fade"
      id="deleteConfirmModal"
      tabindex="-1"
      aria-labelledby="deleteConfirmModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteConfirmModalLabel">
              {{ canDelete ? "Xác nhận xóa" : "Không thể xóa" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Đóng"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="canDelete" class="text-center">
              <i class="bi bi-exclamation-triangle text-warning fs-1 mb-3"></i>
              <p class="mb-0">Bạn có chắc chắn muốn xóa hồ sơ này không?</p>
              <p class="text-muted small mt-2">
                Hành động này không thể hoàn tác.
              </p>
            </div>
            <div v-else class="text-center">
              <i class="bi bi-x-circle text-danger fs-1 mb-3"></i>
              <p class="mb-0">Không thể xóa hồ sơ này!</p>
              <p class="text-muted small mt-2">
                Chỉ có thể xóa hồ sơ ở trạng thái "Hồ sơ mới".
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {{ canDelete ? "Hủy" : "Đóng" }}
            </button>
            <button
              v-if="canDelete"
              type="button"
              class="btn btn-danger"
              @click="confirmDelete"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading and Error States -->
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- Table -->
    <div v-if="!loading && !error" class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :checked="isAllSelected"
                      @change="toggleSelectAll"
                      :disabled="!hasApprovableProfiles"
                    />
                  </div>
                </th>
                <th>STT</th>
                <th>Thông tin sinh viên</th>
                <th>Số điện thoại</th>
                <th>Năm nhập học</th>
                <th>Ngành học</th>
                <th>Trường học</th>
                <th>Trạng thái</th>
                <th class="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(profile, index) in studentProfiles" :key="profile.id">
                <td>
                  <div
                    class="form-check"
                    v-if="profile.status === 'Trường đã duyệt hồ sơ'"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :value="profile.id"
                      v-model="selectedProfiles"
                    />
                  </div>
                </td>
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="student-info">
                    <div class="fw-bold">{{ profile.full_name }}</div>
                    <div class="text-muted small">
                      <div>
                        Ngày sinh: {{ formatDate(profile.date_of_birth) }}
                      </div>
                      <div>CCCD: {{ profile.identity_number }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ profile.phone_number }}</td>
                <td>{{ profile.enroll_year }}</td>
                <td>{{ profile.major_name }}</td>
                <td>{{ profile.school_name }}</td>
                <td>
                  <span :class="getStatusBadgeClass(profile.status)">
                    {{ profile.status }}
                  </span>
                </td>
                <td class="text-center">
                  <button
                    class="btn btn-sm btn-info me-2"
                    @click="viewDetails(profile)"
                    title="Xem chi tiết"
                  >
                    <i class="bi bi-eye"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-warning me-2"
                    @click="editProfile(profile)"
                    title="Chỉnh sửa"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-success me-2"
                    @click="approveProfile(profile)"
                    title="Duyệt hồ sơ"
                    :disabled="profile.status !== 'Trường đã duyệt hồ sơ'"
                  >
                    <i class="bi bi-check-circle"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteProfile(profile)"
                    title="Xóa"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Add pagination controls -->
        <div class="d-flex justify-content-between align-items-center mt-3">
          <div class="text-muted">
            Hiển thị {{ pagination.from }} đến {{ pagination.to }} của
            {{ pagination.total }} hồ sơ
          </div>
          <nav aria-label="Page navigation">
            <ul class="pagination mb-0">
              <li
                class="page-item"
                :class="{ disabled: pagination.current_page === 1 }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="changePage(pagination.current_page - 1)"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
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
                :class="{
                  disabled: pagination.current_page === pagination.last_page,
                }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="changePage(pagination.current_page + 1)"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div
        id="approveToast"
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
        <div class="toast-body">Xét duyệt hồ sơ sinh viên thành công!</div>
      </div>
      <div
        id="batchApproveToast"
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
        <div class="toast-body">Đã xét duyệt thành công!</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentProfile",
  data() {
    return {
      isEditMode: false,
      selectedProfile: null,
      canDelete: false,
      profileToDelete: null,
      studentProfiles: [],
      schools: [],
      majors: [],
      profileDetailsCache: {},
      formData: {
        studentProfileCode: "",
        enrollYear: "",
        schoolId: "",
        majorId: "",
        status: "Hồ sơ mới",
        profile: {
          fullName: "",
          dateOfBirth: "",
          phoneNumber: "",
          gender: "",
          address: "",
          identityNumber: "",
        },
      },
      loading: false,
      error: null,
      selectedProfiles: [],
      isAllSelected: false,
      hasApprovableProfiles: false,
      pagination: {
        total: 0,
        per_page: 10,
        current_page: 1,
        last_page: 1,
        from: 1,
        to: 10,
      },
    };
  },
  async created() {
    await Promise.all([
      this.fetchStudentProfiles(),
      this.fetchSchools(),
      this.fetchMajors(),
    ]);
  },
  methods: {
    async fetchSchools() {
      try {
        const response = await axios.get("http://localhost:8000/api/schools");
        this.schools = response.data;
        console.log("Schools loaded:", this.schools);
      } catch (error) {
        console.error("Error fetching schools:", error);
        this.error = "Không thể tải danh sách trường học";
      }
    },
    async fetchMajors() {
      try {
        const response = await axios.get("http://localhost:8000/api/majors");
        this.majors = response.data;
        console.log("Majors loaded:", this.majors);
      } catch (error) {
        console.error("Error fetching majors:", error);
        this.error = "Không thể tải danh sách ngành học";
      }
    },
    async fetchStudentProfiles() {
      try {
        this.loading = true;
        const response = await axios.get(
          `http://localhost:8000/api/student-profiles?page=${this.pagination.current_page}`
        );

        this.studentProfiles = response.data.data
          .map((profile) => ({
            ...profile,
            status:
              profile.status === "approved"
                ? "Đã xét duyệt hồ sơ"
                : profile.status,
          }))
          .sort((a, b) => a.id - b.id);

        this.pagination = response.data.pagination;

        this.hasApprovableProfiles = response.data.data.some(
          (p) => p.status === "Trường đã duyệt hồ sơ"
        );
      } catch (error) {
        this.error = "Không thể tải danh sách hồ sơ sinh viên";
        console.error("Error fetching student profiles:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchProfileDetails(id) {
      if (this.profileDetailsCache[id]) {
        //console.log("Using cached profile details for ID:", id);
        return this.profileDetailsCache[id];
      }

      try {
        this.loading = true;
        const response = await axios.get(
          `http://localhost:8000/api/student-profiles/${id}`
        );
        this.profileDetailsCache[id] = response.data;
        //console.log("Fetched and cached profile details for ID:", id);
        return response.data;
      } catch (error) {
        this.error = "Không thể tải thông tin chi tiết hồ sơ";
        //console.error("Error fetching profile details:", error);
        return null;
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    getStatusBadgeClass(status) {
      const statusMap = {
        "Hồ sơ mới": "badge bg-secondary",
        "Đã gửi hồ sơ sang trường": "badge bg-warning",
        "Trường đã duyệt hồ sơ": "badge bg-success",
        "Đã xét duyệt hồ sơ": "badge bg-success",
        approved: "badge bg-success", // Thêm mapping cho trạng thái "approved"
      };
      return statusMap[status] || "badge bg-secondary";
    },
    async viewDetails(profile) {
      this.isEditMode = false;
      this.selectedProfile = profile;

      const detailedProfile = await this.fetchProfileDetails(profile.id);
      if (detailedProfile) {
        this.formData = {
          studentProfileCode: detailedProfile.student_profile_code,
          enrollYear: detailedProfile.enroll_year,
          status: detailedProfile.status,
          schoolId: detailedProfile.school_id,
          majorId: detailedProfile.major_id,
          schoolName: detailedProfile.school_name,
          majorName: detailedProfile.major_name,
          profile: {
            fullName: detailedProfile.full_name,
            dateOfBirth: detailedProfile.date_of_birth,
            phoneNumber: detailedProfile.phone_number,
            gender: detailedProfile.gender,
            address: detailedProfile.address,
            identityNumber: detailedProfile.identity_number,
          },
        };
      }

      const modal = new bootstrap.Modal(
        document.getElementById("profileModal")
      );
      modal.show();
    },
    async editProfile(profile) {
      this.isEditMode = true;
      this.selectedProfile = profile;

      // Fetch detailed profile data using the same method as viewDetails
      const detailedProfile = await this.fetchProfileDetails(profile.id);
      if (detailedProfile) {
        //console.log("Edit profile data:", detailedProfile); // Add logging
        this.formData = {
          studentProfileCode: detailedProfile.student_profile_code,
          enrollYear: detailedProfile.enroll_year,
          status: detailedProfile.status,
          schoolId: parseInt(detailedProfile.school_id), // Ensure it's a number
          majorId: parseInt(detailedProfile.major_id), // Ensure it's a number
          schoolName: detailedProfile.school_name,
          majorName: detailedProfile.major_name,
          profile: {
            fullName: detailedProfile.full_name,
            dateOfBirth: detailedProfile.date_of_birth,
            phoneNumber: detailedProfile.phone_number,
            gender: detailedProfile.gender,
            address: detailedProfile.address,
            identityNumber: detailedProfile.identity_number,
          },
        };
        console.log("Form data after setting:", this.formData); // Add logging
      }

      const modal = new bootstrap.Modal(
        document.getElementById("profileModal")
      );
      modal.show();
    },
    deleteProfile(profile) {
      this.profileToDelete = profile;
      this.canDelete = profile.status === "Hồ sơ mới";
      const modal = new bootstrap.Modal(
        document.getElementById("deleteConfirmModal")
      );
      modal.show();
    },
    async confirmDelete() {
      if (this.profileToDelete && this.canDelete) {
        try {
          this.loading = true;
          await axios.delete(
            `http://localhost:8000/api/student-profiles/${this.profileToDelete.id}`
          );

          this.clearProfileDetailsCache(this.profileToDelete.id);

          await this.fetchStudentProfiles();

          const modal = bootstrap.Modal.getInstance(
            document.getElementById("deleteConfirmModal")
          );
          modal.hide();

          this.profileToDelete = null;
          this.canDelete = false;
        } catch (error) {
          this.error = "Không thể xóa hồ sơ sinh viên";
          //console.error("Error deleting profile:", error);
        } finally {
          this.loading = false;
        }
      }
    },
    openAddNewModal() {
      this.isEditMode = true;
      this.selectedProfile = null;
      this.formData = {
        studentProfileCode: "",
        enrollYear: "",
        schoolId: "",
        majorId: "",
        status: "Hồ sơ mới",
        profile: {
          fullName: "",
          dateOfBirth: "",
          phoneNumber: "",
          gender: "",
          address: "",
          identityNumber: "",
        },
      };
      // console.log("Opening add modal with schools:", this.schools);
      // console.log("Opening add modal with majors:", this.majors);
      const modal = new bootstrap.Modal(
        document.getElementById("profileModal")
      );
      modal.show();
    },
    async handleSubmit() {
      if (!this.isEditMode) return;

      try {
        this.loading = true;
        const payload = {
          student_profile_code: this.formData.studentProfileCode,
          enroll_year: parseInt(this.formData.enrollYear),
          status: this.formData.status,
          school_id: parseInt(this.formData.schoolId),
          major_id: parseInt(this.formData.majorId),
          full_name: this.formData.profile.fullName,
          date_of_birth: this.formData.profile.dateOfBirth,
          gender: this.formData.profile.gender === "male" ? "male" : "female",
          address: this.formData.profile.address,
          phone_number: this.formData.profile.phoneNumber.toString(),
          identity_number: this.formData.profile.identityNumber,
        };

        if (this.selectedProfile) {
          await axios.put(
            `http://localhost:8000/api/student-profiles/${this.selectedProfile.id}`,
            payload
          );
          this.clearProfileDetailsCache(this.selectedProfile.id);
        } else {
          await axios.post(
            "http://localhost:8000/api/student-profiles",
            payload
          );
        }

        await this.fetchStudentProfiles();

        const modal = bootstrap.Modal.getInstance(
          document.getElementById("profileModal")
        );
        modal.hide();
      } catch (error) {
        this.error = "Không thể lưu hồ sơ sinh viên";
        console.error("Error saving profile:", error);
      } finally {
        this.loading = false;
      }
    },
    clearProfileDetailsCache(id = null) {
      if (id) {
        delete this.profileDetailsCache[id];
      } else {
        this.profileDetailsCache = {};
      }
    },
    mapGenderToApi(gender) {
      return gender === "Nam" ? "male" : "female";
    },
    mapGenderFromApi(gender) {
      return gender === "male" ? "Nam" : "Nữ";
    },
    async approveProfile(profile) {
      try {
        this.loading = true;
        const payload = {
          student_profile_id: profile.id,
          student_profile_code: profile.student_profile_code,
          full_name: profile.full_name,
        };

        await axios.post(
          "http://localhost:8000/api/student-profiles/approve",
          payload
        );

        // Update profile status locally
        profile.status = "Đã xét duyệt hồ sơ";

        // Show success toast
        const toast = new bootstrap.Toast(
          document.getElementById("approveToast")
        );
        toast.show();

        // Refresh the student profiles list
        await this.fetchStudentProfiles();

        // Close modal if it's open
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("profileModal")
        );
        if (modal) {
          modal.hide();
        }
      } catch (error) {
        this.error = "Không thể xét duyệt hồ sơ sinh viên";
        //console.error("Error approving profile:", error);
      } finally {
        this.loading = false;
      }
    },
    toggleSelectAll(event) {
      this.isAllSelected = event.target.checked;
      if (this.isAllSelected) {
        // Chọn tất cả các hồ sơ có thể duyệt
        this.selectedProfiles = this.studentProfiles
          .filter((p) => p.status === "Trường đã duyệt hồ sơ")
          .map((p) => p.id);
      } else {
        // Bỏ chọn tất cả
        this.selectedProfiles = [];
      }
    },
    async approveSelectedProfiles() {
      if (this.selectedProfiles.length === 0) return;

      try {
        this.loading = true;

        // Tạo mảng payload cho các hồ sơ được chọn
        const profilesToApprove = this.studentProfiles
          .filter((profile) => this.selectedProfiles.includes(profile.id))
          .map((profile) => ({
            student_profile_id: profile.id,
            student_profile_code: profile.student_profile_code,
            full_name: profile.full_name,
          }));

        // Gọi API xét duyệt hàng loạt
        await axios.post(
          "http://localhost:8000/api/student-profiles/approve-batch",
          { profiles: profilesToApprove }
        );

        // Hiển thị thông báo thành công
        const toast = new bootstrap.Toast(
          document.getElementById("batchApproveToast")
        );
        toast.show();

        // Refresh danh sách hồ sơ
        await this.fetchStudentProfiles();

        // Reset các lựa chọn
        this.selectedProfiles = [];
        this.isAllSelected = false;
      } catch (error) {
        this.error = "Không thể xét duyệt các hồ sơ đã chọn";
        console.error("Error approving selected profiles:", error);
      } finally {
        this.loading = false;
      }
    },
    async changePage(page) {
      this.pagination.current_page = page;
      await this.fetchStudentProfiles();
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

.student-info {
  line-height: 1.4;
}

.student-info .text-muted {
  font-size: 0.85rem;
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

.modal-lg {
  max-width: 900px;
}

.border-end {
  border-right: 1px solid #dee2e6;
}

.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

textarea.form-control {
  resize: none;
}

.form-control:disabled,
.form-select:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.form-check-input:disabled {
  cursor: not-allowed;
}

.modal-body i {
  display: block;
  margin: 0 auto;
}

.modal-body p {
  font-size: 1.1rem;
}

.modal-body .text-muted {
  font-size: 0.9rem;
}

/* Pagination styles */
.pagination {
  margin-bottom: 0;
}

.page-link {
  color: #0d6efd;
  padding: 0.5rem 0.75rem;
  border: 1px solid #dee2e6;
  background-color: #fff;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: #fff;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
  border-color: #dee2e6;
}

.page-link:hover {
  z-index: 2;
  color: #0a58ca;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.page-item.active .page-link:hover {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>
