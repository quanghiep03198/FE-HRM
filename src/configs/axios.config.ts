import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL
});

axiosInstance.interceptors.request.use(
	(request) => {
		const accessToken = window.localStorage.getItem("access_token");
		request.headers.Authorization = accessToken;
		return request;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response.data,
	(error) => Promise.reject(error)
);

export default axiosInstance;
