export default function ({ store, $axios }) {
  // Khôi phục trạng thái authentication khi refresh trang
  if (process.client) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log("Found token:", token ? "Yes" : "No"); // Debug log

    if (token) {
      // Thêm token vào header
      $axios.setToken(token, "Bearer");

      // Lấy thông tin user
      console.log("Fetching user info..."); // Debug log
      $axios
        .get("/user")
        .then((response) => {
          console.log("User info response:", response.data); // Debug log

          if (response.data && response.data.user) {
            // Lưu thông tin user vào store
            store.commit("setUser", response.data.user);
          } else {
            console.error("Invalid user data structure:", response.data);
          }
        })
        .catch((error) => {
          console.error(
            "Failed to get user info:",
            error.response?.data || error
          );
          // Xóa token nếu không lấy được thông tin user
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          store.commit("setUser", null);
        });
    }
  }
}
