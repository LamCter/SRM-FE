export default function ({ $axios, store, redirect }) {
  // Add a request interceptor
  $axios.interceptors.request.use(
    (config) => {
      // Get token from localStorage or sessionStorage
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      // If token exists, add it to headers
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  $axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        // Handle 401 Unauthorized
        if (error.response.status === 401) {
          // Clear auth data
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          store.commit("setUser", null);

          // Redirect to login page
          redirect("/login");
        }
      }
      return Promise.reject(error);
    }
  );
}
